import { useEffect, useRef, useState } from "react";
import axios from "../../lib/axios";
import { useNavigate, useParams } from "react-router-dom";
import { useUser } from "../../context/UserContext";
const { VITE_API_URL } = import.meta.env;

export default function ({ isOpen, setIsOpen, resourceType }) {
  const { id } = useParams();
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const [creature, setCreature] = useState();
  const [cultures, setCultures] = useState();
  const [events, setEvents] = useState();
  const [creatureType, setCreatureType] = useState("");
  const [creatureTrait, setCreatureTrait] = useState("");
  const [haveEvent, setHaveEvent] = useState(false);
  const [error, setError] = useState(false);
  const [formData, setFormData] = useState({});
  const { loading, setLoading } = useUser();
  const dialogRef = useRef();

  const patchCreature = () => {
    setLoading(true);
    axios
      .patch(`${VITE_API_URL}/${resourceType}/${id}`, formData)
      .then((res) => {
        setMsg("Resource edited successfully");
      })
      .catch((err) => {
        console.error(err);
        setError(true);
      })
      .finally(() => {
        setTimeout(() => {
          window.location.reload();
          setIsOpen(false);
        }, 2000);
      });
  };

  useEffect(() => {
    if (isOpen) {
      dialogRef.current.showModal();
    } else {
      dialogRef.current.close();
    }

    axios
      .get(`${VITE_API_URL}/${resourceType}/${id}`)
      .then((res) => {
        setCreature({ ...res.data });
        setFormData({ ...res.data });
      })
      .catch((err) => {
        console.error(err);
        setError(true);
      });
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
        setEvents([{ _id: null, name: "Choose" }, ...res.data]);
      })
      .catch((err) => {
        console.error(err);
        setError(true);
      });
  }, [isOpen]);

  return (
    <>
      <dialog ref={dialogRef} className="edit-dialog">
        <div className="close-modal-btn">
          <button
            onClick={() => {
              setIsOpen(false);
            }}
          >
            X
          </button>
        </div>
        <div className="main-modal">
          {msg && (
            <div className="modal-msg">
              <h4>{msg}</h4>
              <p>Reloading page...</p>
            </div>
          )}
          {!msg && formData && cultures && events && (
            <>
              <h2>Edit</h2>
              <div>
                <label>
                  <span>Name: </span>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData((curr) => ({ ...curr, name: e.target.value }))
                    }
                  />
                </label>
                <label>
                  <span>Culture: </span>
                  <select
                    value={formData.culture}
                    onChange={(e) =>
                      setFormData((curr) => ({
                        ...curr,
                        culture: e.target.value,
                      }))
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
                  <span>Type: </span>
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
                        if (creatureType === "") {
                          setFormData((curr) => ({
                            ...curr,
                            type: [...formData.type],
                          }));
                        } else {
                          setFormData((curr) => ({
                            ...curr,
                            type: [...formData.type, creatureType],
                          }));
                          setCreatureType("");
                        }
                      }}
                    >
                      +
                    </button>
                  </div>
                  {formData.type && formData.type.length > 0 && (
                    <p>
                      {formData.type.map((t) => (
                        <span key={t}>{t} | </span>
                      ))}
                      <button
                        onClick={() =>
                          setFormData((curr) => ({ ...curr, type: "" }))
                        }
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
                        if (creatureTrait === "") {
                          setFormData((curr) => ({
                            ...curr,
                            traits: [...formData.traits],
                          }));
                        } else {
                          setFormData((curr) => ({
                            ...curr,
                            traits: [...formData.traits, creatureTrait],
                          }));
                          setCreatureTrait("");
                        }
                      }}
                    >
                      +
                    </button>
                    {formData.traits && formData.traits.length > 0 && (
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
                  </div>
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
                <select
                  value={formData.event}
                  onChange={(e) => {
                    setFormData((curr) => ({
                      ...curr,
                      event: e.target.value,
                    }));
                    setHaveEvent(true);
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
              )}
              <button
                onClick={() => {
                  setHaveEvent(!haveEvent);
                  setFormData((curr) => ({ ...curr, event: null }));
                }}
              >
                {haveEvent ? "Back" : "No event"}
              </button>
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
                      setFormData((curr) => ({
                        ...curr,
                        appearance: e.target.value,
                      }))
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
                      setFormData((curr) => ({
                        ...curr,
                        legends: e.target.value,
                      }))
                    }
                  ></textarea>
                </label>
              </div>
              <div>
                <button
                  onClick={() => {
                    setIsOpen(false);
                  }}
                  disabled={loading ? true : false}
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    if (creatureType) {
                      setFormData((curr) => ({
                        ...curr,
                        type: [...formData.type, creatureType],
                      }));
                      patchCreature();
                      setCreatureType("");
                    } else if (creatureTrait) {
                      setFormData((curr) => ({
                        ...curr,
                        traits: [...formData.traits, creatureTrait],
                      }));
                      patchCreature();
                      setCreatureTrait("");
                    } else {
                      patchCreature();
                    }
                  }}
                  disabled={loading ? true : false}
                >
                  Continue
                </button>
              </div>
            </>
          )}
        </div>
      </dialog>
    </>
  );
}
