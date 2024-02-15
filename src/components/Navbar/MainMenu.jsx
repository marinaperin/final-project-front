import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

export default function (cssClass, isOpen) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <>
      <li className={cssClass}>
        <NavLink
          to="/about"
          onClick={() => {
            isOpen(false);
          }}
        >
          About
        </NavLink>
      </li>
      <li className={cssClass}>
        <NavLink
          to="/search"
          onClick={() => {
            isOpen(false);
          }}
        >
          Search
        </NavLink>
      </li>
      <li className={cssClass}>
        <NavLink
          to="/creatures"
          onClick={() => {
            isOpen(false);
          }}
        >
          Creatures/Entities/Deities
        </NavLink>
      </li>
      <li
        className={cssClass}
        onClick={() => {
          setOpen(!open);
        }}
      >
        <NavLink to={"/cultures"}>Cultures</NavLink>
        {open && (
          <ul className="nav-ul tablet-show">
            <li>
              <Link
                to={`/cultures`}
                onClick={() => {
                  isOpen(false);
                }}
              >
                Cultures
              </Link>
            </li>
            <li>
              <Link
                to={`/cultures/events`}
                onClick={() => {
                  isOpen(false);
                }}
              >
                Events
              </Link>
            </li>
          </ul>
        )}
      </li>
      <li className={`nav-buttons ${cssClass}`}>
        <button
          onClick={() => {
            navigate("/sign-up");
          }}
        >
          SIGN UP
        </button>
        <button
          onClick={() => {
            navigate("/log-in");
          }}
        >
          LOG IN
        </button>
      </li>
    </>
  );
}
