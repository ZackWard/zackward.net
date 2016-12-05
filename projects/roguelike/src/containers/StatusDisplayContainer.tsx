import {connect} from "react-redux";
import {StatusDisplay} from "../components/StatusDisplay";
import {roguelikeState} from "../MapGenerator";
import {useItem} from "../actions"; 

const mapStateToProps = (state: roguelikeState) => {
    let hero = state.entities[state.hero];

    // Check all adjacent cells for enemies. If found, show their stats
    let heroX: number = parseInt(hero.location.split("x")[0]);
    let heroY: number = parseInt(hero.location.split("x")[1]);

    let enemies: any[] = [];
    [[-1, 0], [0, -1], [0, 1], [1, 0]].map((delta) => {
        let dx: number = delta[0];
        let dy: number = delta[1];
        let direction: string = dx == 0 ? (dy == -1 ? "north" : "south") : (dx == -1 ? "west" : "east");
        let address: string = (heroX + dx) + "x" + (heroY + dy);
        if (state.map.tiles[address].entity !== undefined) {
            enemies.push({
                direction: direction, 
                enemy: state.entities[state.map.tiles[address].entity]
            });
        }
    });

    // Get the number of healing items that we have, and also the itemID of one of them.
    // The status display will use that itemID to dispatch UseItem.
    let healingCount: number = 0;
    let healingItemID: number = 0;
    state.entities[state.hero].inventory.forEach((itemIndex) => {
        if (state.items[itemIndex].name == "a bottle of medicine") {
            healingCount++;
            healingItemID = itemIndex;
        }
    });

    return {
        level: hero.level,
        weapon: state.items[hero.weapon].name,
        hp: hero.hp,
        exp: hero.xp,
        enemies: enemies,
        medicines: healingCount,
        medicineID: healingItemID
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        useMedicine: (item: number) => {dispatch(useItem(item));}
    };
};

export const StatusDisplayContainer = connect(mapStateToProps, mapDispatchToProps)(StatusDisplay as any);