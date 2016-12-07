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

interface myTouch {
    id: number,
    x: number,
    y: number
}

export interface DisplayProps {
    rows: number;
    columns: number;
    tiles: TileList;
    defaultHealingItem?: number;
    moveUp: () => void;
    moveDown: () => void;
    moveLeft: () => void;
    moveRight: () => void;
    useHealingItem: (itemID: number) => void;
}

export interface DisplayState {
    
}

export class Display extends React.Component<DisplayProps, DisplayState> {

    myTouchList: myTouch[];

    constructor(props: DisplayProps) {
        super(props);

        this.getRow = this.getRow.bind(this);
        this.getCell = this.getCell.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.componentWillUnmount = this.componentWillUnmount.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.beginSwipe = this.beginSwipe.bind(this);
        this.handleSwipe = this.handleSwipe.bind(this);
        this.endSwipe = this.endSwipe.bind(this);
        this.cancelSwipe = this.cancelSwipe.bind(this);

        this.myTouchList = [];
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
            <div>
                <table id="roguelike-display">
                    <tbody>
                        {rows}
                    </tbody>
                </table>
                <p className="text-center"><small>Use the arrow keys, or <kbd>A</kbd>, <kbd>S</kbd>, <kbd>D</kbd>, <kbd>W</kbd> to navigate with keyboard.<br />
                 Use <kbd>m</kbd> to apply any medicine that you may have.<br />
                Swipe to move on mobile.</small></p>
            </div>
        );
    }

    componentDidMount() {
        window.addEventListener('keypress', this.handleInput);
        window.addEventListener('keydown', this.handleKeyDown);
        window.addEventListener('touchstart', this.beginSwipe);
        window.addEventListener('touchmove', this.handleSwipe);
        window.addEventListener('touchend', this.endSwipe);
        window.addEventListener('touchcancel', this.cancelSwipe);
    }

    componentWillUnmount() {
        window.removeEventListener('keypress', this.handleInput);
        window.removeEventListener('keydown', this.handleKeyDown);
        window.removeEventListener('touchstart', this.beginSwipe);
        window.removeEventListener('touchmove', this.handleSwipe);
        window.removeEventListener('touchend', this.endSwipe);
        window.removeEventListener('touchcancel', this.cancelSwipe);
    }

    handleSwipe(e: TouchEvent) {
        for (let i: number = 0; i < e.changedTouches.length; i++) {
            this.myTouchList.forEach((touch) => {
                if (touch.id == e.changedTouches[i].identifier) {
                    e.preventDefault();
                }
            });
        }
    }

    beginSwipe(e: TouchEvent) {
        // For each new touch, add the touch the our list of ongoing touches, but only if it originated on a map tile
        // New comment for new commit
        for (let i: number = 0; i < e.changedTouches.length; i++) {
            if (e.changedTouches[i].target instanceof Element) {
                let touchedElement: Element = e.changedTouches[i].target as Element;
                let touchedTile: boolean = false;
                for (let j: number = 0; j < touchedElement.classList.length; j++) {
                    if (touchedElement.classList[j] == "tile") {
                        touchedTile = true;
                    }
                }
                if (touchedTile) {
                    this.myTouchList.push({
                        id: e.changedTouches[i].identifier,
                        x: e.changedTouches[i].pageX,
                        y: e.changedTouches[i].pageY
                    });
                }
            }
        }
    }

    endSwipe(e: TouchEvent) {
        for (let i: number = 0; i < e.changedTouches.length; i++) {
            this.myTouchList.forEach((touch) => {
                if (touch.id == e.changedTouches[i].identifier) {
                    let dx: number = Math.floor(e.changedTouches[i].pageX - touch.x);
                    let dy: number = Math.floor(e.changedTouches[i].pageY - touch.y);
                    if (Math.abs(dx) > Math.abs(dy)) {
                        if (dx < 0) {
                            this.props.moveLeft();
                        } else if (dx > 0) {
                            this.props.moveRight();
                        }
                    } else if (Math.abs(dy) > Math.abs(dx)) {
                        if (dy < 0) {
                            this.props.moveUp();
                        } else if (dy > 0) {
                            this.props.moveDown();
                        }
                    }
                }
            });

            // Delete touch origin
            this.myTouchList = this.myTouchList.filter(touch => touch.id !== e.changedTouches[i].identifier);
        }
    }

    cancelSwipe(e: TouchEvent) {
        for (let i: number = 0; i < e.changedTouches.length; i++) {
            this.myTouchList = this.myTouchList.filter(touch => touch.id !== e.changedTouches[i].identifier);
        }
    }

    handleKeyDown(e: KeyboardEvent) {
        switch (e.key) {
            case 'ArrowUp':
                this.props.moveUp(); 
                break;
            case 'ArrowDown': 
                this.props.moveDown();
                break;
            case 'ArrowLeft': 
                this.props.moveLeft();
                break;
            case 'ArrowRight': 
                this.props.moveRight();
                break;
            default: 
                break;
        }
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
            case 'm':
                if (this.props.defaultHealingItem !== undefined && typeof this.props.defaultHealingItem == 'number') {
                    this.props.useHealingItem(this.props.defaultHealingItem);
                }  
                break;
            default: 
                break;
        }
    }
}