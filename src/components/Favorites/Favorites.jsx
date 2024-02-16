import { useEffect, useState } from "react";
import { useUser } from "../../context/UserContext";
import axios from "../../lib/axios";
import { Link } from "react-router-dom";
const { VITE_API_URL } = import.meta.env;

export default function () {
  const { user } = useUser();
  const [favorites, setFavorites] = useState();
  const [error, setError] = useState(false);

  useEffect(() => {
    if (user.favorites.length > 0) {
      axios
        .get(`${VITE_API_URL}/user/${user._id}`)
        .then((res) => {
          setFavorites(res.data);
        })
        .catch((err) => {
          console.error(err);
          setError(true);
        });
    }
  }, []);

  return (
    <main className="main-page">
      <h1>Favorites</h1>
      {error && (
        <div className="error-msg">
          There was an error, try again in a few minutes.
        </div>
      )}
      {!error && !favorites && (
        <div className="loader-container">
          <img src="../../../bat-loader.gif" alt="" className="loader" />
        </div>
      )}
      {!error && favorites === undefined && (
        <div>No favorites yet</div>
      )}
      {!error && favorites && favorites.length < 0 && (
        <div>No favorites yet</div>
      )}
      <section className="resources-grid">
        {!error &&
          favorites &&
          favorites.length > 0 &&
          favorites.map((f, i) => {
            return (
              <div key={f._id + i} className="resource-card">
                <Link to={`/creatures/creature/${f._id}`}>
                  <h3 className="favorite-name">{f.name}</h3>
                  <figure className="lower-card">
                    <img src={f.img} alt={f.name} />
                  </figure>
                </Link>
              </div>
            );
          })}
      </section>
    </main>
  );
}
