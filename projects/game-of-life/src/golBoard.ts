import {golCell} from "./golCell.ts";

interface CellCollection {
    [address: string]: golCell
}

interface Neighbors {
    x: number,
    y: number
}

export class golBoard {

    public width: number;
    public height: number;

    public generation: number;

    public neighbors: Neighbors[];

    public board: CellCollection;

    public livingCells: string[];

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;

        this.generation = 0;

        this.board = {};
        this.livingCells = [];

        // This will be used to quickly check a cell's neighbors
        this.neighbors = [
            {
                // Above
                x: 0,
                y: -1
            },
            {
                // Below
                x: 0,
                y: 1
            },
            {
                // Left
                x: -1,
                y: 0
            },
            {
                // Right
                x: 1,
                y: 0
            },
            {
                // Above Left
                x: -1,
                y: -1
            },
            {
                // Above Right
                x: 1,
                y: -1
            },
            {
                // Below Left
                x: -1,
                y: 1
            },
            {
                // Below Right
                x: 1,
                y: 1
            }
        ]
        
        for (let x: number = 0; x < width; x++) {
            for (let y: number = 0; y < height; y++) {
                this.board[x + "x" + y] = new golCell(x, y);
                
                // We want to randomly assign life or death to a cell to build a random board pattern
                if (Math.random() < 0.5) {
                    this.birth(x, y);
                }
            }
        }
    }

    getCell(x: number, y: number): golCell {
        let address = this.getToroidalX(x) + "x" + this.getToroidalY(y);
        return this.board[address];
    }

    getToroidalX(x: number): number {
        let nx: number = x;
        if (nx < 0) nx = this.width - 1;
        if (nx >= this.width) nx = nx % this.width;
        return nx;
    }

    getToroidalY(y: number): number {
        let ny: number = y;
        if (ny < 0) ny = this.height - 1;
        if (ny >= this.height) ny = ny % this.height;
        return ny;
    }

    getLivingNeighborsCount(x: number, y: number): number {
        let livingNeighbors = 0;
        this.neighbors.map((neighbor) => {
            if (this.getCell(x + neighbor.x, y + neighbor.y).alive) livingNeighbors++;
        });
        return livingNeighbors;
    }

    kill(x: number, y:number): void {
        this.getCell(x, y).alive = false;
        if (this.livingCells.indexOf(x + "x" + y) !== -1) {
            this.livingCells.splice(this.livingCells.indexOf(x + "x" + y), 1);
        }
    }

    birth(x: number, y: number): void {
        this.getCell(x, y).alive = true;
        if (this.livingCells.indexOf(x + "x" + y) === -1) {
            this.livingCells.push(x + "x" + y);
        }
    }

    clear() {
        let killList = this.livingCells.slice(0);
        killList.map((cellAddress) => {
            let x: number = parseInt(cellAddress.split('x')[0]);
            let y: number = parseInt(cellAddress.split('x')[1]);
            this.kill(x, y);
        });
    }

    getNextGeneration() {

        // First, we need to get a list of every living cell, and every cell that is adjacent to a living cell
        let livingAndAdjacentList: string[] = [];

        this.livingCells.map((livingCell) => {
            livingAndAdjacentList.push(livingCell);
            let cellAddress = livingCell.split('x');
            let x = cellAddress[0];
            let y = cellAddress[1];

            this.neighbors.map((addressTransformation) => {
                
                let nx: number = this.getToroidalX(parseInt(x) + addressTransformation.x);
                let ny: number = this.getToroidalY(parseInt(y) + addressTransformation.y);

                if (livingAndAdjacentList.indexOf(nx + "x" + ny) === -1) {
                    livingAndAdjacentList.push(nx + "x" + ny);
                }
            });
        });

        // Ok, now we have a list of every cell that might change status. Now we need to see what changes will actually occur.
        // We can't actually make any changes until we evaluate every living cell and any living-adjacent cells.
        let pendingChanges: string[] = [];
        livingAndAdjacentList.map((cellAddress: string) => {
            let cellX: number = parseInt(cellAddress.split('x')[0]);
            let cellY: number = parseInt(cellAddress.split('x')[1]);

            let living: boolean = this.getCell(cellX, cellY).alive;
            let livingNeighbors: number = this.getLivingNeighborsCount(cellX, cellY);

            if (living) {
                if (livingNeighbors < 2 || livingNeighbors > 3) {
                    pendingChanges.push("kill-" + cellX + "-" + cellY);
                }
            } else {
                if (livingNeighbors == 3) {
                    pendingChanges.push("birth-" + cellX + "-" + cellY);
                }
            }
        });

        // Now, actually make the changes
        console.log(pendingChanges);
        this.generation++;
        
        pendingChanges.map((orderString: string) => {
            let order = orderString.split('-');
            let command: string = order[0];
            let x: number = parseInt(order[1]);
            let y: number = parseInt(order[2]);

            if (command === 'kill') {
                console.log("Killing " + x + "-" + y);
                this.kill(x, y);
            } else if (command === 'birth') {
                console.log("Birthing " + x + "-" + y);
                this.birth(x, y);
            } else {
                console.log("Something went wrong");
            }
        });

    }


}