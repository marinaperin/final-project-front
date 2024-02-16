import axios from "../../lib/axios";
import "./creatures.scss";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useQuery from "../../hooks/useQuery";
const { VITE_API_URL } = import.meta.env;

export default function () {
  const [data, setData] = useState({});
  const [creatures, setCreatures] = useState();
  const [error, setError] = useState(false);
  const query = useQuery();

  useEffect(() => {
    axios
      .get(`${VITE_API_URL}/creatures?page=${query ? query : 1}`)
      .then((res) => {
        setCreatures(res.data.results);
        setData({ ...res.data });
      })
      .catch((err) => {
        console.error(err);
        setError(true);
      });
  }, [query]);

  return (
    <main className="main-page">
      {error && (
        <div className="error-msg">
          There was an error, try again in a few minutes.
        </div>
      )}
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
              <p>
                {data.total_results}{" "}
                {data.total_results === 1 ? "result" : "results"} in{" "}
                {data.total_pages} {data.total_pages === 1 ? "page" : "pages"}
              </p>
            </div>
            <div className="pages-btn">
              <button>
                <Link to="/creatures">1</Link>
              </button>
              <button>
                <Link to="/creatures?page=2">2</Link>
              </button>
              <button>
                <Link to="/creatures?page=3">3</Link>
              </button>
            </div>
          </header>
          <section className="resources-grid">
            {creatures.map((c, i) => {
              return (
                <div key={`${c.name} + ${i}`} className="resource-card">
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
