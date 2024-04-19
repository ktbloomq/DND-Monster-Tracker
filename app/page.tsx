"use client"
import { useState, useEffect } from "react";
import LogEntry from "./logEntry"
import Card from "./Card";
import MyMonster from "./MyMonster";
import monsters from "./Monsters.json";
import LogDisplay from "./LogDisplay";
import HomebrewMonsters from "./HomebrewMonsters.json";

export default function Monsters() {
    const [filteredMonsters, setFilteredMonsters] = useState<any>([]);
    const [myMonsters, setMyMonsters] = useState<any>([]);
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
        let min = Number(CRfilter[0]);
        let max = Number(CRfilter[2]);
        setFilteredMonsters(monsters.results.concat(HomebrewMonsters).filter((m) => (m.slug.includes(search) && m.cr>=min &&m.cr<=max)));
    }, [search, monsters, CRfilter]);

    return (
        <div className="m-3">
            {/* Dice Log */}
            { diceLog.length>0 ?
                <div className='fixed bottom-2 right-2'>
                    <div style={{display:showLog}}>
                        {diceLog.map((msg: LogEntry, index) => (
                            <LogDisplay logEntry={msg} onClose={() => setDiceLog(diceLog.filter((item, i) => i !== index))}/>
                        ))}
                    </div>
                    <button className="bg-body p-2 rounded float-end" onClick={toggleLog}>X</button>
                </div> : <></>}
            <h1>Straight Roll</h1>
            <input id='straight-roll' type="text" className="w-full" onKeyDown={(e) => {
                if(e.key === "Enter"){setDiceLog([...diceLog, new LogEntry("manual", "", (e.target as HTMLInputElement).value)])}}}></input>
            <h1>My Monsters</h1>
            {myMonsters.map((myMonster: any, index: number) => (
                <MyMonster key={index} monster={myMonster} 
                    onRoll={(type: string, dice: string) => setDiceLog([...diceLog, new LogEntry(myMonster.name+index, type, dice)])}
                    onDelete={() => setMyMonsters(myMonsters.filter((item: any, i: number) => i !== index))} />
                //<MyMonster key={index} uri="/api/monsters/giant-boar" />
            ))}
            <h1>All Monsters</h1>
            <form action={addMonster}>
                <div className="mb-3">
                    <label htmlFor='search-monster'>Search Monster</label>
                    <input id='search-monster' type="text" className="w-full block" onChange={(event) => setSearch(event.target.value)} placeholder=""></input>
                </div>
                <div className="mb-3">
                    <label htmlFor='CRfilter'>Challenge Rating (0-2)</label>
                    <input id="CRfilter" type="text" className="w-full block" placeholder="0-2"
                        onChange={(e) => SetCRfilter(e.target.value)}></input>
                    
                </div>

                <div className="flex flex-wrap">
                {filteredMonsters.map((monster: any, index: number) => (
                        <Card key={index} monster={monster} onAdd={addMonster} index={index} />
                ))}
                </div>
            </form>
        </div>
    );

    function addMonster(formData: FormData) {
        console.log("formData",formData);
        const newMonster = JSON.parse(formData.get('new monster') as string);
        console.log("newMonster", newMonster);
        setMyMonsters([...myMonsters, newMonster]);
    }
}