import * as React from "react";

export interface LifeCellProps {
    x: number;
    y: number;
    alive: boolean;
    toggleCell: (x: number, y: number) => void;
}

export interface LifeCellState {
    
}

export class LifeCell extends React.Component<LifeCellProps, LifeCellState> {

    constructor(props: LifeCellProps) {
        super(props);

    }

    render() {
        return (
            <div 
                className={"gol-cell" + (this.props.alive ? " alive " : "") + (this.props.x < 1 ? " gol-clear" : "")}
                onClick={() => {this.props.toggleCell(this.props.x, this.props.y)}}
            ></div>
        );
    }

    shouldComponentUpdate(nextProps: LifeCellProps, nextState: LifeCellState) {
        return this.props.alive !== nextProps.alive;
    }

}