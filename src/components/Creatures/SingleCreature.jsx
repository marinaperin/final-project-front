import axios from "../../lib/axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
const { VITE_API_URL } = import.meta.env;

export default function () {
  const { id } = useParams();
  const [creature, setCreature] = useState();
  const [error, setError] = useState(false);

  useEffect(() => {
    axios
      .get(`${VITE_API_URL}/creatures/${id}`)
      .then((res) => {
        setCreature({ ...res.data });
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
        setError(true);
      });
  }, []);

  return (
    <>
      <main className="single-creature">
        {error && "There was an error, try again in a few minutes."}
        {!error && !creature && (
          <div className="loader-container">
            <img
              src="../../../public/bat-loader.gif"
              alt=""
              className="loader"
            />
          </div>
        )}
        {!error && creature && (
          <>
            <h1>{creature.name}</h1>
            <section className="main-page">
              <figure>
                <img src={creature.img} alt="" />
              </figure>
              <div>
                <ul>
                  <li>
                    <strong>Culture: </strong>
                    <Link
                      to={`/cultures/${creature.culture._id}`}
                    className="link">
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
                </ul>
              </div>
            </section>
          </>
        )}
      </main>
    </>
  );
}
