import { useState, useEffect } from "react";

function calcAbilityMod(num) {
    return (Math.floor((num-10)/2))
}

export default function MyMonster({ monster, onRoll, onDelete }) {

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

    const processHealth = function(e) {
        if(e.key === "Enter") {
            setHp(hp+Number(e.target.value))
            e.target.value = null;
        }
    }

    return (
    <div className="border p-1 m-2">
        {monster ? (
            <div className="row">
                <div className="col">
                    <strong className="fs-2 mx-2">{monster.name}</strong>
                    <button className="btn btn-outline-danger" onClick={onDelete}>Delete</button>
                    <hr />
                    <div>Armor Class {monster.armor_class}</div>
                    <div>Hit Points {hp}
                        <input type="number" className="form-control ms-2" style={{display:"inline",width:"50%"}}
                        onKeyDown={processHealth}></input>
                    </div>
                    <div>Speed {monster.speed.walk}
                        {monster.speed.burrow ? <>, burrow {monster.speed.burrow}</> : <></>}
                        {monster.speed.climb ? <>, climb {monster.speed.climb}</> : <></>}
                        {monster.speed.fly ? <>, fly {monster.speed.fly}</> : <></>}
                        {monster.speed.hover ? <>, hover {monster.speed.hover}</> : <></>}
                        {monster.speed.swim ? <>, swim {monster.speed.swim}</> : <></>}
                    </div>
                    <hr />
                    {/* Abilities */}
                    <div className="row">
                        <div className="col text-center" onClick={() => onRoll("STR", `1d20+${modifiers.strength}`)}>
                            <div>STR</div>
                            <div>{monster.strength} ({modifiers.strength})</div>
                        </div>
                        <div className="col text-center" onClick={() => onRoll("DEX", `1d20+${modifiers.dexterity}`)}>
                            <div>DEX</div>
                            <div>{monster.dexterity} ({modifiers.dexterity})</div>
                        </div>
                        <div className="col text-center" onClick={() => onRoll("CON", `1d20+${modifiers.constitution}`)}>
                            <div>CON</div>
                            <div>{monster.constitution} ({modifiers.constitution})</div>
                        </div>
                        <div className="col text-center" onClick={() => onRoll("INT", `1d20+${modifiers.intelligence}`)}>
                            <div>INT</div>
                            <div>{monster.intelligence} ({modifiers.intelligence})</div>
                        </div>
                        <div className="col text-center" onClick={() => onRoll("WIS", `1d20+${modifiers.wisdom}`)}>
                            <div>WIS</div>
                            <div>{monster.wisdom} ({modifiers.wisdom})</div>
                        </div>
                        <div className="col text-center" onClick={() => onRoll("CHA", `1d20+${modifiers.charisma}`)}>
                            <div>CHA</div>
                            <div>{monster.charisma} ({modifiers.charisma})</div>
                        </div>
                    </div>
                    <hr />
                    <div>Skills: {Object.keys(monster.skills).map((key, index) => (
                        <span key={index}>{key} +{monster.skills[key]} </span>
                    ))}</div>
                    <div>Senses: {monster.senses}</div>
                </div>
                <div className="col">
                    {monster.special_abilities ? monster.special_abilities.map((sa, index) => (
                    <div key={index} onClick={() => {if(sa.damage_dice){onRoll(sa.name,`${sa.damage_dice}+${sa.damage_bonus ? sa.damage_bonus : 0}`)}}}>
                        <span style={{fontWeight:"bold"}}>{sa.name}. </span>{sa.desc}</div>
                    )) : null}
                    <hr />
                    <h5>Actions</h5>
                    {monster.actions.map((action, index) => (
                        <div key={index} onClick={() => {if(action.damage_dice){onRoll(action.name,`${action.damage_dice}+${action.damage_bonus ? action.damage_bonus : 0}`)}}}>
                            <span style={{fontWeight:"bold"}}>{action.name}. </span>{action.desc}
                        </div>
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