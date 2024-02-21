import { useEffect, useState } from "react";
import axios from "../../lib/axios";
import { useUser } from "../../context/UserContext";
const { VITE_API_URL } = import.meta.env;

export default function () {
  const [cultures, setCultures] = useState();
  const [events, setEvents] = useState();
  const [error, setError] = useState(false);
  const [creatureType, setCreatureType] = useState("");
  const [creatureTrait, setCreatureTrait] = useState("");
  const [haveEvent, setHaveEvent] = useState(false);
  const [postError, setPostError] = useState("");
  const [complete, setComplete] = useState(false);
  const { loading, setLoading } = useUser();
  const [formData, setFormData] = useState({
    name: "",
    culture: "",
    type: "",
    traits: "",
    first_mention: "",
    appearance: "",
    description: "",
    img: "",
    event: "",
    legends: "",
  });

  const postCreature = () => {
    setLoading(true);
    axios
      .post(`${VITE_API_URL}/creatures`, {
        ...formData,
        type: [...formData.type, creatureType],
        traits: [...formData.traits, creatureTrait],
      })
      .then((res) => {
        setComplete(true);
      })
      .catch((err) => {
        console.error(err);
        setPostError(err.response.data._message);
      })
      .finally(() => {
        setLoading(false);
        setTimeout(() => setPostError(""), 5000);
      });
  };

  useEffect(() => {
    axios
      .get(`${VITE_API_URL}/cultures`)
      .then((res) => {
        setCultures([{ _id: null, name: "Choose" }, ...res.data]);
      })
      .catch((err) => {
        console.error(err);
        setError(true);
      });

    axios
      .get(`${VITE_API_URL}/events`)
      .then((res) => {
        /* 
        const filteredEvents = res.data.filter((e) => {
          return e.creatures.length === 0;
        }); */
        setEvents([{ _id: null, name: "Choose" }, ...res.data]);
      })
      .catch((err) => {
        console.error(err);
        setError(true);
      });
  }, []);

  return (
    <>
      {complete && (
        <div className="complete-msg">Creature created successfully</div>
      )}
      {postError && (
        <div className="issue-msg">
          Issue adding creature : {`${postError}`}
        </div>
      )}
      {!error && cultures && !complete && (
        <div className="add-form">
          <label>
            <span>
              <span className="required">*</span> Name:{" "}
            </span>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData((curr) => ({ ...curr, name: e.target.value }))
              }
            />
          </label>
          <label>
            <span>
              <span className="required">*</span> Culture:{" "}
            </span>
            <select
              value={formData.culture}
              onChange={(e) =>
                setFormData((curr) => ({ ...curr, culture: e.target.value }))
              }
            >
              {cultures.map((c) => {
                return (
                  <option value={c._id} key={c._id}>
                    {c.name}
                  </option>
                );
              })}
            </select>
          </label>
          <label>
            <span>
              <span className="required">*</span> Type:{" "}
            </span>
            <div>
              <input
                type="text"
                value={creatureType}
                onChange={(e) => {
                  setCreatureType(e.target.value);
                }}
                placeholder="Click + to add"
              />
              <button
                onClick={() => {
                  setFormData((curr) => ({
                    ...curr,
                    type: [...formData.type, creatureType],
                  }));
                  setCreatureType("");
                }}
              >
                +
              </button>
            </div>

            {formData.type.length > 0 && (
              <p>
                {formData.type.map((t) => (
                  <span key={t}>{t} | </span>
                ))}
                <button
                  onClick={() => setFormData((curr) => ({ ...curr, type: "" }))}
                >
                  Reset
                </button>
              </p>
            )}
          </label>
          <label>
            <span>Traits: </span>
            <div>
              <input
                type="text"
                value={creatureTrait}
                onChange={(e) => {
                  setCreatureTrait(e.target.value);
                }}
                placeholder="Click + to add"
              />
              <button
                onClick={() => {
                  setFormData((curr) => ({
                    ...curr,
                    traits: [...formData.traits, creatureTrait],
                  }));
                  setCreatureTrait("");
                }}
              >
                +
              </button>
            </div>

            {formData.traits.length > 0 && (
              <p>
                {formData.traits.map((t) => (
                  <span key={t}>{t} | </span>
                ))}
                <button
                  onClick={() =>
                    setFormData((curr) => ({ ...curr, traits: "" }))
                  }
                >
                  Reset
                </button>
              </p>
            )}
          </label>
          <label>
            <span>First Mention: </span>
            <input
              type="text"
              value={formData.first_mention}
              onChange={(e) =>
                setFormData((curr) => ({
                  ...curr,
                  first_mention: e.target.value,
                }))
              }
            />
          </label>
          <label>
            <span>Image: </span>
            <input
              type="text"
              value={formData.img}
              onChange={(e) =>
                setFormData((curr) => ({ ...curr, img: e.target.value }))
              }
            />
          </label>
          <label>
            <span>
              <span className="required">*</span> Event (one event per
              creature):{" "}
            </span>
            {!haveEvent && (
              <>
                <div>
                  <button
                    onClick={() => {
                      setHaveEvent(true);
                    }}
                    className="spaced-buttons"
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => {
                      setHaveEvent(true);
                      setFormData((curr) => ({ ...curr, event: null }));
                    }}
                    className="spaced-buttons"
                  >
                    No
                  </button>
                </div>
              </>
            )}
            {haveEvent && formData.event === "" && (
              <div>
                <select
                  value={formData.event}
                  onChange={(e) => {
                    setFormData((curr) => ({
                      ...curr,
                      event: e.target.value,
                    }));
                  }}
                >
                  {events.map((e) => {
                    return (
                      <option value={e._id} key={e._id} title={e.name}>
                        {e.name}
                      </option>
                    );
                  })}
                </select>
              </div>
            )}
            {haveEvent && formData.event !== '' && <p>{formData.event}</p>}
          </label>
          <label>
            <p>Description: </p>
            <textarea
              name=""
              id=""
              cols="30"
              rows="10"
              value={formData.description}
              onChange={(e) =>
                setFormData((curr) => ({
                  ...curr,
                  description: e.target.value,
                }))
              }
            ></textarea>
          </label>
          <label>
            <p>Appearance: </p>
            <textarea
              name=""
              id=""
              cols="30"
              rows="10"
              value={formData.appearance}
              onChange={(e) =>
                setFormData((curr) => ({ ...curr, appearance: e.target.value }))
              }
            ></textarea>
          </label>
          <label>
            <p>Legends: </p>
            <textarea
              name=""
              id=""
              cols="30"
              rows="10"
              value={formData.legends}
              onChange={(e) =>
                setFormData((curr) => ({ ...curr, legends: e.target.value }))
              }
            ></textarea>
          </label>
          <div>
            <button
              onClick={() => {
                postCreature();
              }}
              disabled={loading ? true : false}
              className="add-btn"
            >
              ADD
            </button>
          </div>
        </div>
      )}
    </>
  );
}
