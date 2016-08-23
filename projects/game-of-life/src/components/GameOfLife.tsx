import * as React from "react";

import {LifeMenu} from "./LifeMenu";
import {LifeBoard} from "./LifeBoard";
import {PubSub} from "../gol-pubsub.ts";

export interface GameOfLifeProps {
    rows: number,
    cols: number
}

export interface GameOfLifeState {
    generation: number;
    ticking: boolean;
}

export class GameOfLife extends React.Component<GameOfLifeProps, GameOfLifeState> {

    private pubsub: PubSub;

    constructor(props: GameOfLifeProps) {
        super(props);

        // Here is my attempt at a pubsub event system
        this.pubsub = new PubSub();

        this.state = {
            generation: 0,
            ticking: true
        };

        // Prebind methods
        this.toggleTicking = this.toggleTicking.bind(this);
        this.incrementGeneration = this.incrementGeneration.bind(this);
        this.resetGeneration = this.resetGeneration.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }
    
    render() {

        let styleString: string = `
            .gol-cell {
                
            }
        `;

        return (
            <div id="game-of-life">
                <style>
                    {styleString}
                </style>
                <LifeMenu pubsub={this.pubsub} generation={this.state.generation} ticking={this.state.ticking}></LifeMenu>
                <LifeBoard pubsub={this.pubsub} width={this.props.cols} height={this.props.rows} ticking={this.state.ticking} speed={50}></LifeBoard>
            </div>
        );
    }  

    componentDidMount() {
        this.pubsub.on("toggle-ticking", () => {this.toggleTicking()});
        this.pubsub.on('reset-generation', () => {this.resetGeneration()});
        this.pubsub.on('increment-generation', () => {this.incrementGeneration()});
    }

    toggleTicking() {
        let newStatus: boolean = this.state.ticking ? false : true;
        if (newStatus) this.pubsub.emit('force-tick');
        this.setState({
            generation: this.state.generation,
            ticking: newStatus
        });
    }

    incrementGeneration() {
        this.setState({
            ticking: this.state.ticking,
            generation: this.state.generation + 1
        });
    }

    resetGeneration() {
        this.setState({
            ticking: this.state.ticking,
            generation: 0
        });
    }
}