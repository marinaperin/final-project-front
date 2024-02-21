import { useEffect, useState } from "react";
import "./events.scss";
import axios from "../../lib/axios";
import { Link, Outlet } from "react-router-dom";
import useQuery from "../../hooks/useQuery";
import Loader from "../Error & Loader/Loader";
import ErrorMsg from "../Error & Loader/ErrorMsg";
import Pagination from "../Pagination/Pagination";
const { VITE_API_URL } = import.meta.env;

export default function () {
  const [data, setData] = useState({});
  const [events, setEvents] = useState();
  const [error, setError] = useState(false);
  const query = useQuery();

  useEffect(() => {
    axios
      .get(`${VITE_API_URL}/events?page=${query ? query : 1}`)
      .then((res) => {
        setEvents(res.data.results);
        setData({ ...res.data });
      })
      .catch((err) => {
        console.error(err);
        setError(true);
      });
  }, [query]);

  return (
    <>
      <main className="main-page">
        {error && <ErrorMsg />}
        {!error && !events && <Loader />}
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
              <Pagination resource="events" pages={data.total_pages} />
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
      <Outlet />
    </>
  );
}
