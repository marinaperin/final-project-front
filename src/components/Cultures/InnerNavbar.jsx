import { Link } from "react-router-dom";
import "./cultures.scss";

export default function () {
  return (
    <>
      <nav className="inner-navbar">
        <menu className="tablet-hide">
          <li>
            <Link to={`/cultures`}>Cultures</Link>
          </li>
          <li>
            <Link to={`/cultures/events`}>Events</Link>
          </li>
        </menu>
      </nav>
    </>
  );
}
