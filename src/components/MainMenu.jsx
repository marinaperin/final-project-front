import { NavLink, useNavigate } from "react-router-dom";

export default function (cssClass) {
  const navigate = useNavigate();

  return (
    <>
      <li className={cssClass}>
        <NavLink to="/about">
          About
        </NavLink>
      </li>
      <li className={cssClass}>
        <NavLink to="/creatures">
          Creatures/Entities/Deities
        </NavLink>
      </li>
      <li className={cssClass}>
        <NavLink to="/cultures">
          Cultures
        </NavLink>
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
