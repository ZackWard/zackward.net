import * as React from "react";

export interface LifeMenuProps {
    generations: number;
    playing: boolean;
    togglePlaying: () => void;
    clearBoard: () => void;
}

export interface LifeMenuState {
    visible: boolean;
}

export class LifeMenu extends React.Component<LifeMenuProps, LifeMenuState> {

    constructor() {
        super();

        // Set initial state
        this.state = {
            visible: false
        };

        // Bind this instance to our functions
        this.toggle = this.toggle.bind(this);
    }

    render() { 

        let playIcon = "fa fa-3x " + (this.props.playing ? "fa-pause" : "fa-play");

        return (
            <div id="game-of-life-menu" className={this.state.visible ? "active" : ""}>
                <ul>
                    <li>Play/Pause</li>
                    <li>Clear</li>
                    <li>Size</li>
                    <li>Speed</li>
                </ul>
                <div id="game-of-life-menu-bottom">
                    <span>Generations: {this.props.generations}</span>
                    <a href="#" onClick={this.toggle}><i className="fa fa-chevron-down fa-3x" aria-hidden="true"></i></a>
                    <a href="#" onClick={() => this.props.togglePlaying()} ><i className={playIcon} aria-hidden="true"></i></a>
                    <a href="#" onClick={() => this.props.clearBoard()}>Clear</a>
                </div>
            </div>
        );
    }

    toggle() {
        this.setState({
            visible: this.state.visible ? false : true
        });
    }
}