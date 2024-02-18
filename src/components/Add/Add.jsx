import { useState } from "react";
import "./add.scss";
import AddCreature from "./AddCreature";
import AddCulture from "./AddCulture";
import AddEvent from "./AddEvent";

export default function () {
  const [selVal, setSelVal] = useState("");

  return (
    <main >
      <header className="main-page">
        <h1>Add</h1>
        <select
          value={selVal}
          onChange={(e) => {
            setSelVal(e.target.value);
          }}
          className="add-select"
        >
          <option value="">Choose</option>
          <option value="creatures">Creatures</option>
          <option value="cultures">Cultures</option>
          <option value="events">Events</option>
        </select>
      </header>
      <section>
        {selVal === "creatures" && <AddCreature />}
        {selVal === "cultures" && <AddCulture />}
        {selVal === "events" && <AddEvent />}
      </section>
    </main>
  );
}
