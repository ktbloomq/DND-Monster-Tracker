import { useState } from "react";

export default function Card({ monster, onAdd, index }) {
  const [open, setOpen] = useState(false);
    return (
      <div className="w-1/2 p-1 group">
        <div id={"monster-"+index} className="border-solid border-2">
          <div className="flex align-items-center peer">
            <p  className="text-lg font-bold" onClick={() => setOpen(!open)}>{monster.name}</p>
            <p className="">CR {monster.challenge_rating} HP {monster.hit_points}</p>
            <button className="btn btn-outline-primary ms-auto" onClick={onAdd}>add</button>
          </div>
          <div className="hidden group-hover:block peer-has-[:focus]:block" in={open}>
            <div id={`monster-${index}-info`} className="info">
              <hr />
              <div className="flex flex-wrap">
                <div className="flex-1 text-center">
                  STR
                  <div>{monster.strength}</div>
                </div>
                <div className="flex-1 text-center">
                  DEX
                  <div>{monster.dexterity}</div>
                </div>
                <div className="flex-1 text-center">
                  CON
                  <div>{monster.constitution}</div>
                </div>
                <div className="flex-1 text-center">
                  INT
                  <div>{monster.intelligence}</div>
                </div>
                <div className="flex-1 text-center">
                  WIS
                  <div>{monster.wisdom}</div>
                </div>
                <div className="flex-1 text-center">
                  CHA
                  <div>{monster.charisma}</div>
                </div>
              </div>
              <div>AC {monster.armor_class}</div>
              {monster.actions ? monster.actions.map((action, index) => (
                <div key={index}>
                  <span>{action.name}:
                  {action.damage_dice ? `${action.damage_dice}+${action.damage_bonus}` : ""}</span>
                </div>
              )) : <></>}
            </div>
          </div>
        </div>
      </div>
    );
  }
  