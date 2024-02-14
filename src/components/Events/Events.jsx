import { useEffect, useState } from "react";
import "./events.scss";
import axios from "../../lib/axios";
import { Link } from "react-router-dom";
const { VITE_API_URL } = import.meta.env;

export default function () {
  const [data, setData] = useState({});
  const [events, setEvents] = useState();
  const [error, setError] = useState(false);
  const [n, setN] = useState(1);

  useEffect(() => {
    axios
      .get(`${VITE_API_URL}/events?page=${n}`)
      .then((res) => {
        setEvents(res.data.results);
        setData({ ...res.data });
      })
      .catch((err) => {
        console.error(err);
        setError(true);
      });
  }, []);

  return (
    <main className="main-page">
      {error && <div className="error-msg">There was an error, try again in a few minutes.</div>}
      {!error && !events && (
        <div className="loader-container">
          <img src="../../../public/bat-loader.gif" alt="" className="loader" />
        </div>
      )}
      {!error && events && (
        <>
          <header>
            <h1>Events and Rituals</h1>
            <div className="events-info">
              <p>
                {data.total_results}{" "}
                {data.total_results === 1 ? "result" : "results"} in{" "}
                {data.total_pages} {data.total_pages === 1 ? "page" : "pages"}
              </p>
            </div>
            <div className="pages-btn">
              <button
                onClick={() => {
                  setN(1);
                }}
              >
                <Link to="/events">1</Link>
              </button>
            </div>
          </header>
          <section className="resources-grid">
            {events.map((e, i) => {
              return (
                <div key={`${e.name} + ${i}`} className="resource-card">
                  <Link to={`event/${e._id}`}>
                    <div>
                      <h3>{e.name}</h3>
                      <div className="intro-card">
                        <p>{e.type}</p>
                        <p>{e.culture.country}</p>
                      </div>
                    </div>
                    <div className="lower-card">
                      <figure>
                        <img src={e.img} alt={e.name} />
                      </figure>
                    </div>
                  </Link>
                </div>
              );
            })}
          </section>
        </>
      )}
    </main>
  );
}
