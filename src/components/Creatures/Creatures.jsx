import axios from "../../lib/axios";
import "./creatures.scss";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const { VITE_API_URL } = import.meta.env;

export default function () {
  const [data, setData] = useState({});
  const [creatures, setCreatures] = useState();
  const [error, setError] = useState(false);
  const [n, setN] = useState(1);

  useEffect(() => {
    axios
      .get(`${VITE_API_URL}/creatures?page=${n}`)
      .then((res) => {
        console.log(res);
        setCreatures(res.data.results);
        setData({ ...res.data });
      })
      .catch((err) => {
        console.error(err);
        setError(true);
      });
  }, [n]);

  return (
    <main className="creatures-page">
      {error && "There was an error, try again in a few minutes."}
      {!error && !creatures && (
        <div className="loader-container">
          <img src="../../../public/bat-loader.gif" alt="" className="loader" />
        </div>
      )}
      {!error && creatures && (
        <>
          <header>
            <img
              src="../public/skeleton.png"
              alt=""
              className="skeleton tablet-hide"
            />
            <h1>Creatures | Entities | Deities</h1>
            <div className="creatures-info">
              <p>Total results: {data.total_results}</p>
              <p>Total pages: {data.total_pages}</p>
            </div>
            <div className="pages-btn">
              <button
                onClick={() => {
                  setN(1);
                }}
              >
                1
              </button>
              <button
                onClick={() => {
                  setN(2);
                }}
              >
                2
              </button>
              <button
                onClick={() => {
                  setN(3);
                }}
              >
                3
              </button>
            </div>
          </header>
          <section className="creatures-grid">
            {creatures.map((c, i) => {
              return (
                <div key={`${c.name} + ${i}`} className="creature-card">
                  <Link to={`creature/${c._id}`}>
                    <div>
                      <h3>{c.name}</h3>
                      <div className="intro-card">
                        <p>{c.type[0]}</p>
                        <p>{c.culture.country}</p>
                      </div>
                    </div>
                    <div className="lower-card">
                      <figure>
                        <img src={c.img} alt={c.name} />
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
