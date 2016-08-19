import * as React from "react";

import {LifeMenu} from "./LifeMenu";
import {LifeBoard} from "./LifeBoard";
import {golCell} from "../golCell.ts";
import {golBoard} from "../golBoard";

export interface GameOfLifeProps {
    rows: number,
    cols: number
}

export interface GameOfLifeState {
    generations: number;
    playing: boolean;
    board: golBoard;
}

export class GameOfLife extends React.Component<GameOfLifeProps, GameOfLifeState> {

    constructor(props: GameOfLifeProps) {
        super(props);

        // Prebind methods
        this.updateBoard = this.updateBoard.bind(this);
        this.clearBoard = this.clearBoard.bind(this);
        this.togglePlaying = this.togglePlaying.bind(this);
        this.tick = this.tick.bind(this);
        
        this.state = {
            generations: 0,
            playing: false,
            board: new golBoard(this.props.cols, this.props.rows)
        };

    }
    
    render() {
        return (
            <div id="game-of-life">
                <LifeMenu generations={this.state.generations} togglePlaying={this.togglePlaying} clearBoard={this.clearBoard} playing={this.state.playing} />
                <LifeBoard board={this.state.board} onUpdate={this.updateBoard}></LifeBoard>
            </div>
        );
    }

    updateBoard(board: golBoard) {
        this.setState({
            generations: board.generation,
            playing: this.state.playing,
            board: board
        });
    }

    clearBoard() {
        this.state.board.clear();
        this.updateBoard(this.state.board);
    }

    togglePlaying() {
        if (this.state.playing) {
            this.setState({
                generations: this.state.generations,
                playing: false,
                board: this.state.board
            });
        } else {
            this.setState({
                generations: this.state.generations,
                playing: true,
                board: this.state.board
            });
            // Ok, now we need to actually start the ticker
            window.setTimeout(() => this.tick(), 250);
        }
    }

    tick() {
        // If the player has stopped the game, we won't proceed
        if (! this.state.playing) {
            return;
        }
        this.state.board.getNextGeneration();
        this.updateBoard(this.state.board);
        window.setTimeout(() => this.tick(), 250);
    }
}