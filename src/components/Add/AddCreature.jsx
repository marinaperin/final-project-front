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

  useEffect(() => {
    axios
      .get(`${VITE_API_URL}/cultures`)
      .then((res) => {
        setCultures(res.data);
      })
      .catch((err) => {
        console.error(err);
        setError(true);
      });

    axios
      .get(`${VITE_API_URL}/events`)
      .then((res) => {
        setEvents(res.data);
      })
      .catch((err) => {
        console.error(err);
        setError(true);
      });
  }, []);

  return (
    <>
      {complete && <div>Creature created successfully</div>}
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
            <span>Event (one creature per event): </span>
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
                  onChange={(e) =>
                    setFormData((curr) => ({
                      ...curr,
                      event: e.target.value,
                    }))
                  }
                >
                  {events.map((e) => {
                    return (
                      <option value={e._id} key={e._id}>
                        {e.name}
                      </option>
                    );
                  })}
                </select>
              </div>
            )}
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
                setLoading(true);
                axios
                  .post(`${VITE_API_URL}/creatures`, formData)
                  .then((res) => {
                    setComplete(true);
                  })
                  .catch((err) => console.error(err))
                  .finally(() => setLoading(false));
              }}
              disabled={loading ? true : false}
            >
              ADD
            </button>
          </div>
        </div>
      )}
    </>
  );
}
