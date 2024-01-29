export default function Card({ monster, onAdd }) {
    return (
      <div className="col-12 col-md-6 col-lg-4 col-xl-3">
        <div className="border my-2 p-2 d-flex align-items-center">
          <strong className="fs-4">{monster.name}</strong>
          <span className="ms-2">CR {monster.challenge_rating} HP {monster.hit_points}</span>
          <button className="btn btn-outline-primary ms-auto" onClick={onAdd}>add</button>
        </div>
      </div>
    );
  }
  