import * as React from "react";

interface DPadProps {
    onUp: () => void,
    onDown: () => void,
    onLeft: () => void,
    onRight: () => void
}

export const DPad = (props: DPadProps) => {
    return (
        <div id="d-pad">
            <div id="d-pad-top">
                <button className="d-pad-button" onClick={props.onUp}><i className="fa fa-arrow-up" aria-hidden="true"></i></button><br />
            </div>
            <div id="d-pad-bottom">
                <button className="d-pad-button" onClick={props.onLeft}><i className="fa fa-arrow-left" aria-hidden="true"></i></button>
                <button className="d-pad-button" onClick={props.onDown}><i className="fa fa-arrow-down" aria-hidden="true"></i></button>
                <button className="d-pad-button" onClick={props.onRight}><i className="fa fa-arrow-right" aria-hidden="true"></i></button>
            </div>
        </div>
    );
};