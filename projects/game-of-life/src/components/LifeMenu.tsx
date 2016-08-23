import * as React from "react";

import {PubSub} from "../gol-pubsub";

export interface LifeMenuProps {
    pubsub: PubSub;
    generation: number;
    ticking: boolean;
}

export interface LifeMenuState {

}

export class LifeMenu extends React.Component<LifeMenuProps, LifeMenuState> {

    constructor() {
        super();

        // Bind this instance to our functions
        this.singleTick = this.singleTick.bind(this);
    }

    render() { 

        let playIcon: string = "fa " + (this.props.ticking ? "fa-pause" : "fa-play");
        let playPause: string = (this.props.ticking ? "  Pause" : "   Play");

        return (

            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <a className="navbar-brand" href="#">Game of Life</a>
                    </div>

                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <ul className="nav navbar-nav">
                            <li><a href="#" onClick={this.singleTick}><i className="fa fa-step-forward"></i>  Next</a></li>
                            <li><a href="#" onClick={() => {this.props.pubsub.emit('toggle-ticking')} }><i className={playIcon}></i>{playPause}</a></li>
                            <li><a href="#" onClick={() => {this.props.pubsub.emit('clear')}}><i className="fa fa-trash"></i>  Clear</a></li>
                            <li><a href="#" onClick={() => {this.props.pubsub.emit('randomize')}}><i className="fa fa-random"></i>  Randomize</a></li>
                            
                        </ul>
                        <ul className="nav navbar-nav navbar-right">
                            <li className="dropdown">
                                <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Info <span className="caret"></span></a>
                                <ul className="dropdown-menu">
                                    <li><a href="http://www.zackward.net">Coded with <i className="fa fa-heart"></i> by Zack Ward</a></li>
                                    <li><a href="https://github.com/ZackWard/zackward.github.io/tree/master/projects/game-of-life/">Code hosted on <i className="fa fa-github"></i> GitHub</a></li>
                                </ul>
                            </li>
                            <li><a hrer="#">Generations: <span className="badge">{this.props.generation}</span></a></li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }

    singleTick() {
        // Only allow a single tick if we aren't actively ticking. This should prevent a situation where multiple tick chains 
        // are running
        if (this.props.ticking) return;
        this.props.pubsub.emit('one-tick');
    }
}