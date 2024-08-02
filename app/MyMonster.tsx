import React, { useState, useEffect } from "react";
import Monster from "./types/Monster";

function calcAbilityMod(num: number) {
    return (Math.floor((num-10)/2))
}

interface MyMonsterProps {
    monster: Monster,
    onRoll:(type: string, dice: string) => void,
    onDelete:() => void
}

export default function MyMonster({ monster, onRoll, onDelete }:MyMonsterProps) {

    // const [monster, setMonster] = useState();
    const [hp, setHp] = useState(0);
    const modifiers = {
        strength: calcAbilityMod(monster.strength),
        dexterity: calcAbilityMod(monster.dexterity),
        constitution: calcAbilityMod(monster.constitution),
        intelligence: calcAbilityMod(monster.intelligence),
        wisdom: calcAbilityMod(monster.wisdom),
        charisma: calcAbilityMod(monster.charisma),
    };

    useEffect(() => {
        setHp(monster.hit_points);
    }, [monster]);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const processHealth = function(e: any) {
        if(e.key === "Enter") {
            setHp(hp+Number(e.target.value))
            e.target.value = null;
        }
    }

    return (
    <div className="border border-secondary rounded p-1 m-2">
        {monster ? (
            <div className="flex flex-wrap">
                <div className="w-full lg:w-1/2">
                    <strong className="text-xl">{monster.name}</strong>
                    <button className="border border-danger rounded text-danger hover:bg-danger hover:text-light ms-1 mb-1 px-0.5" onClick={onDelete}>Delete</button>
                    <hr className="border-secondary" />
                    <div>Armor Class {monster.armor_class}</div>
                    <div>Hit Points {hp}
                        <input type="number" className="ms-2" style={{display:"inline",width:"50%"}}
                        onKeyDown={processHealth}></input>
                    </div>
                    <div>Speed {monster.speed.walk}
                        {monster.speed.burrow ? <>, burrow {monster.speed.burrow}</> : <></>}
                        {monster.speed.climb ? <>, climb {monster.speed.climb}</> : <></>}
                        {monster.speed.fly ? <>, fly {monster.speed.fly}</> : <></>}
                        {monster.speed.hover ? <>, hover {monster.speed.hover}</> : <></>}
                        {monster.speed.swim ? <>, swim {monster.speed.swim}</> : <></>}
                    </div>
                    <hr className="border-secondary" />
                    {/* Abilities */}
                    <div className="flex">
                        <a href="#" className="flex-1 text-center" onClick={() => onRoll("STR", `1d20+${modifiers.strength}`)}>
                            <div>STR</div>
                            <div>{monster.strength} ({modifiers.strength})</div>
                        </a>
                        <a href="#" className="flex-1 text-center" onClick={() => onRoll("DEX", `1d20+${modifiers.dexterity}`)}>
                            <div>DEX</div>
                            <div>{monster.dexterity} ({modifiers.dexterity})</div>
                        </a>
                        <a href="#" className="flex-1 text-center" onClick={() => onRoll("CON", `1d20+${modifiers.constitution}`)}>
                            <div>CON</div>
                            <div>{monster.constitution} ({modifiers.constitution})</div>
                        </a>
                        <a href="#" className="flex-1 text-center" onClick={() => onRoll("INT", `1d20+${modifiers.intelligence}`)}>
                            <div>INT</div>
                            <div>{monster.intelligence} ({modifiers.intelligence})</div>
                        </a>
                        <a href="#" className="flex-1 text-center" onClick={() => onRoll("WIS", `1d20+${modifiers.wisdom}`)}>
                            <div>WIS</div>
                            <div>{monster.wisdom} ({modifiers.wisdom})</div>
                        </a>
                        <a href="#" className="flex-1 text-center" onClick={() => onRoll("CHA", `1d20+${modifiers.charisma}`)}>
                            <div>CHA</div>
                            <div>{monster.charisma} ({modifiers.charisma})</div>
                        </a>
                    </div>
                    <hr className="border-secondary" />
                    <div>Skills: {Object.keys(monster.skills).map((key, index) => (
                        <span key={index}>{key} +{monster.skills[key]} </span>
                    ))}</div>
                    <div>Senses: {monster.senses}</div>
                </div>
                <div className="w-full lg:w-1/2">
                    <hr className="border-secondary lg:hidden" />
                    {monster.special_abilities ? monster.special_abilities.map((sa, index) => (
                    <a className="block" href="#" key={index} onClick={() => {if(sa.damage_dice){onRoll(sa.name,`${sa.damage_dice}+${sa.damage_bonus ? sa.damage_bonus : 0}`)}}}>
                        <span className="font-bold">{sa.name}. </span>{sa.desc}</a>
                    )) : null}
                    <hr className="border-secondary" />
                    <h5 className="text-lg font-bold">Actions</h5>
                    {monster.actions.map((action, index) => (
                        <a href="#" className="block" key={index} onClick={() => {if(action.damage_dice){onRoll(action.name,`${action.damage_dice}+${action.damage_bonus ? action.damage_bonus : 0}`)}}}>
                            <span className="font-bold">{action.name}. </span>{action.desc}
                        </a>
                    ))}
                </div>
            </div>
            /* <button className="btn btn-outline-primary" onClick={onAdd}>add</button> */
        ) : (
            <p>Loading...</p>
        )}
    </div>
    );
}