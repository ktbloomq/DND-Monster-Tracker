import { useState, useEffect } from "react";
import { Toast } from "react-bootstrap";
import Roll from "./log"
import Card from "./Card";
import MyMonster, { roll } from "./MyMonster";
import data from "./Monsters.json";

export default function Monsters() {
    const [filteredMonsters, setFilteredMonsters] = useState([])
    const [myMonsters, setMyMonsters] = useState([]);
    const [diceLog, setDiceLog] = useState([]);
    const [showLog, setShowLog] = useState("inherit");
    const [search, setSearch] = useState("");

    let monsters = data.data.monsters;

    const toggleLog = function() {
        if(showLog === "inherit") {
            setShowLog("none")
        } else {
            setShowLog("inherit");
        }
    }

    useEffect(() => {
        setFilteredMonsters(monsters.filter((item) => item.index.includes(search)));
    }, [search, monsters]);

    return (
        <div  data-bs-theme="dark" className="text-light m-3">
            <div style={{position:"fixed", bottom:"10px", right:"10px"}}>
                <div style={{display:showLog}}>
                    {diceLog.map((msg, index) => (
                        <Toast key={index} onClose={() => setDiceLog(diceLog.filter((item, i) => i !== index))}>
                            <Toast.Header>
                                <div className="me-auto">
                                    {msg.creature}
                                </div>
                            </Toast.Header>
                            <Toast.Body>{msg.type}:{msg.dice}:{msg.result}</Toast.Body>
                        </Toast>
                    ))}
                </div>
                <button className="btn btn-primary float-end" onClick={toggleLog}>X</button>
            </div>
            <h1>Straight Roll</h1>
            <input type="text" className="form-control" onKeyDown={(e) => {
                if(e.key === "Enter"){setDiceLog([...diceLog, new Roll("manual", "", e.target.value, roll(e.target.value))])}}}></input>
            <h1>My Monsters</h1>
            {myMonsters.map((myMonster, index) => (
                <MyMonster key={index} monster={myMonster} 
                    onRoll={(type, dice, result) => setDiceLog([...diceLog, new Roll(myMonster.name+index, type, dice, result)])}
                    onDelete={() => setMyMonsters(myMonsters.filter((item, i) => i !== index))} />
                //<MyMonster key={index} uri="/api/monsters/giant-boar" />
            ))}
            <h1>All Monsters</h1>
            <input type="text" className="form-control" onChange={(event) => setSearch(event.target.value)}></input>
            <div className="row">
            {filteredMonsters.map((monster, index) => (
                <Card key={index} monster={monster} onAdd={() => setMyMonsters([...myMonsters, monster])} />
            ))}
            </div>
        </div>
    );
}