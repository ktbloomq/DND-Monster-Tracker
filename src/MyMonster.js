import { useState, useEffect } from "react";

export function roll(string = "1d20") {
    // parse string
    console.log("string", string)
    let dPos = 0;
    let modPos = string.length;
    let count = 0;
    let diceType = 0;
    let mod = 0;
    for(let i=0; i<string.length; i++) {
        // console.log(string[i]);
        if(string[i]==='d') {
            dPos = i;
        } else if(string[i]==='+' || string[i]==='-') {
            modPos = i;
        }
    }
    count = Number(string.slice(0,dPos));
    diceType = Number(string.slice(dPos+1,modPos));
    mod = Number(string.slice(modPos));
    // console.log("count",count);
    // console.log("d", diceType);
    // console.log("mod", mod);

    // roll
    let result = 0;
    let roll = 0
    for(let i=0; i<count; i++) {
        roll = Math.floor(Math.random() * diceType) + 1;
        // console.log("roll", i, roll);
        result += roll;
    }
    result += mod;
    console.log("result", result);
    return result;
}

function rollAbility(ability) {
    let mod = calcAbilityMod(ability);
    let roll = Math.floor(Math.random() * 20) + 1;
    console.log("result", (roll+mod));
    return roll+mod;
}

function calcAbilityMod(num) {
    return (Math.floor((num-10)/2))
}

export default function MyMonster({ monster, onRoll, onDelete }) {

    // const [monster, setMonster] = useState();
    const [hp, setHp] = useState(0);

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
                    <div>Armor Class {monster.armor_class[0].value}</div>
                    <div>Hit Points {hp}
                        <input type="number" className="form-control ms-2" style={{display:"inline",width:"50%"}}
                        onKeyDown={processHealth}></input>
                    </div>
                    <div>Speed {monster.speed.walk}</div>
                    <hr />
                    <div className="row">
                        <div className="col text-center" onClick={() => onRoll("STR", "1d20+mod", rollAbility(monster.strength))}>
                            <div>STR</div>
                            <div>{monster.strength} ({calcAbilityMod(monster.strength)})</div>
                        </div>
                        <div className="col text-center" onClick={() => onRoll("DEX", "1d20+mod", rollAbility(monster.dexterity))}>
                            <div>DEX</div>
                            <div>{monster.dexterity} ({calcAbilityMod(monster.dexterity)})</div>
                        </div>
                        <div className="col text-center" onClick={() => onRoll("CON", "1d20+mod", rollAbility(monster.constitution))}>
                            <div>CON</div>
                            <div>{monster.constitution} ({calcAbilityMod(monster.constitution)})</div>
                        </div>
                        <div className="col text-center" onClick={() => onRoll("INT", "1d20+mod", rollAbility(monster.intelligence))}>
                            <div>INT</div>
                            <div>{monster.intelligence} ({calcAbilityMod(monster.intelligence)})</div>
                        </div>
                        <div className="col text-center" onClick={() => onRoll("WIS", "1d20+mod", rollAbility(monster.wisdom))}>
                            <div>WIS</div>
                            <div>{monster.wisdom} ({calcAbilityMod(monster.wisdom)})</div>
                        </div>
                        <div className="col text-center" onClick={() => onRoll("CHA", "1d20+mod", rollAbility(monster.charisma))}>
                            <div>CHA</div>
                            <div>{monster.charisma} ({calcAbilityMod(monster.charisma)})</div>
                        </div>
                    </div>
                    <hr />

                </div>
                <div className="col">
                    {monster.special_abilities ? monster.special_abilities.map((sa, index) => (
                    <div key={index}><span style={{fontWeight:"bold"}}>{sa.name}{sa.usage && <> ({sa.usage.type})</>}. </span>{sa.desc}</div>
                    )) : null}
                    <hr />
                    <h5>Actions</h5>
                    {monster.actions.map((action, index) => (
                        <div key={index} onClick={() => {if(action.damage){onRoll(action.name,action.damage[0].damage_dice,roll(action.damage[0].damage_dice))}}}>
                            <span style={{fontWeight:"bold"}}>{action.name}{action.usage && <> ({action.usage.type})</>}. </span>{action.desc}
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