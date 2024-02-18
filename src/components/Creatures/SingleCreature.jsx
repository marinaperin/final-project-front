import axios from "../../lib/axios";
import "./creatures.scss";
import { useEffect, useState } from "react";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import AdminIcons from "../Admin edit-delete/AdminIcons";
import Loader from "../Error & Loader/Loader";
import ErrorMsg from "../Error & Loader/ErrorMsg";
const { VITE_API_URL } = import.meta.env;

export default function () {
  const { id } = useParams();
  const [creature, setCreature] = useState();
  const [error, setError] = useState(false);
  const [patchError, setPatchError] = useState(null);
  const { user, setUser, loading, setLoading } = useUser();

  const patchFavorites = (action, msg) => {
    setLoading(true);
    axios
      .patch(`${VITE_API_URL}/user/favorites`, {
        id: id,
        action: action,
        userId: user._id,
      })
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.error(err);
        setPatchError(msg);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    axios
      .get(`${VITE_API_URL}/creatures/${id}`)
      .then((res) => {
        setCreature({ ...res.data });
      })
      .catch((err) => {
        console.error(err);
        setError(true);
      });
  }, [user]);

  return (
    <>
      <main className="single-resource">
        {error && (
          <ErrorMsg/>
        )}
        {!error && !creature && (
          <Loader/>
        )}
        {!error && creature && (
          <>
            {" "}
            {/* Logic that allows user to remove and add creatures to favorites */}
            {user && !loading && user.user_type === "user" && (
              <div className="icon-container">
                <p className="favorite-icon">
                  {!user.favorites.includes(id) ? (
                    <FaRegStar
                      onClick={() => {
                        patchFavorites("add", "Issue adding to favorites");
                      }}
                      className="icon"
                      title="Add to Favorites"
                    />
                  ) : (
                    <FaStar
                      onClick={() => {
                        patchFavorites(
                          "remove",
                          "Issue removing from favorites"
                        );
                      }}
                      className="icon"
                      title="Remove from Favorites"
                    />
                  )}
                </p>
              </div>
            )}
            {patchError && <div>{patchError}</div>}
            <AdminIcons resource='creatures'/>
            <h1>{creature.name}</h1>
            <section className="main-single-page">
              <figure>
                <img src={creature.img} alt="" />
              </figure>
              <div>
                <ul>
                  <li>
                    <strong>Culture: </strong>
                    <Link
                      to={`/cultures/culture/${creature.culture._id}`}
                      className="link"
                    >
                      {creature.culture.name} ({creature.culture.country})
                    </Link>
                  </li>
                  <li>
                    <strong>Type: </strong>
                    {creature.type.length > 1 && (
                      <>
                        {creature.type.map((t) => {
                          return <span key={t}>{t} | </span>;
                        })}
                      </>
                    )}
                    {creature.type.length === 1 && creature.type}
                  </li>
                  <li>
                    <strong>Description: </strong>
                    {creature.description}
                  </li>
                  <li>
                    <strong>Appearance: </strong>
                    {creature.appearance}
                  </li>
                  <li>
                    <strong>Legends: </strong>
                    {creature.legends}
                  </li>
                  <li>
                    <strong>First Mention: </strong>
                    {creature.first_mention}
                  </li>
                  <li>
                    <strong>Traits: </strong>
                    <ul className="traits-ul">
                      {creature.traits.map((t) => {
                        return <li key={t}>{t}</li>;
                      })}
                    </ul>
                  </li>
                  {creature.event && (
                    <li>
                      <strong>Event: </strong>
                      <Link
                        to={`/cultures/events/event/${creature.event._id}`}
                        className="link"
                      >
                        {creature.event.name}
                      </Link>
                    </li>
                  )}
                </ul>
              </div>
            </section>
          </>
        )}
      </main>
    </>
  );
}
