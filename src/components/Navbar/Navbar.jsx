import { Link, Outlet } from "react-router-dom";
import { CiMenuKebab } from "react-icons/ci";
import { TfiClose } from "react-icons/tfi";
import MainMenu from "./MainMenu";
import { useState } from "react";
import "./nav.scss";
import { useUser } from "../../context/UserContext";

export default function () {
  const { isOpen, setIsOpen } = useUser();

  return (
    <>
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
                {/* Created extra component to make nav responsive */}
                <MainMenu
                  cssClass="tablet-show"
                  isOpen={(v) => {
                    setIsOpen(v);
                  }}
                />
              </menu>
            )}
          </li>
          <li>
            {!isOpen && (
              <Link to="/">
                <img
                  src="/logo.png"
                  alt="Otherworldly"
                  className="logo"
                />
              </Link>
            )}
          </li>
          <menu className="tablet-hide">
            <MainMenu cssClass="tablet-hide" />
          </menu>
        </menu>
      </nav>
      <Outlet />
    </>
  );
}
