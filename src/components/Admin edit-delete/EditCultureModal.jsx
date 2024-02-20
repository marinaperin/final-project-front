import { useEffect, useRef, useState } from "react";
import axios from "../../lib/axios";
import { useParams } from "react-router-dom";
import { useUser } from "../../context/UserContext";
const { VITE_API_URL } = import.meta.env;

export default function ({ resourceType, isOpen, setIsOpen }) {
  const { id } = useParams();
  const [msg, setMsg] = useState("");
  const [culture, setCulture] = useState();
  const [error, setError] = useState(false);
  const [cultureReligion, setCultureReligion] = useState("");
  const [cultureLanguage, setCultureLanguage] = useState("");
  const { loading, setLoading } = useUser();
  const [formData, setFormData] = useState({});
  const dialogRef = useRef();

  useEffect(() => {
    if (isOpen) {
      dialogRef.current.showModal();
    } else {
      dialogRef.current.close();
    }

    axios
      .get(`${VITE_API_URL}/${resourceType}/${id}`)
      .then((res) => {
        setCulture({ ...res.data });
        setFormData({ ...res.data, religions: "", languages: "" });
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
          {!msg && formData && (
            <>
              {" "}
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
                <span>Country:</span>
                <input
                  type="text"
                  value={formData.country}
                  onChange={(e) =>
                    setFormData((curr) => ({
                      ...curr,
                      country: e.target.value,
                    }))
                  }
                />
              </label>
              <label>
                <span>Continent:</span>
                <input
                  type="text"
                  value={formData.continent}
                  onChange={(e) =>
                    setFormData((curr) => ({
                      ...curr,
                      continent: e.target.value,
                    }))
                  }
                />
              </label>
              <label>
                <span>Image:</span>
                <input
                  type="text"
                  value={formData.img}
                  onChange={(e) =>
                    setFormData((curr) => ({ ...curr, img: e.target.value }))
                  }
                />
              </label>
              <label>
                <span>Religions: </span>
                <div>
                  <input
                    type="text"
                    value={cultureReligion}
                    onChange={(e) => {
                      setCultureReligion(e.target.value);
                    }}
                    placeholder="Click + to add"
                  />
                  <button
                    onClick={() => {
                      setFormData((curr) => ({
                        ...curr,
                        religions: [...formData.religions, cultureReligion],
                      }));
                      setCultureReligion("");
                    }}
                  >
                    +
                  </button>
                </div>

                {formData.religions && formData.religions.length > 0 && (
                  <p>
                    {formData.religions.map((r) => (
                      <span key={r}>{r} | </span>
                    ))}
                    <button
                      onClick={() =>
                        setFormData((curr) => ({ ...curr, religions: "" }))
                      }
                    >
                      Reset
                    </button>
                  </p>
                )}
              </label>
              <label>
                <span>Languages: </span>
                <div>
                  <input
                    type="text"
                    value={cultureLanguage}
                    onChange={(e) => {
                      setCultureLanguage(e.target.value);
                    }}
                    placeholder="Click + to add"
                  />
                  <button
                    onClick={() => {
                      setFormData((curr) => ({
                        ...curr,
                        languages: [...formData.languages, cultureLanguage],
                      }));
                      setCultureLanguage("");
                    }}
                  >
                    +
                  </button>
                </div>

                {formData.languages && formData.languages.length > 0 && (
                  <p>
                    {formData.languages.map((l) => (
                      <span key={l}>{l} | </span>
                    ))}
                    <button
                      onClick={() =>
                        setFormData((curr) => ({ ...curr, languages: "" }))
                      }
                    >
                      Reset
                    </button>
                  </p>
                )}
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
