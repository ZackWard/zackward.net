interface Zone {
    width: number,
    height: number,
    top: number,
    left: number,
    tiles?: string[][];
}

export class TileMap {

    id: number;
    width: number;
    height: number;
    tiles: string[][];
    zones: Zone[];
    emptyCell: string;

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
        this.emptyCell = "**";

        // Initialize our tiles
        this.tiles = [];
        for (let x: number = 0; x < width; x++) {
            this.tiles[x] = [];
            for (let y: number = 0; y < height; y++) {
                this.tiles[x][y] = this.emptyCell;
            }
        }

        // Initialize our zones
        this.zones = this.splitZone({
            top: 1,
            left: 1,
            width: width - 2,
            height: height - 2
        });
        this.zones = this.shrinkZones();
        this.generateZoneTiles();

        // Connect our zones to hallways
        this.connectZones();
    }

    connectZones() {
        this.generateTiles();
        this.zones.forEach(zone => {
            let potentialDoors: any = [];
            for (let x: number = zone.left; x < zone.left + zone.width; x++) {
                for (let y: number = zone.top; y < zone.top + zone.height; y++) {
                    if (this.isPotentialDoor(zone, x, y)) {
                        potentialDoors.push([x,y]);
                    }
                }
            }
            // Pick a random potendial door. Maybe pick a second door based on a random chance
            if (Math.random() >= 0.55) {
                let door1: any = potentialDoors[Math.floor(Math.random() * potentialDoors.length)];
                zone.tiles[door1[0]][door1[1]] = "DD";
                let door2: any = potentialDoors[Math.floor(Math.random() * potentialDoors.length)];
                zone.tiles[door2[0]][door2[1]] = "DD";
            } else {
                let door1 = potentialDoors[Math.floor(Math.random() * potentialDoors.length)];
                zone.tiles[door1[0]][door1[1]] = "DD";
            }
        });
        this.generateTiles();
    }

    isPotentialDoor(zone: Zone, x: number, y: number): boolean {
        // Return false for any corners. Also, return false for the walls just N/S of corners
        if ((x == zone.left || x == zone.left + zone.width - 1) && (y == zone.top || y == zone.top + 1 || y == zone.top + zone.height - 1 || y == zone.top + zone.height - 2)) {
            return false;
        }
        // Return false for walls that are E/W of the top and bottom corners
        if ((y == zone.top || y == zone.top + zone.height - 1) && (x == zone.left + 1 || x == zone.left + zone.width - 2)) {
            return false;
        }
        if (x == zone.left && this.tiles[x-1] !== undefined && this.tiles[x - 1][y] == this.emptyCell && y !== zone.top + 1 && y !== zone.top + zone.height - 2) {
            return true;
        }
        if (x == zone.left + zone.width - 1 && this.tiles[x+1] !== undefined && this.tiles[x+1][y] == this.emptyCell) {
            return true;
        }
        if (y == zone.top && this.tiles[x][y-1] == this.emptyCell) {
            return true;
        }
        if (y == zone.top + zone.height - 1 && this.tiles[x][y+1] == this.emptyCell) {
            return true;
        }

        return false;

    }

    isCellEmpty(x: number, y: number): boolean {
        if (this.tiles[x] !== undefined && this.tiles[x][y] !== undefined && this.tiles[x][y] == this.emptyCell) {
            return true;
        }
        return false;
    }

    splitZone(zone: Zone): Zone[] {

        let minSize: number = 10;

        // Occasionaly, we want to leave a huge area, but nothing larger than the minimum size * 5
        if (zone.width < minSize * 3 && zone.height < minSize * 3 && Math.random() >= 0.925) {
            console.log("Creating a UUUUGE room!");
            return [zone];
        }

        // Randomly choose split orientation 
        let vertical: boolean = (Math.random() >= 0.5) ? true : false;
    
        // Make sure that this area is large enough to split
        if ( ( vertical && zone.width < minSize * 2 ) || ( ! vertical && zone.height < minSize * 2 ) ) {
        // Oops, this area isn't big enough to split according to our desired orientation. Maybe it's big enough to split the other way.
        // We'll flip our orientation and check again

        // Maybe use a random chance to see if we should split it the other way
            if (Math.random() >= 0.4) {
                return [zone];
            }

            vertical = vertical ? false : true;
            if ( ( vertical && zone.width < minSize * 2 ) || ( ! vertical && zone.height < minSize * 2 ) ) {
                // No, this area can't be split either horizontal or vertical
                return [zone];
            }
        }

        let subZoneA: Zone, subZoneB: Zone;

        // Randomly choose the size of the split
        let splitSize: number = 0;
        
        if (vertical) {
            let maxSize: number = Math.ceil(zone.width - minSize);
            splitSize = Math.floor(Math.random() * (maxSize - minSize)) + minSize;
            subZoneA = {top: zone.top, left: zone.left,             width: splitSize,              height: zone.height}; 
            subZoneB = {top: zone.top, left: zone.left + splitSize, width: zone.width - splitSize, height: zone.height}; 
        } else {
            let maxSize: number = Math.ceil(zone.height - minSize);
            splitSize = Math.floor(Math.random() * (maxSize - minSize)) + minSize;
            subZoneA = {top: zone.top,             left: zone.left, width: zone.width, height: splitSize}; 
            subZoneB = {top: zone.top + splitSize, left: zone.left, width: zone.width, height: zone.height - splitSize}; 
        }

        let subZones: Zone[] = this.splitZone(subZoneA).concat(this.splitZone(subZoneB));

        return subZones;       
    }

    shrinkZones(): Zone[] {
        let padding: number = 2;
        return this.zones.map(zone => {

            let heightPad: number = zone.top == 1 ? padding : 0;
            let widthPad: number = zone.left == 1 ? padding : 0;

            return {
                top: zone.top + heightPad,
                left: zone.left + widthPad,
                width: zone.width - padding - widthPad,
                height: zone.height - padding - heightPad
            };
        });
    }

    generateZoneTiles() {
        this.zones.forEach((zone, index) => {
            // First, initialize the tiles array for each zone
            zone.tiles = [];
            for (let x: number = zone.left; x < zone.left + zone.width; x++) {
                zone.tiles[x] = [];
                for (let y: number = zone.top; y < zone.top + zone.height; y++) {
                    zone.tiles[x][y] = "FF";
                    zone.tiles[x][y] = y == zone.top || y == zone.top + zone.height - 1 ? "--" : zone.tiles[x][y];
                    zone.tiles[x][y] = x == zone.left || x == zone.left + zone.width - 1 ? "||" : zone.tiles[x][y];
                    zone.tiles[x][y] = x == zone.left && y == zone.top  ? "TL" : zone.tiles[x][y];
                    zone.tiles[x][y] = x == zone.left && y == zone.top + zone.height - 1 ? "BL" : zone.tiles[x][y];
                    zone.tiles[x][y] = x == zone.left + zone.width - 1 && y == zone.top ? "TR" : zone.tiles[x][y]; 
                    zone.tiles[x][y] = x == zone.left + zone.width - 1 && y == zone.top + zone.height - 1 ? "BR" : zone.tiles[x][y];
                }
            }
        });
    }

    generateTiles() {
        // This method just transfers the local zone tilemaps onto the master tilemap
        this.zones.forEach((zone: Zone, index: number) => {
            for (let x: number = zone.left; x < zone.left + zone.width; x++) {
                for (let y: number = zone.top; y < zone.top + zone.height; y++) {
                    this.tiles[x][y] = zone.tiles[x][y];
                }
            }
        });

        // We should have empty space along the borders of the tilemap, let's put walls there
        for (let x: number = 0; x < this.width; x++) {
            for (let y: number = 0; y < this.height; y++) {
                this.tiles[x][y] = y == 0 || y == this.height - 1 ? "--" : this.tiles[x][y];
                this.tiles[x][y] = x == 0 || x == this.width - 1 ? "||" : this.tiles[x][y];
                this.tiles[x][y] = x == 0 && y == 0 ? "TL" : this.tiles[x][y];
                this.tiles[x][y] = x == this.width - 1 && y == 0 ? "TR" : this.tiles[x][y];
                this.tiles[x][y] = x == 0 && y == this.height - 1 ? "BL" : this.tiles[x][y];
                this.tiles[x][y] = x == this.width - 1 && y == this.height - 1 ? "BR" : this.tiles[x][y];
            }
        }
    }

    print() {

        // Transfer all zones onto the main TileMap
        this.generateTiles();

        for (let y: number = 0; y < this.height; y++) {
            let row: string = "";
            for (let x: number = 0; x < this.width; x++) {
                row += this.tiles[x][y];
            }
            console.log(row + " <-- row #" + y + " -- length: " + row.length);
        }
    }

    export() {
        // Set certain tiles to be unpassable
        let blockingTiles: number[] = [24, 25, 26, 32, 33, 40, 42];

        let map: any = {};
        for (let x: number = 0; x < this.width; x++) {
            for (let y: number = 0; y < this.height; y++) {
                let tile: number = this.getTile(x, y);
                map[x + "x" + y] = {
                    walkable: blockingTiles.indexOf(tile) == -1 ? true : false,
                    background: tile,
                    foreground: 55
                };
            }
        }

        return map;
    }

    getTile(x: number, y: number): number {

        if (this.tiles[x][y] == "||" && this.tiles[x][y+1] == "DD") {
            return 33;
        }

        if (this.tiles[x-1] !== undefined && this.tiles[x+1] !== undefined && this.tiles[x-1][y] == "--" && this.tiles[x+1][y] == "--" && this.tiles[x][y] == "DD") {
            return 11;
        }
        if (this.tiles[x][y] == "DD" && this.tiles[x][y-1] == "||" && this.tiles[x][y+1] == "||") {
            return 13;
        }

        if (this.tiles[x-1] !== undefined && this.tiles[x-1][y-1] == "TL") {
            return 0;
        }

        if (this.tiles[x-1] !== undefined && this.tiles[x-1][y+1] == "BL") {
            return 16;
        }

        if (this.tiles[x+1] !== undefined && this.tiles[x+1][y+1] == "BR") {
            return 18;
        }

        if (this.tiles[x+1] !== undefined && this.tiles[x+1][y-1] == "TR") {
            return 2;
        }

        if (this.tiles[x-1] !== undefined && (this.tiles[x-1][y] == "||" || this.tiles[x-1][y] == "TR" || this.tiles[x-1][y] == "BR")) {
            return 8;
        }

        if (this.tiles[x+1] !== undefined && (this.tiles[x+1][y] == "||" || this.tiles[x+1][y] == "TL" || this.tiles[x+1][y] == "BL")) {
            return 10;
        }

        if (this.tiles[x][y+1] == "--" || this.tiles[x][y+1] == "TL" || this.tiles[x][y+1] == "TR") {
            return 17;
        }

        if (this.tiles[x][y-1] == "--" || this.tiles[x][y-1] == "BL" || this.tiles[x][y-1] == "BR") {
            return 1;
        }

        if (this.tiles[x][y] == "--") {
            return 25;
        }

        if (this.tiles[x][y] == "||") {
            return 32;
        }

        if (this.tiles[x][y] == "TL") {
            return 24;
        }

        if (this.tiles[x][y] == "TR") {
            return 26;
        }

        if (this.tiles[x][y] == "BL") {
            return 40;
        }

        if (this.tiles[x][y] == "BR") {
            return 42;
        }

        if (this.tiles[x][y] == "**") {
            return 9;
        }

        return 9;
    }
}