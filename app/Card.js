import { useState } from "react";
import { Collapse } from "react-bootstrap";

export default function Card({ monster, onAdd, index }) {
  const [open, setOpen] = useState(false);
    return (
      <div id={"monster-"+index} className="col-12 col-lg-6 col-xl-4 col-xxl-3">
        <div className="border my-2 p-2">
          <div className="d-flex align-items-center">
            <strong className="fs-4" onClick={() => setOpen(!open)}>{monster.name}</strong>
            <span className="ms-2">CR {monster.challenge_rating} HP {monster.hit_points}</span>
            <button className="btn btn-outline-primary ms-auto" onClick={onAdd}>add</button>
          </div>
          <Collapse in={open}>
            <div id={`monster-${index}-info`} className="info">
              <hr />
              <div className="row">
                <div className="col text-center">
                  STR
                  <div>{monster.strength}</div>
                </div>
                <div className="col text-center">
                  DEX
                  <div>{monster.dexterity}</div>
                </div>
                <div className="col text-center">
                  CON
                  <div>{monster.constitution}</div>
                </div>
                <div className="col text-center">
                  INT
                  <div>{monster.intelligence}</div>
                </div>
                <div className="col text-center">
                  WIS
                  <div>{monster.wisdom}</div>
                </div>
                <div className="col text-center">
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
          </Collapse>
        </div>
      </div>
    );
  }
  