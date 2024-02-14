import { Link } from "react-router-dom";
import axios from "../../lib/axios";
import { useEffect, useState } from "react";
const { VITE_API_URL } = import.meta.env;

export default function () {
  const [data, setData] = useState({});
  const [cultures, setCultures] = useState();
  const [error, setError] = useState(false);
  const [n, setN] = useState(1);

  useEffect(() => {
    axios
      .get(`${VITE_API_URL}/cultures?page=${n}`)
      .then((res) => {
        console.log(res);
        setCultures(res.data.results);
        setData({ ...res.data });
      })
      .catch((err) => {
        console.error(err);
        setError(true);
      });
  }, [n]);

  return (
    <main className="main-page">
      {error && "There was an error, try again in a few minutes."}
      {!error && !cultures && (
        <div className="loader-container">
          <img src="../../../public/bat-loader.gif" alt="" className="loader" />
        </div>
      )}
      {!error && cultures && (
        <>
          <header>
            <h1>Cultures</h1>
            <div className="cultures-info">
              <p>Total results: {data.total_results}</p>
              <p>Total pages: {data.total_pages}</p>
            </div>
            <div className="pages-btn">
              <button
                onClick={() => {
                  setN(1);
                }}
              >
                <Link to="/cultures">1</Link>
              </button>
              <button
                onClick={() => {
                  setN(2);
                }}
              >
                <Link to="/cultures?page=2">2</Link>
              </button>
            </div>
          </header>
          <section className="resources-grid">
            {cultures.map((c, i) => {
              return (
                <div key={`${c.name} + ${i}`} className="resource-card">
                  <Link to={`culture/${c._id}`}>
                    <div>
                      <h3>{c.name}</h3>
                      <div className="intro-card">
                        <p>{c.country}</p>
                        <p>Entities: {c.total_creatures}</p>
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
