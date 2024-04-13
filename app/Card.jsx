
export default function Card({ monster, onAdd, index }) {
    return (
      <div className="2xl:w-1/4 xl:w-1/3 md:w-1/2 w-full p-1">
        <div className="border border-secondary rounded">
          <div className="flex align-items-center peer">
            <input id={"monster-"+index} type="radio" name="new monster" value={JSON.stringify(monster)}/>
            <label htmlFor={"monster-"+index} className="text-lg font-bold self-center me-1">{monster.name}</label>
            <p className="self-center shrink-0 ms-auto me-1">CR {monster.challenge_rating} HP {monster.hit_points}</p>
            <button tabIndex="-1" className="text-primary border-primary hover:bg-primary hover:text-light border rounded my-1 me-1">
              <label htmlFor={"monster-"+index} className="flex items-center px-1 size-full">add</label>
            </button>
          </div>
          <div className="hidden peer-has-[input:focus]:block">
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
  