import { useEffect, useRef, useState } from "react";
import axios from "../../lib/axios";
import { useParams } from "react-router-dom";
import { useUser } from "../../context/UserContext";
const { VITE_API_URL } = import.meta.env;

export default function ({ resourceType, isOpen, setIsOpen }) {
  const { id } = useParams();
  const [msg, setMsg] = useState("");
  const [event, setEvent] = useState();
  const [cultures, setCultures] = useState();
  const [error, setError] = useState(false);
  const [eventDate, setEventDate] = useState("");
  const { loading, setLoading } = useUser();
  const [formData, setFormData] = useState({});
  const dialogRef = useRef();

  const patchEvent = () => {
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
        setEvent({ ...res.data });
        setFormData({ ...res.data});
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
          {!msg && formData && cultures && (
            <>
              <h2>Edit</h2>
              <label>
                <span>Name:</span>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((curr) => ({ ...curr, name: e.target.value }))
                  }
                />
              </label>
              <label>
                <span>Culture:</span>
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
                <span>Type:</span>
                <div>
                  <input
                    type="text"
                    value={formData.type}
                    onChange={(e) => {
                      setFormData((curr) => ({
                        ...curr,
                        type: e.target.value,
                      }));
                    }}
                  />
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
                <span>Date: </span>
                <div>
                  <input
                    type="text"
                    value={eventDate}
                    onChange={(e) => {
                      setEventDate(e.target.value);
                    }}
                    placeholder="MM/DD - Click + to add"
                  />
                  <button
                    onClick={() => {
                      if (eventDate === "") {
                        setFormData((curr) => ({
                          ...curr,
                          date: [...formData.date],
                        }));
                      } else {
                        setFormData((curr) => ({
                          ...curr,
                          date: [...formData.date, eventDate],
                        }));
                        setEventDate("");
                      }
                    }}
                  >
                    +
                  </button>
                </div>

                {formData.date && formData.date.length > 0 && (
                  <p className="list">
                    {formData.date.map((d) => (
                      <span key={d}>{d} | </span>
                    ))}
                    <button
                      onClick={() =>
                        setFormData((curr) => ({ ...curr, date: "" }))
                      }
                    >
                      Reset
                    </button>
                  </p>
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
                    if (eventDate) {
                      setFormData((curr) => ({
                        ...curr,
                        date: [...formData.date, eventDate],
                      }));
                      patchEvent();
                      setEventDate("");
                    } else {
                      patchEvent();
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
