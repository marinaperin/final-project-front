import axios from "../../lib/axios";
import "../../index.scss";
import { useState } from "react";
import ErrorMsg from "../Error & Loader/ErrorMsg";
import { Link } from "react-router-dom";
const { VITE_API_URL } = import.meta.env;

export default function () {
  const [selVal, setSelVal] = useState("");
  const [creatureSelect, setCreatureSelect] = useState("");
  const [inputVal, setInputVal] = useState("");
  const [resource, setResource] = useState();
  const [notFound, setNotFound] = useState();
  const [error, setError] = useState(false);

  const search = () => {
    axios
      .get(
        `${VITE_API_URL}/${selVal}${
          /* Logic to change the request's address but in ternary operators
                            if(selVal === 'creatures'){
                                url = `?${creatureSelect}=${inputVal}`;
                            }else if(selVal === 'cultures'){
                                url = `?name=${inputVal}+culture`;
                            }else{
                                url = `?name=${inputVal}`;
                            }
                        */
          selVal === "creatures"
            ? `?${creatureSelect}=${inputVal}`
            : selVal === "cultures"
            ? `?name=${inputVal}+culture`
            : `?name=${inputVal}`
        }`
      )
      .then((res) => {
        setResource(res.data);
        setInputVal("");
      })
      .catch((err) => {
        console.error(err);
        if (err.response.status === 404) {
          if (selVal === "") {
            setError(true);
          } else {
            setNotFound("No resources found");
          }
        } else {
          setError(true);
        }
      });
  };

  return (
    <>
      <main className="search-page">
        <header>
          <h1>Search</h1>
          <div>
            <select
              value={selVal}
              onChange={(e) => {
                setSelVal(e.target.value);
              }}
              onClick={() => {
                setError(false);
                setNotFound("");
              }}
            >
              <option value="">Choose</option>
              <option value="creatures">Creatures</option>
              <option value="cultures">Cultures</option>
              <option value="events">Events</option>
            </select>
            {selVal === "creatures" && (
              <select
                value={creatureSelect}
                onChange={(e) => {
                  setCreatureSelect(e.target.value);
                }}
              >
                <option value="">Choose</option>
                <option value="name">Name</option>
                <option value="type">Type</option>
              </select>
            )}
            <input
              type="text"
              value={inputVal}
              onChange={(e) => {
                setInputVal(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  search();
                }
                setNotFound();
              }}
              onClick={() => {
                setNotFound();
              }}
            />
            <div className="btn-container">
              <button
                onClick={() => {
                  search();
                }}
              >
                SEARCH
              </button>
            </div>
          </div>
        </header>
        <section className="resources-grid">
          {error && <ErrorMsg />}
          {notFound && <p>{notFound}</p>}
          {!error &&
            resource &&
            resource.map((r, i) => {
              return (
                <div key={`${r.name} + ${i}`} className="resource-card">
                  <Link
                    to={`/${selVal}/${selVal.substring(0, selVal.length - 1)}/${
                      r._id
                    }`}
                  >
                    <div>
                      <h3>{r.name}</h3>
                      <div className="intro-card"></div>
                    </div>
                    <div className="lower-card">
                      <figure>
                        <img src={r.img} alt={r.name} />
                      </figure>
                    </div>
                  </Link>
                </div>
              );
            })}
        </section>
      </main>
    </>
  );
}
