import axios from "../../lib/axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import "./cultures.scss";
import { Link } from "react-router-dom";
const { VITE_API_URL } = import.meta.env;

export default function () {
  const { id } = useParams();
  const [culture, setCulture] = useState();
  const [error, setError] = useState(false);

  useEffect(() => {
    axios
      .get(`${VITE_API_URL}/cultures/${id}`)
      .then((res) => {
        setCulture({ ...res.data });
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
        setError(true);
      });
  }, []);

  return (
    <>
      <main className="single-resource">
        {error && "There was an error, try again in a few minutes."}
        {!error && !culture && (
          <div className="loader-container">
            <img
              src="../../../public/bat-loader.gif"
              alt=""
              className="loader"
            />
          </div>
        )}
        {!error && culture && (
          <>
            <h1>{culture.name}</h1>
            <section className="main-single-page">
              <figure>
                <img src={culture.img} alt="" />
              </figure>
              <div>
                <ul>
                  <li>
                    <strong>Country: </strong>
                    {culture.country}
                  </li>
                  <li>
                    <strong>Continent: </strong>
                    {culture.continent}
                  </li>
                  <li>
                    <strong>Creatures: </strong>
                    <ul className="creatures-ul">
                      {culture.creatures.map((c) => {
                        return <li key={c._id}><Link to={`/creatures/creature/${c._id}`} className='link'>{c.name}</Link></li>;
                      })}
                    </ul>
                  </li>
                 {culture.events.length > 0 && <li>
                    <strong>Events/Rituals: </strong>
                    <ul className="creatures-ul">
                      {culture.events.map((c) => {
                        return <li key={c._id}><Link to={`/cultures/events/event/${c._id}`} className='link'>{c.name}</Link></li>;
                      })}
                    </ul>
                  </li>}
                  <li>
                    <strong>Religions: </strong>
                    <ul className="nested-ul">
                      {culture.religions.map((r) => {
                        return <li key={r}>{r}</li>;
                      })}
                    </ul>
                  </li>
                  <li>
                    <strong>Languages: </strong>
                    <ul className="nested-ul">
                      {culture.languages.map((l) => {
                        return <li key={l}>{l}</li>;
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
