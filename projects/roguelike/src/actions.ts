export const MOVE_UP = 'MOVE_UP';
export const MOVE_DOWN = 'MOVE_DOWN';
export const MOVE_LEFT = 'MOVE_LEFT';
export const MOVE_RIGHT = 'MOVE_RIGHT';
export const USE_ITEM = 'USE_ITEM';
export const NEW_GAME = 'NEW_GAME';

export function moveUp() {
    return {
        type: MOVE_UP,
    };
}

export function moveDown() {
    return {
        type: MOVE_DOWN
    };
}

export function moveLeft() {
    return {
        type: MOVE_LEFT
    };
}

export function moveRight() {
    return {
        type: MOVE_RIGHT
    };
}

export function useItem(item: number) {
    return {
        type: USE_ITEM,
        item: item
    };
}

export function startNewGame() {
    return {
        type: NEW_GAME
    };
}