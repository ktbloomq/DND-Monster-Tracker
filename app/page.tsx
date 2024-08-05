"use client"
import React, { useState, useEffect } from "react";
import LogEntry from "./logEntry"
import Card from "./Card";
import MyMonster from "./MyMonster";
import monsters from "./Monsters.json";
import Monster from "./types/Monster"
import LogDisplay from "./LogDisplay";
import HomebrewMonsters from "./HomebrewMonsters.json";

export default function Monsters() {
    const [filteredMonsters, setFilteredMonsters] = useState<Monster[]>([]);
    const [myMonsters, setMyMonsters] = useState<Monster[]>([]);
    const [diceLog, setDiceLog] = useState<LogEntry[]>([]);
    const [showLog, setShowLog] = useState("inherit");
    const [search, setSearch] = useState("");
    const [CRfilter, SetCRfilter] = useState("0-2");

    const toggleLog = function() {
        if(showLog === "inherit") {
            setShowLog("none")
        } else {
            setShowLog("inherit");
        }
    }

    useEffect(() => {
        const min = Number(CRfilter[0]);
        const max = Number(CRfilter[2]);
        setFilteredMonsters(monsters.results.concat(HomebrewMonsters).filter((m) => (m.slug.includes(search) && m.cr>=min &&m.cr<=max)));
    }, [search, CRfilter]);

    useEffect(() => {
        if ('serviceWorker' in navigator) {
          navigator.serviceWorker
            .register('/service-worker.js')
            .then((registration) => console.log('scope is: ', registration.scope));
        }
      }, []);

    return (
        <div className="m-3">
            {/* Dice Log */}
            { diceLog.length>0 ?
                <div className='fixed bottom-2 right-2'>
                    <div style={{display:showLog}}>
                        {diceLog.map((msg: LogEntry, index) => (
                            <LogDisplay key={index} logEntry={msg} onClose={() => setDiceLog(diceLog.filter((item, i) => i !== index))}/>
                        ))}
                    </div>
                    <button className="bg-body p-2 border rounded float-end" onClick={toggleLog}>X</button>
                </div> : null}
            <h1>Manual Roll</h1>
            <form action={manualRoll} className="flex">
                <input id="manual-roll" name="manual-roll" type="text" className="flex-grow pl-1" placeholder="1d20+1" />
                <button className="text-primary border-primary hover:bg-primary hover:text-light border rounded px-1 m-1">Roll</button>
            </form>
            <h1>My Monsters</h1>
            {myMonsters.map((myMonster: Monster, index: number) => (
                <MyMonster key={index} monster={myMonster} 
                    onRoll={(type: string, dice: string) => setDiceLog([...diceLog, new LogEntry(myMonster.name+index, type, dice)])}
                    onDelete={() => setMyMonsters(myMonsters.filter((item: Monster, i: number) => i !== index))} />
                //<MyMonster key={index} uri="/api/monsters/giant-boar" />
            ))}
            <h1>All Monsters</h1>
            <form action={addMonster}>
                <div className="mb-3">
                    <label htmlFor='search-monster'>Search Monster</label>
                    <input id='search-monster' type="text" className="w-full block  pl-1" onChange={(event) => setSearch(event.target.value)} placeholder="" />
                </div>
                <div className="mb-3">
                    <label htmlFor='CRfilter'>Challenge Rating (0-2)</label>
                    <input id="CRfilter" type="text" className="w-full block  pl-1" placeholder="0-2"
                        onChange={(e) => SetCRfilter(e.target.value)} />
                    
                </div>

                <div className="flex flex-wrap">
                {filteredMonsters.map((monster: Monster, index: number) => (
                        <Card key={monster.slug} monster={monster} onAdd={addMonster} index={index} />
                ))}
                </div>
            </form>
        </div>
    );

    function manualRoll(formData: FormData) {
        const roll = formData.get('manual-roll') as string;
        setDiceLog([...diceLog, new LogEntry("manual", "", roll)])
    }

    function addMonster(formData: FormData) {
        const newMonster = JSON.parse(formData.get('new monster') as string);
        setMyMonsters([...myMonsters, newMonster]);
    }
}