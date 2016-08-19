export class golCell {
    x: number;
    y: number;
    alive: boolean;

    constructor(x: number, y: number, living: boolean = false) {
        this.x = x;
        this.y = y;
        this.alive = living;
    }
};