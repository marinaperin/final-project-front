import axios from "../../lib/axios";
import "./events.scss";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
const { VITE_API_URL } = import.meta.env;

export default function () {
  const { id } = useParams();
  const [event, setEvent] = useState();
  const [error, setError] = useState(false);

  useEffect(() => {
    axios
      .get(`${VITE_API_URL}/events/${id}`)
      .then((res) => {
        setEvent({ ...res.data });
      })
      .catch((err) => {
        console.error(err);
        setError(true);
      });
  }, []);

  return (
    <>
      <main className="single-resource">
        {error && <div className="error-msg">There was an error, try again in a few minutes.</div>}
        {!error && !event && (
          <div className="loader-container">
            <img
              src="../../../public/bat-loader.gif"
              alt=""
              className="loader"
            />
          </div>
        )}
        {!error && event && (
          <>
            <h1>{event.name}</h1>
            <section className="main-single-page">
              <figure>
                <img src={event.img} alt="" />
              </figure>
              <div>
                <ul>
                  <li>
                    <strong>Culture: </strong>
                    <Link
                      to={`/cultures/culture/${event.culture._id}`}
                      className="link"
                    >
                      {event.culture.name} ({event.culture.country})
                    </Link>
                  </li>
                  <li>
                    <strong>Type: </strong>
                    {event.type}
                  </li>
                  <li>
                    <strong>Description: </strong>
                    {event.description}
                  </li>
                  <li>
                    <strong>First Mention: </strong>
                    {event.first_mention}
                  </li>
                  <li>
                    <strong>
                      {event.date.length === 1 ? "Date" : "Dates"}:{" "}
                    </strong>
                    <ul className="dates-ul">
                      {event.date.map((d) => {
                        return <li key={d}>{d}</li>;
                      })}
                    </ul>
                  </li>
                  <li>
                    <strong>Creatures: </strong>
                    <ul className="creatures-ul">
                      {event.creatures.map((c) => {
                        return <li key={c._id}><Link to={`/creatures/creature/${c._id}`} className="link">{c.name}</Link></li>;
                      })}
                    </ul>
                  </li>
                </ul>
              </div>
            </section>
          </>
        )}
      </main>
    </>
  );
}
