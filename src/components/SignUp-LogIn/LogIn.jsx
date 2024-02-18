import { useState } from "react";
import "./auth.scss";
import { useUser } from "../../context/UserContext";
import { Navigate } from "react-router-dom";

export default function () {
  const [inputValues, setInputValues] = useState({
    email: "",
    password: "",
  });
  const { user, loading, error, logIn } = useUser();
  const { email, password } = inputValues;

  return (
    <main className="log-in">
      <h1>Log In</h1>
      {loading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {!user && (
        <section>
          <label>
            Email:
            <input
              type="email"
              required
              value={inputValues.email}
              onChange={(e) => {
                setInputValues({ ...inputValues, email: e.target.value });
              }}
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              required
              value={inputValues.password}
              onChange={(e) => {
                setInputValues({ ...inputValues, password: e.target.value });
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  logIn(email, password);
                  setInputValues({ email: "", password: "" });
                }
              }}
            />
          </label>
          <button
            onClick={() => {
              logIn(email, password);
              setInputValues({ email: "", password: "" });
            }}
            disabled={loading ? true : false}
          >
            LOG IN
          </button>
        </section>
      )}
      {user && <Navigate to="/" />}
    </main>
  );
}
