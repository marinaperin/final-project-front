import { useEffect, useState } from "react";
import { useUser } from "../../context/UserContext";
import axios from "../../lib/axios";
import { Link } from "react-router-dom";
import Loader from "../Error & Loader/Loader";
import ErrorMsg from "../Error & Loader/ErrorMsg";
const { VITE_API_URL } = import.meta.env;

export default function () {
  const { user } = useUser();
  const [favorites, setFavorites] = useState();
  const [error, setError] = useState(false);
  const { loading, setLoading } = useUser();

  useEffect(() => {
    if (user.favorites.length > 0) {
      setLoading(true);
      axios
        .get(`${VITE_API_URL}/user/${user._id}`)
        .then((res) => {
          setFavorites(res.data);
        })
        .catch((err) => {
          console.error(err);
          setError(true);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, []);

  return (
    <main className="main-page">
      <h1>Favorites</h1>
      {error && <ErrorMsg />}
      {!error && loading && <Loader />}
      {(!error && favorites && favorites.length < 0) ||
        (favorites && favorites === undefined) && <div>No favorites yet</div>}
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
