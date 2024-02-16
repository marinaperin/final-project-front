import { useState } from "react";
import "./add.scss";
import AddCreature from "./AddCreature";

export default function () {
  const [selVal, setSelVal] = useState("");

  return (
    <main className="main-page">
      <header>
        <h1>Add</h1>
        <select
          value={selVal}
          onChange={(e) => {
            setSelVal(e.target.value);
          }}
        >
          <option value="">Choose</option>
          <option value="creatures">Creatures</option>
          <option value="cultures">Cultures</option>
          <option value="events">Events</option>
        </select>
      </header>
      <section>{selVal === "creatures" && <AddCreature />}</section>
    </main>
  );
}
