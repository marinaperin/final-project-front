import { Link, Outlet } from "react-router-dom";
import "./cultures.scss";
import { useUser } from "../../context/UserContext";

export default function () {
  const { isOpen, setIsOpen } = useUser();

  return (
    <>
      <nav className="inner-navbar">
        <menu className="tablet-hide">
          <li>
            <Link to={`/cultures`} onClick={() => setIsOpen(false)}>
              Cultures
            </Link>
          </li>
          <li>
            <Link to={`/cultures/events`} onClick={() => setIsOpen(false)}>
              Events/Rituals
            </Link>
          </li>
        </menu>
      </nav>
      <Outlet />
    </>
  );
}
