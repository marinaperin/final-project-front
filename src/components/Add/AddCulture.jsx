import { useState } from "react";
import axios from "../../lib/axios";
import { useUser } from "../../context/UserContext";
const { VITE_API_URL } = import.meta.env;

export default function () {
  const [complete, setComplete] = useState(false);
  const [cultureReligion, setCultureReligion] = useState("");
  const [cultureLanguage, setCultureLanguage] = useState("");
  const [postError, setPostError] = useState(false);
  const { loading, setLoading } = useUser();
  const [formData, setFormData] = useState({
    name: "",
    country: "",
    continent: "",
    religions: "",
    languages: "",
    img: "",
  });

  const postCulture = () => {
    setLoading(true);
    axios
      .post(`${VITE_API_URL}/cultures`, formData)
      .then((res) => {
        setComplete(true);
      })
      .catch((err) => {
        console.error(err);
        setPostError(true);
      })
      .finally(() => setLoading(false));
  };

  return (
    <>
      {complete && (
        <div className="complete-msg">Culture created successfully</div>
      )}
      {postError && <div className="issue-msg">Issue adding culture</div>}
      {!complete && (
        <div className="add-form">
          <label>
            <span>
              <span className="required">*</span> Name:
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
              <span className="required">*</span> Country:
            </span>
            <input
              type="text"
              value={formData.country}
              onChange={(e) =>
                setFormData((curr) => ({ ...curr, country: e.target.value }))
              }
            />
          </label>
          <label>
            <span>
              <span className="required">*</span> Continent:
            </span>
            <input
              type="text"
              value={formData.continent}
              onChange={(e) =>
                setFormData((curr) => ({ ...curr, continent: e.target.value }))
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

            {formData.religions.length > 0 && (
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

            {formData.languages.length > 0 && (
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
                postCulture();
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
