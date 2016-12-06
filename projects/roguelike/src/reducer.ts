import {MOVE_UP, MOVE_DOWN, MOVE_LEFT, MOVE_RIGHT, USE_ITEM, NEW_GAME} from "./actions";
import {getDefaultState, roguelikeState, Entity} from "./MapGenerator";


function movePlayer(state: roguelikeState, deltax: number, deltay: number): roguelikeState {
    let player = state.entities[state.hero];
    let currentLocation:string[] = player.location.split('x');
    let destX: number = parseInt(currentLocation[0]) + deltax;
    let destY: number = parseInt(currentLocation[1]) + deltay;
    let dest: string = destX + "x" + destY;

    // Bail out if the destination is out of bounds or not walkable
    if (destX < 0 || destX >= state.map.width || destY < 0 || destY >= state.map.height || state.map.tiles[dest].walkable === false) {
        state.status.bumpx = deltax == 0 ? state.status.bumpx : state.status.bumpx + 1;
        state.status.bumpy = deltay == 0 ? state.status.bumpy : state.status.bumpy + 1;
        return checkPlatino(state);
    }

    state.status.bumpx = 0;
    state.status.bumpy = 0;

    // If the destination is currently occupied by another entity, handle that situation and return the new state
    if (state.map.tiles[dest].hasOwnProperty('entity')) {
        return handleEncounter(state, state.map.tiles[dest].entity);
    }

    // If the destination currently has an item in it, we want to pick it up as we move
    if (state.map.tiles[dest].hasOwnProperty('item')) {
        let itemIndex = state.map.tiles[dest].item;
        state.messages.push("You picked up " + state.items[itemIndex].name);
        delete state.items[itemIndex].location;
        state.entities[state.hero].inventory.push(itemIndex);

        // If it was a weapon that is better than our current weapon, auto-equip it
        let currentWeapon: number = state.entities[state.hero].weapon;
        if (state.items[itemIndex].type == "weapon" && state.items[itemIndex].value > state.items[currentWeapon].value) {
            state.messages.push("You begin to use " + state.items[itemIndex].name + " and throw away your old weapon.");
            state.entities[state.hero].inventory = state.entities[state.hero].inventory.filter(item => item !== currentWeapon);
            delete state.items[currentWeapon];
            state.entities[state.hero].weapon = itemIndex;
        } else if (state.items[itemIndex].type == "weapon" && state.items[itemIndex].value <= state.items[currentWeapon].value) {
            state.messages.push(state.items[itemIndex].name + " looks less powerful than what you're currently using. You throw it away.");
            state.entities[state.hero].inventory = state.entities[state.hero].inventory.filter(item => item !== itemIndex);
            delete state.items[itemIndex];
        }
        
        delete state.map.tiles[dest].item;
    }

    // Update player location.
    // First, remove the hero entity from it's current tile
    delete state.map.tiles[player.location].entity; 
    // Then, add the hero entity to it's destination tile
    state.map.tiles[dest].entity = state.hero;
    // Finally, update the location in the entity
    state.entities[state.hero].location = dest;
    return moveCamera(state, deltax, deltay);
}

function checkPlatino(state: roguelikeState): roguelikeState {
    if (state.status.bumpx == 50 && state.status.bumpy == 50) {
        state.messages.push("You seem to be a little lost. The Platino shows up and takes over.");
        state.entities[state.hero].sprite = 4;
    }
    return state;
}

function attemptAttack(attacker: Entity, target: Entity): boolean {
    let roll: number = rollDice(1, 20);
    if (roll == 1) return false;
    if (roll == 20) return true;

    let levelDifference: number = attacker.level - target.level;
    if (roll + levelDifference >= 10 ) return true;

    return false;
}

function rollDice(dice: number, sides: number): number {
    let acc: number = 0;
    for (let i: number = dice; i > 0; i--) {
        acc += Math.ceil(Math.random() * sides);
    }
    return acc;
}

