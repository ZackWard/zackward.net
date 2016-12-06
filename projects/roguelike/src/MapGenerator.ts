import {TileMap} from "./TileMap";

// Map out the application state tree here
export interface Entity {
    type: string,
    name: string,
    value?: number,
    location: string,
    sprite: number,
    level?: number,
    hp?: number,
    xp?: number,
    inventory?: number[],
    weapon?: number
}

export interface Item {
    name: string,
    type: string,
    value: number,
    sprite: number,
    location?: string
}

interface TileList {
    [address: string]: {
        walkable: boolean,
        background: number,
        foreground: number,
        entity?: number,
        item?: number
    }
}

export interface roguelikeState {
    map: {
        width: number,
        height: number,
        camera: {
            x: number,
            y: number,
            width: number,
            height: number
        },
        tiles: TileList
    },
    messages: string[],
    hero: number,
    entities: Entity[],
    items: Item[],
    status: {
        started: boolean,
        won: boolean,
        dead: boolean,
        deaths: number,
        bumpx: number,
        bumpy: number
    }
}

export function getDefaultState(): roguelikeState {
    
    let tilemap = new TileMap(75, 75);

    let defaultState: roguelikeState = {
        map: {
            width: 75,
            height: 75,
            camera: {
                x: 0,
                y: 0,
                width: 9,
                height: 9
            },
            tiles: tilemap.export()
        },
        messages: [],
        hero: 0,
        entities: [
            {
                type: "player",
                name: "Hero",
                location: "1x1",
                sprite: 20,
                level: 1,
                hp: 100,
                xp: 0,
                inventory: [0],
                weapon: 0
            }
        ],
        items: [
            {
                name: "a sharp rock",
                type: "weapon",
                value: 0,
                sprite: 38
            }
        ],
        status: {
            started: false,
            won: false,
            dead: false,
            deaths: 0,
            bumpx: 0,
            bumpy: 0
        }
    };

    // Please our Hero in the upper left hand corner of the map.
    let heroLocation: string = "1x1";
    defaultState.map.tiles[heroLocation].entity = defaultState.hero;
    defaultState.entities[defaultState.hero].location = heroLocation;

    defaultState = generateEnemies(defaultState);
    defaultState = generateItems(defaultState);

    return defaultState;
}

function generateItems(state: roguelikeState): roguelikeState {

    // Generate number of bandages based on the number of enemies
    for (let i: number = 0; i < Math.ceil(state.entities.length * .75)- 1; i++) {
        let coords = getRandomEmptyTile(state);
        let health: Item = {
            name: "a bottle of medicine",
            type: "healing",
            value: 0,
            sprite: 6,
            location: coords[0] + "x" + coords[1]
        };
        state.items.push(health);
        state.map.tiles[coords[0] + "x" + coords[1]].item = state.items.length - 1;
    }

    let weapons: Item[] = [
        {
            name: "a dagger",
            type: "weapon",
            value: 1,
            sprite: 15
        },
        {
            name: "a short sword",
            type: "weapon",
            value: 2,
            sprite: 23
        },
        {
            name: "a sword",
            type: "weapon",
            value: 3,
            sprite: 31
        },
        {
            name: "an axe",
            type: "weapon",
            value: 4,
            sprite: 7
        },
        {
            name: "a battle axe",
            type: "weapon",
            value: 5,
            sprite: 39
        }
    ];

    weapons.forEach(weapon => {
        let coords: number[] = getRandomEmptyTile(state);
        weapon.location = coords[0] + "x" + coords[1];
        state.items.push(weapon);
        state.map.tiles[coords[0] + "x" + coords[1]].item = state.items.length - 1;
    });

    return state;
}

function generateEnemies(state: roguelikeState): roguelikeState {
    let enemyCount: number = 10;
    for (let level: number = 1; level < 11; level++) {
        if (level == 10) {
            state = generateBoss(state);
        } else {
            for (let i: number = 0; i < enemyCount; i++) {
                state = generateEnemy(state, level);
            }
            enemyCount = enemyCount > 4 ? enemyCount - 1 : enemyCount;
        }
    }
    return state;
}

function generateEnemy(state: roguelikeState, level: number): roguelikeState {
    let randomNames: string = "Harvey Jason Miquel Issac Gayle Joan Wilbur Ronny Eugene Merle Mason Denis Mose German Irving Emil Gerry Giovanni Arnoldo Clyde Sandy Danilo Lyndon Lonny Darell Zachary Otis Spencer Dean Bennie Landon Orlando Tracey Maxwell Chad Cary Jerrold Carlo Edward Stanton Albert Pete Bobbie Glenn Tyson Doyle Jules Arden Mauricio Gus Slyvia Tanisha Catarina Chantelle Tawnya Marcene Matilde Jade Brittny Hope Eugena Eusebia Neda Davina Michelle Jazmine Kristian Margarete Hiedi Marci Arletha Socorro Tamela Valentina Patrica Evette Akiko Harmony Lindy Tawanna Joaquina Epifania Ping Kerstin Phillis Velda Elke Erica Juli Adelina Rita Beverlee Genia Kecia Deanne Belva Larae Lurline Meredith Soo";
    let names: string[] = randomNames.split(' ');
    let randomName: string = names[ Math.floor(Math.random() * names.length) ];

    let sprites: number[] = [48, 49, 50, 51, 52, 53]

    let coords: number[] = getRandomEmptyTile(state);
    let enemy: Entity = {
        type: "enemy",
        name: randomName,
        location: coords[0] + "x" + coords[1],
        sprite: sprites[ Math.floor(Math.random() * sprites.length) ],
        level: level,
        hp: 100
    };

    state.entities.push(enemy);
    state.map.tiles[coords[0] + "x" + coords[1]].entity = state.entities.length - 1;

    return state;
}

function generateBoss(state: roguelikeState): roguelikeState {
    let coords: number[] = getRandomEmptyTile(state);
    let boss: Entity = {
        type: "enemy",
        name: "The Boss",
        location: coords[0] + "x" + coords[1],
        sprite: 54,
        level: 10,
        hp: 100
    };

    state.entities.push(boss);
    state.map.tiles[coords[0] + "x" + coords[1]].entity = state.entities.length - 1;

    return state;
}

function getRandomEmptyTile(state: roguelikeState): number[] {

    let randomX: number, randomY: number;

    do {
        randomX = Math.floor(Math.random() * state.map.width);
        randomY = Math.floor(Math.random() * state.map.height); 
    } while (state.map.tiles[randomX + "x" + randomY].walkable == false || state.map.tiles[randomX + "x" + randomY].entity !== undefined || state.map.tiles[randomX + "x" + randomY].item !== undefined)

    return [randomX, randomY];
} 