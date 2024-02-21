import { useEffect, useState } from "react";
import axios from "../../lib/axios";
import { useUser } from "../../context/UserContext";
const { VITE_API_URL } = import.meta.env;

export default function () {
  const [complete, setComplete] = useState(false);
  const [eventDate, setEventDate] = useState("");
  const [cultures, setCultures] = useState();
  const [error, setError] = useState(false);
  const [postError, setPostError] = useState("");
  const { loading, setLoading } = useUser();
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    description: "",
    date: "",
    first_mention: "",
    img: "",
    culture: "",
  });

  const postEvent = () => {
    setLoading(true);
    axios
      .post(`${VITE_API_URL}/events`, formData)
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
  }, []);

  return (
    <>
      {complete && (
        <div className="complete-msg">Event created successfully</div>
      )}
      {postError && <div className="issue-msg">Issue adding event</div>}
      {!error && cultures && !complete && (
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
              <span className="required">*</span> Culture:
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
              <span className="required">*</span> Type:
            </span>
            <div>
              <input
                type="text"
                value={formData.type}
                onChange={(e) => {
                  setFormData((curr) => ({ ...curr, type: e.target.value }));
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
                  setFormData((curr) => ({
                    ...curr,
                    date: [...formData.date, eventDate],
                  }));
                  setEventDate("");
                }}
              >
                +
              </button>
            </div>

            {formData.date.length > 0 && (
              <p>
                {formData.date.map((d) => (
                  <span key={d}>{d} | </span>
                ))}
                <button
                  onClick={() => setFormData((curr) => ({ ...curr, date: "" }))}
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
                postEvent();
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
