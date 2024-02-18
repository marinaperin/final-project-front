import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import { IoIosArrowDown } from "react-icons/io";

export default function ({ cssClass, isOpen }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { user, logOut, loading } = useUser();

  return (
    <>
      <li className={cssClass}>
        <NavLink
          to="/about"
          onClick={() => {
            if (cssClass === "tablet-hide") {
              return;
            } else {
              isOpen(false);
            }
          }}
        >
          About
        </NavLink>
      </li>
      <li className={cssClass}>
        <NavLink
          to="/search"
          onClick={() => {
            if (cssClass === "tablet-hide") {
              return;
            } else {
              isOpen(false);
            }
          }}
        >
          Search
        </NavLink>
      </li>
      <li className={cssClass}>
        <NavLink
          to="/creatures"
          onClick={() => {
            if (cssClass === "tablet-hide") {
              return;
            } else {
              isOpen(false);
            }
          }}
        >
          Creatures/Entities/Deities
        </NavLink>
      </li>
      <li
        className={`cssClass cultures-navlink`}
        onClick={() => {
          setOpen(!open);
        }}
      >
        <NavLink to="/cultures">
          Cultures <IoIosArrowDown />
        </NavLink>
        {open && (
          <ul className="nav-ul tablet-show">
            <li>
              <Link
                to={`/cultures`}
                onClick={() => {
                  if (cssClass === "tablet-hide") {
                    return;
                  } else {
                    isOpen(false);
                  }
                }}
              >
                Cultures
              </Link>
            </li>
            <li>
              <Link
                to={`/cultures/events`}
                onClick={() => {
                  if (cssClass === "tablet-hide") {
                    return;
                  } else {
                    isOpen(false);
                  }
                }}
              >
                Events
              </Link>
            </li>
          </ul>
        )}
      </li>
      {user && user.user_type === "user" && (
        <>
          <li>
            <Link
              to={`/favorites`}
              onClick={() => {
                if (cssClass === "tablet-hide") {
                  return;
                } else {
                  isOpen(false);
                }
              }}
            >
              Favorites
            </Link>
          </li>
        </>
      )}
      {user && user.user_type === "admin" && (
        <>
          <li>
            <Link
              to={`/add`}
              onClick={() => {
                if (cssClass === "tablet-hide") {
                  return;
                } else {
                  isOpen(false);
                }
              }}
            >
              Add
            </Link>
          </li>
        </>
      )}
      {user && (
        <li>
          <button
            onClick={() => {
              logOut();
              navigate("/");
              if (cssClass === "tablet-hide") {
                return;
              } else {
                isOpen(false);
              }
            }}
            disabled={loading ? true : false}
          >
            LOG OUT
          </button>
        </li>
      )}
      {!user && (
        <li className={`nav-buttons ${cssClass}`}>
          <button
            onClick={() => {
              navigate("/sign-up");
              if (cssClass === "tablet-hide") {
                return;
              } else {
                isOpen(false);
              }
            }}
          >
            SIGN UP
          </button>
          <button
            onClick={() => {
              navigate("/log-in");
              if (cssClass === "tablet-hide") {
                return;
              } else {
                isOpen(false);
              }
            }}
          >
            LOG IN
          </button>
        </li>
      )}
    </>
  );
}