function handleEncounter(state: roguelikeState, targetEntity: number): roguelikeState {

    let hero = state.entities[state.hero];
    let target = state.entities[targetEntity];

    // Player does damage First
    if (attemptAttack(hero, target)) {
        let playerDamage = rollDice(2, (hero.level * 2) + state.items[hero.weapon].value);
        state.messages.push("You attack " + target.name + " for " + playerDamage + " damage!");
        state.entities[targetEntity].hp -= playerDamage;
    } else {
        state.messages.push("You attempt to attack " + target.name + ", but you miss!");
    }
    

    // Check to see if enemy is dead
    if (state.entities[targetEntity].hp < 1) {
        
        // Check to see if we just killed the boss. If so, we won!
        if (target.name == "The Boss") {
            state.status.won = true;
            return state;
        }

        // Award experience to player
        let awardedXp: number = target.level * 10;
        state.messages.push("You defeat " + target.name + "! You're awarded " + awardedXp + " experience.");
        // Check to see if the player has enough xp to advance a level. In rare cases, the player may advance several levels
        while (awardedXp + state.entities[state.hero].xp >= state.entities[state.hero].level * 30) {
            let usedXp: number = (state.entities[state.hero].level * 30) - state.entities[state.hero].xp;
            state.entities[state.hero].level++;
            state.messages.push("You advance to level " + state.entities[state.hero].level + "!");
            state.entities[state.hero].xp = 0;
            awardedXp -= usedXp;
        }
        state.entities[state.hero].xp += awardedXp;

        // Move the player into the cell previously occupied by the enemy, then delete the enemy
        let dest: string = target.location;
        delete state.map.tiles[hero.location].entity;
        state.map.tiles[dest].entity = state.hero;
        state.entities[state.hero].location = dest;
        delete state.entities[targetEntity];
        return state;
    }

    // Enemy does damage next
    if (attemptAttack(target, hero)) {
        let enemyDamage = rollDice(2, target.level * 2);
        state.messages.push(target.name + " attacks you for  " + enemyDamage + " damage!");
        state.entities[state.hero].hp -= enemyDamage;
    } else {
        state.messages.push(target.name + " attempts to attack you, but misses!");
    }
    

    // Check to see if player is dead
    if (state.entities[state.hero].hp < 1) {
        state.status.dead = true;
        state.status.deaths++;
        state.messages = ["You were killed. You decide to try again."];
    }

    return state;
}

function moveCamera(state: roguelikeState, deltax: number, deltay: number): roguelikeState {

    // Figure out where the hero is in relation to the camera
    let heroLocation = state.entities[state.hero].location;
    let heroX = parseInt(heroLocation.split('x')[0]) - state.map.camera.x;
    let heroY = parseInt(heroLocation.split('x')[1]) - state.map.camera.y;

    // If moving the camera would result in it going off of the map, return without moving
    if (! cameraInBounds(state, deltax, deltay)) {
        return state;
    }

    // Handle left move
    if (deltax < 0 && heroX < Math.floor(state.map.camera.width / 2)) {
        state.map.camera.x += deltax;
    }

    // Handle right move
    if (deltax > 0 && heroX > Math.floor(state.map.camera.width / 2)) {
        state.map.camera.x += deltax;
    }

    // Handle upward move
    if (deltay < 0 && heroY < Math.floor(state.map.camera.height / 2)) {
        state.map.camera.y += deltay;
    }

    // Handle downward move
    if (deltay > 0 && heroY > Math.floor(state.map.camera.height / 2)) {
        state.map.camera.y += deltay;
    }

    return state;
}

function cameraInBounds(state: roguelikeState, deltax: number, deltay: number): boolean {
    // Check to make sure that camera X coordinate is in-bounds
    if (state.map.camera.x + deltax < 0 || state.map.camera.x + deltax + state.map.camera.width > state.map.width) {
        return false;
    }
    if (state.map.camera.y + deltay < 0 || state.map.camera.y + deltay + state.map.camera.height > state.map.height) {
        return false;
    }
    return true;
}

function useItem(state: roguelikeState, item: number): roguelikeState {

    if (state.items[item].type == "weapon") {
        state.entities[state.hero].weapon = item;
    }

    if (state.items[item].type == "healing") {
        let healedHP: number = rollDice(3, 20);
        state.entities[state.hero].hp = state.entities[state.hero].hp + healedHP > 100 ? 100 : state.entities[state.hero].hp + healedHP;
        state.messages.push("You apply the medicine, and are healed for " + healedHP + " points.");
        // Remove the item from the players inventory, and from the items list
        state.entities[state.hero].inventory = state.entities[state.hero].inventory.filter(inventoryItem => inventoryItem !== item);
        delete state.items[item];
    }

    return state;
}

function newGame(state: roguelikeState): roguelikeState {
    if (state.status.started && state.status.dead) {
        let deaths: number = state.status.deaths;
        state = getDefaultState();
        state.status.deaths = deaths;
    }

    state.status.started = true;
    return state;
}

// This reducer handles all of our game logic and manages all app state
export function reducer(state = getDefaultState(), action: any) {
    
    // Don't mutate state, get a new object to modify
    let newState: roguelikeState = JSON.parse(JSON.stringify(state));

    switch (action.type) {
        case MOVE_UP:
            newState = movePlayer(newState, 0, -1); 
            break;
        case MOVE_DOWN:
            newState = movePlayer(newState, 0, 1);
            break;
        case MOVE_RIGHT:
            newState = movePlayer(newState, 1, 0);
            break;
        case MOVE_LEFT:
            newState = movePlayer(newState, -1, 0);
            break;
        case USE_ITEM: 
            newState = useItem(newState, action.item);
            break;
        case NEW_GAME:
            newState = newGame(newState);
            break;
    }
    return newState;
}