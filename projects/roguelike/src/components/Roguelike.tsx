import * as React from "react";
import * as Redux from "redux";

import {MessageBoxContainer} from "../containers/MessageBoxContainer";
import {DisplayContainer} from "../containers/DisplayContainer";
import {StatusDisplayContainer} from "../containers/StatusDisplayContainer";

export interface RoguelikeProps {
    started: boolean,
    won: boolean,
    dead: boolean,
    deaths: number,
    startNewGame: () => void
}

export const Roguelike = (props: RoguelikeProps) => {

    let screen: any = <div></div>;

    if (!props.started) {
        screen = (
            <div className="row">
                <div className="col-xs-12 text-center game-dialog">
                    <p>You are a ninja. Eliminate "The Boss".</p>
                    <button onClick={props.startNewGame}>Start</button>
                </div>
            </div>
        );
    } 
    if (props.started && !props.dead) {
        screen = (
            <div className="row">
                <div className="col-xs-12 col-sm-6">
                    <DisplayContainer></DisplayContainer>
                </div>
                <div className="col-xs-12 col-sm-6">
                    <StatusDisplayContainer></StatusDisplayContainer>
                    <MessageBoxContainer></MessageBoxContainer>
                </div>
            </div>
        );
    }
    if (props.dead) {
        screen = (
            <div className="row">
                <div className="col-xs-12 text-center game-dialog">
                    <p>You're dead! You've died {props.deaths} times.</p>
                    <button onClick={props.startNewGame}>Try again</button>
                </div>
            </div>
        );
    }

    if (props.won) {
        screen = (
            <div className="row">
                <div className="col-xs-12 text-center game-dialog">
                    <p>You've defeated The Boss. Nice work!</p>
                </div>
            </div>
        );
    }

    return (
        <div className="roguelike">
            <div className="container">
                {screen}
            </div>
            <footer className="footer">
                <div className="container text-center">
                    <p className="text-muted"><small>Built with React, Redux, and Love by <a href="http://www.zackward.net">Zack Ward</a>. 
                    Modified <a href="http://opengameart.org/content/dawnlike-16x16-universal-rogue-like-tileset-v181">DawnLike</a> tileset used under <a href="https://creativecommons.org/licenses/by-sa/3.0/">CC BY-SA 3.0</a> license.
                    Palette designed by DawnBringer. 
                    Source code on <i className="fa fa-github" aria-hidden="true"></i><a href="https://github.com/ZackWard/zackward.github.io/tree/master/projects/roguelike">GitHub.</a></small></p>
                </div>
            </footer>
        </div>
    );
}