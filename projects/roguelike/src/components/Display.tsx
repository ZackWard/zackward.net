import * as React from "react";

import {moveLeft, moveRight, moveUp, moveDown} from "../actions";

interface TileList {
    [cellAddress: string]: {
        background: string,
        item?: string,
        entity?: string,
        foreground: string
    }
}

export interface DisplayProps {
    rows: number,
    columns: number,
    tiles: TileList,
    moveUp: () => void,
    moveDown: () => void,
    moveLeft: () => void,
    moveRight: () => void

}

export interface DisplayState {
    
}

export class Display extends React.Component<DisplayProps, DisplayState> {

    tileAtlas: any;

    constructor(props: DisplayProps) {
        super(props);

        this.getRow = this.getRow.bind(this);
        this.getCell = this.getCell.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.componentWillUnmount = this.componentWillUnmount.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }

    getCell(x:number, y:number) {

        let tile = this.props.tiles[x + "x" + y];

        let layers: any = [];

        layers.push(<div key={x + "-" + y + "-background"} className={"tile background " + tile.background}></div>);
        if (tile.hasOwnProperty('item')) {
            layers.push(<div key={x + "-" + y + "-item"} className={"tile item " + tile.item}></div>);
        }
        if (tile.hasOwnProperty('entity')) {
            layers.push(<div key={x + "-" + y + "-entity"} className={"tile entity " + tile.entity}></div>);
        }
        layers.push(<div key={x + "-" + y + "-foreground"} className={"tile foreground " + tile.foreground}></div>);

        return (
            <td key={x + "-" + y} className="roguelike-tile">
                {layers}
            </td>
        );
    }

    getRow(y: number) {
        let cells: any = [];
        for (let x: number = 0; x < this.props.columns; x++) {
            cells.push(this.getCell(x, y));            
        }
        return (
            <tr key={"row-" + y}>
                {cells}
            </tr>
        );
    }

    render() {

        let rows: any = [];

        for (let i: number = 0; i < this.props.rows; i++) {
            rows.push(this.getRow(i));
        }

        return (
            <table id="roguelike-display">
                <tbody>
                    {rows}
                </tbody>
            </table>
        );
    }

    componentDidMount() {
        window.addEventListener('keypress', this.handleInput);
    }

    componentWillUnmount() {
        window.removeEventListener('keypress', this.handleInput);
    }

    handleInput(e: KeyboardEvent) {
        e.preventDefault();
        switch (e.key) {
            case 'a': 
                this.props.moveLeft();
                break;
            case 's': 
                this.props.moveDown();
                break;
            case 'd': 
                this.props.moveRight();
                break;
            case 'w': 
                this.props.moveUp();
                break;
        }
    }
}