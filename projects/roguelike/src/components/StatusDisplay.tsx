import * as React from "react";

interface Enemy {
    name: string,
    level: number,
    hp: number
}

interface EnemyListing {
    enemy: Enemy,
    direction: string
}

interface StatusDisplayProps {
    level: number,
    weapon: string,
    hp: number,
    exp: number,
    enemies?: EnemyListing[],
    medicines: number,
    medicineID: number,
    useMedicine: (item: number) => void
}

export const StatusDisplay = (props: StatusDisplayProps) => {

    let enemies: any = <div></div>

    if (props.enemies !== undefined && props.enemies.length > 0) {
        let enemyList: any[] = [];
        for (let i: number = 0; i < props.enemies.length; i++) {

            let levelDifference: number = props.level - props.enemies[i].enemy.level;
            let levelDesc: string = "";
            if (levelDifference == 0) {
                levelDesc = " is about as strong as you are";
            } else if (levelDifference < 0 && levelDifference > -3) {
                levelDesc = " is slightly stronger than you are";
            } else if (levelDifference <= -3 && levelDifference > -6) {
                levelDesc = " is much stronger than you are";
            } else if (levelDifference <= -6) {
                levelDesc = " would smash you like an insect";
            } else if (levelDifference > 0 && levelDifference < 3) {
                levelDesc = " is slightly weaker than you are";
            } else if (levelDifference >= 3 && levelDifference < 6) {
                levelDesc = " is much weaker than you are";
            } else if (levelDifference >= 6) {
                levelDesc = " is an insect compared to you";
            }

            enemyList.push(<p key={i}>To your {props.enemies[i].direction}, {props.enemies[i].enemy.name + levelDesc}, and has {props.enemies[i].enemy.hp} health.</p>);
        }
        enemies = enemyList;
    }

    let medicine: any = <div></div>;
    if (props.medicines > 0) {
        medicine = <p>You're carrying {props.medicines} bottles of medicine. <a href="#" onClick={() => {props.useMedicine(props.medicineID)}}>(use medicine)</a></p> 
    }

    return (
        <div className="text-center">
            <p>You are level {props.level}. ({props.exp} / {props.level * 30} exp to next level)</p>
            <p>You have {props.hp} out of 100 health.</p>
            <p>You're using {props.weapon}.</p>
            {medicine}
            {enemies}
        </div>
    );
};