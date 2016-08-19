import * as React from "react";

import {golCell} from "../golCell";
import {golBoard} from "../golBoard";


export interface LifeBoardProps {
    board: golBoard;
    onUpdate: (board: golBoard) => void
}

export interface LifeBoardState {
    
}

export class LifeBoard extends React.Component<LifeBoardProps, LifeBoardState> {

    constructor(props: LifeBoardProps) {
        super(props);
        this.toggleCell = this.toggleCell.bind(this);
    }

    render() {

        let cellKey: number = 0;
        let cellArray: any[] = [];

        for (let y: number = 0; y < this.props.board.height; y++) {
            for (let x: number = 0; x < this.props.board.width; x++) {

                let thisCell = this.props.board.getCell(x, y);

                let cellClasses = "gol-cell";
                    cellClasses += thisCell.alive ? " alive " : "";
                    cellClasses += (thisCell.x === 0) ? " gol-clear " : "";

                cellArray.push(
                    <div key={cellKey} onClick={() => {this.toggleCell(thisCell)}} className={cellClasses}></div>
                );
                cellKey++;
            }
        }

        return (
            <div id="gol-board">
                {cellArray}
            </div>
        );
    }

    toggleCell(cell: golCell) {
        console.log("Toggle cell [" + cell.x + ", " + cell.y + "]!");
        if (cell.alive) {
            this.props.board.kill(cell.x, cell.y);
        } else {
            this.props.board.birth(cell.x, cell.y);
        }

        // We need to let the app know that we've updated state.
        this.props.onUpdate(this.props.board);
    }

}