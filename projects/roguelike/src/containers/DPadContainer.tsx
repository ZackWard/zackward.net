import {connect} from "react-redux";
import {DPad} from "../components/DPad";
import {moveUp, moveDown, moveLeft, moveRight} from "../actions";

const mapDispatchToProps = (dispatch: any) => {
    return {
        onUp: () => { dispatch(moveUp()); },
        onDown: () => { dispatch(moveDown()); },
        onLeft: () => { dispatch(moveLeft()); },
        onRight: () => { dispatch(moveRight()); },
    };
};

export const DPadContainer = connect(null, mapDispatchToProps)(DPad as any);