import {connect} from "react-redux";
import {roguelikeState} from "../MapGenerator";
import {Roguelike} from "../components/Roguelike";
import {startNewGame} from "../actions";

const mapStateToProps = (state: roguelikeState) => {
    return {
        started: state.status.started,
        won: state.status.won,
        dead: state.status.dead,
        deaths: state.status.deaths
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        startNewGame: () => {dispatch(startNewGame())}
    };
};

export const RoguelikeContainer = connect(mapStateToProps, mapDispatchToProps)(Roguelike as any);