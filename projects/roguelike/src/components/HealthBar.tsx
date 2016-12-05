import * as React from "react";

interface HealthBarProps {
    hp: number,
    maxhp: number
} 

export const HealthBar = (props: HealthBarProps) => {
    let percentHP: number = (props.hp / props.maxhp) * 100;
    let barType: string = "progress-bar-success";
    barType = percentHP < 75 ? "progress-bar-info" : barType;
    barType = percentHP < 50 ? "progress-bar-warning" : barType;
    barType = percentHP < 25 ? "progress-bar-danger" : barType;
    let style: any = {
        width: percentHP + "%"
    };
    return (
        <div className="progress">
            <div className={"progress-bar " + barType} role="progressbar" aria-valuenow={props.hp} aria-valuemin={0} aria-valuemax={props.maxhp} style={style}>
                HP: {props.hp} 
            </div>
        </div>
    );
};