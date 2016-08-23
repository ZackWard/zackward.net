import * as React from "react";

import {LifeCell} from "./LifeCell";
import {PubSub} from "../gol-pubsub";

interface cellData {
    [address: string]: {
        alive: boolean;
        livingNeighbors: number;
    };
}

export interface LifeBoardProps {
    pubsub: PubSub;
    width: number;
    height: number;
    ticking: boolean;
    speed: number;
}

export interface LifeBoardState {
    cells: cellData;
}

export class LifeBoard extends React.Component<LifeBoardProps, LifeBoardState> {

    pendingBoard: cellData;

    constructor(props: LifeBoardProps) {
        super(props);

        // Prebind methods here
        this.killCell = this.killCell.bind(this);
        this.birthCell = this.birthCell.bind(this);
        this.toggleCell = this.toggleCell.bind(this);
        this.updateNeighbors = this.updateNeighbors.bind(this);
        this.getToroidalX = this.getToroidalX.bind(this);
        this.getToroidalY = this.getToroidalY.bind(this);
        this.flushBoard = this.flushBoard.bind(this);
        this.clearBoard = this.clearBoard.bind(this);
        this.randomizeBoard = this.randomizeBoard.bind(this);
        this.tick = this.tick.bind(this);
        this.doTick = this.doTick.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);

        // We'll build our blank board here
        this.pendingBoard = {};
        for (let x: number = 0; x < this.props.width; x++) {
            for (let y: number = 0; y < this.props.height; y++) {
                this.pendingBoard[x + 'x' + y] = {
                    alive: false,
                    livingNeighbors: 0
                };
            }
        }

        // Birth random cells onto our blank board
        for (let x: number = 0; x < this.props.width; x++) {
            for (let y: number = 0; y < this.props.height; y++) {
                if (Math.random() < 0.5) this.birthCell(x, y);
            }
        }

        // Set the state to a copy of the pendingBoard object
        this.state = {
            cells: JSON.parse(JSON.stringify(this.pendingBoard))
        };
    }

    render() {

        let cellElementArray: any[] = [];

        for (let y: number = 0; y < this.props.height; y++) {
            for (let x: number = 0; x < this.props.width; x++) {

                let cellKey = x + 'x' + y;

                cellElementArray.push(
                    <LifeCell key={cellKey} x={x} y={y} alive={this.state.cells[cellKey].alive} toggleCell={this.toggleCell} />
                );

            }
        }

        return (
            <div id="gol-board">
                {cellElementArray}
            </div>
        );
    }

    getToroidalX(x: number): number {
        if (x < 0) return this.props.width - 1;
        if (x >= this.props.width) return x % this.props.width;
        return x; 
    }

    getToroidalY(y: number): number {
        if (y < 0) return this.props.height - 1;
        if (y >= this.props.height) return y % this.props.height;
        return y; 
    }

    updateNeighbors(x: number, y: number, modification: number) {

        [
            // Above
            [0, -1],
            // Below
            [0, 1],
            // Left
            [-1, 0],
            // Right 
            [1, 0],
            // Above Left
            [-1, -1],
            // Above Right
            [1, -1],
            // Below Left
            [-1, 1],
            // Below Right
            [1, 1]
        ].map((addressTransformation) => {
            let dx = addressTransformation[0];
            let dy = addressTransformation[1];
            this.pendingBoard[this.getToroidalX(x + dx) + 'x' + this.getToroidalY(y + dy)].livingNeighbors += modification;
        });
        

    }

    private modifyCell(x: number, y: number, alive: boolean) {
        // Use toroidal address
        let nx = this.getToroidalX(x);
        let ny = this.getToroidalY(y);
        this.pendingBoard[nx + 'x' + ny].alive = alive;
        this.updateNeighbors(nx, ny, (alive ? 1 : -1));
    }

    birthCell(x: number, y: number, updateBoard: boolean = false) {
        // If this cell is already alive, bail out
        if (this.pendingBoard[x + 'x' + y].alive) return;

        this.modifyCell(x, y, true);
        if (updateBoard) this.flushBoard();
    }

    killCell(x: number, y: number, updateBoard: boolean = false) {
        // If this cell is already dead, bail out
        if (! this.pendingBoard[x + 'x' + y].alive) return;
        this.modifyCell(x, y, false);
        if (updateBoard) this.flushBoard();
    }

    toggleCell(x: number, y: number) {
        if (this.state.cells[x + 'x' + y].alive) {
            this.killCell(x, y, true);
        } else {
            this.birthCell(x, y, true);
        }
    }

    flushBoard() {
        this.setState({
            cells: JSON.parse(JSON.stringify(this.pendingBoard)),
        });
    }

    clearBoard() {
        for (let x: number = 0; x < this.props.width; x++) {
            for (let y: number = 0; y < this.props.height; y++) {
                this.killCell(x, y);
            }
        }
        this.flushBoard();
        this.props.pubsub.emit("reset-generation");
    }

    randomizeBoard() {
        this.clearBoard();
        for (let x: number = 0; x < this.props.width; x++) {
            for (let y: number = 0; y < this.props.height; y++) {
                if (Math.random() < 0.5) this.birthCell(x, y);
            }
        }
        this.flushBoard();
    }

    doTick() {
        if (! this.props.ticking) return;
        this.tick();
    }

    tick() {

        let changeList: string[] = [];
        for (let x: number = 0; x < this.props.width; x++) {
            for (let y: number = 0; y < this.props.height; y++) {              
                let cellAddress = x + 'x' + y;
                if (this.pendingBoard[cellAddress].alive) {
                    // Cell is alive
                    if (this.pendingBoard[cellAddress].livingNeighbors < 2) {
                        // Cell is alive but isolated. It will die.
                        changeList.push('kill-' + x + '-' + y);
                    } else if (this.pendingBoard[cellAddress].livingNeighbors > 3) {
                        // Cell is alive but crowded. It will die.
                        changeList.push('kill-' + x + '-' + y);
                    }
                } else {
                    // Cell is dead
                    if (this.pendingBoard[cellAddress].livingNeighbors == 3) {
                        // Cell is dead but has 3 living neighbors. It will be born.
                        changeList.push('birth-' + x + '-' + y);
                    }
                }
            }
        }

        // Now, apply the list of changes to the pending board, and push it to state
        changeList.map((instruction) => {
            let instructions: string[] = instruction.split('-');
            let command: string = instructions[0];
            let x: number = parseInt(instructions[1]);
            let y: number = parseInt(instructions[2]);

            if (command == "kill") {
                this.killCell(x, y);
            } else if (command == "birth") {
                this.birthCell(x, y);
            } else {
                console.log("Error with instruction " + command + " [" + x + "x" + "]");
            }
        });

        this.flushBoard();
        window.setTimeout(this.doTick, this.props.speed);
        this.props.pubsub.emit('increment-generation');
    }

    componentDidMount() {
        if (this.props.ticking) this.doTick();
        this.props.pubsub.on("clear", () => {this.clearBoard()});
        this.props.pubsub.on("force-tick", () => {this.tick()});
        this.props.pubsub.on("randomize", () => {this.randomizeBoard()});
        this.props.pubsub.on("one-tick", () => {this.tick()});
    }
}