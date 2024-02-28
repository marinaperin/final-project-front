import { useState } from "react";
import "./auth.scss";
import { useUser } from "../../context/UserContext";
import { Navigate } from "react-router-dom";

export default function () {
  const [inputValues, setInputValues] = useState({
    email: "",
    password: "",
  });
  const { user, loading, error, setError, logIn } = useUser();
  const { email, password } = inputValues;
  const [credError, setCredError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [pwdError, setPwdError] = useState("");

  const logUser = () => {
    if (!email || !password) {
      setCredError("All fields must be filled");
      return;
    }
    if (!email.includes("@")) {
      setEmailError("Invalid email");
      return;
    }
    logIn(email, password);
    setInputValues({ email: "", password: "" });
  };

  return (
    <main className="log-in">
      <h1>Log In</h1>
      {loading && <div>Loading...</div>}
      {error && <div className="error-msg">Issue logging in, try again</div>}
      {credError && <div>{credError}</div>}
      {emailError && <div>{emailError}</div>}
      {!user && (
        <section
          onClick={() => {
            setCredError("");
            setEmailError("");
            setError(null);
          }}
        >
          <label>
            Email:
            <input
              type="email"
              required
              value={inputValues.email}
              onChange={(e) => {
                setCredError("");
                setEmailError("");
                setError(null);
                setInputValues({ ...inputValues, email: e.target.value });
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  logUser();
                }
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
                setCredError("");
                setEmailError("");
                setError(null);
                setInputValues({ ...inputValues, password: e.target.value });
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  logUser();
                }
              }}
            />
          </label>
          <button
            onClick={() => {
              logUser();
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
