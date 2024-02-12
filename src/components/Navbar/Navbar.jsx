import { Link } from "react-router-dom";
import { CiMenuKebab } from "react-icons/ci";
import { TfiClose } from "react-icons/tfi";
import MainMenu from "./MainMenu";
import { useState } from "react";
import "./nav.scss";

export default function () {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav>
      <menu className="main-menu">
        <li className="tablet-show">
          <button
            className="hamburger-button"
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          >
            {isOpen ? <TfiClose /> : <CiMenuKebab />}
          </button>
          {isOpen && (
            <menu>
              <MainMenu cssClass="tablet-show" />
            </menu>
          )}
        </li>
        <li>
          {!isOpen && <Link to="/">
            <img
              src="../../public/logo.png"
              alt="Otherworldly"
              className="logo"
            />
          </Link>}
        </li>
        <menu className="tablet-hide">
          <MainMenu cssClass="tablet-hide" />
        </menu>
      </menu>
    </nav>
  );
}
