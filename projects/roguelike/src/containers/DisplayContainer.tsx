import {moveUp, moveDown, moveLeft, moveRight} from "../actions";
import {connect} from "react-redux";
import {Display} from "../components/Display";
import {roguelikeState} from "../MapGenerator";

const mapStateToProps = (state: roguelikeState) => {

    // We only need to pass the visible tiles to the display component
    let visibleTiles: any = {};
    let displayX: number = 0;
    let displayY: number = 0;

    for (let y: number = state.map.camera.y; y < state.map.camera.y + state.map.camera.height; y++) {
        displayX = 0;
        for (let x: number = state.map.camera.x; x < state.map.camera.x + state.map.camera.width; x++) {
            visibleTiles[displayX + 'x' + displayY] = {
                background: "tile-" + state.map.tiles[x + "x" + y].background,
                foreground: "tile-" + state.map.tiles[x + "x" + y].foreground
            };
            if (state.map.tiles[x + "x" + y].hasOwnProperty('entity') && state.map.tiles[x + "x" + y].entity !== undefined) {
                let entityNumber = state.map.tiles[x + "x" + y].entity;
                visibleTiles[displayX + "x" + displayY].entity = "tile-" + state.entities[entityNumber].sprite;
            }
            if (state.map.tiles[x + "x" + y].hasOwnProperty('item') && state.map.tiles[x + "x" + y].item !== undefined) {
                let itemNumber: number = state.map.tiles[x + "x" + y].item;
                visibleTiles[displayX + "x" + displayY].item = "tile-" + state.items[itemNumber].sprite;
            }
            displayX++;
        }
        displayY++;
    }

    return {
        tiles: visibleTiles,
        rows: state.map.camera.height,
        columns: state.map.camera.width
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        moveUp: () => {dispatch(moveUp());},
        moveDown: () => {dispatch(moveDown());},
        moveLeft: () => {dispatch(moveLeft());},
        moveRight: () => {dispatch(moveRight());}
    };
};

// TODO "Display as any" should be correctly typed
export const DisplayContainer = connect(mapStateToProps, mapDispatchToProps)(Display as any);