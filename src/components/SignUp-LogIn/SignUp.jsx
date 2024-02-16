import { useState } from "react";
import { useUser } from "../../context/UserContext";
import "./auth.scss";

export default function () {
  const [inputValues, setInputValues] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { signUp, error, loading, user } = useUser();
  const [confirmPwdError, setConfirmPwdError] = useState(null);
  const signUser = () => {
    const { email, password, confirmPassword } = inputValues;
    if (password !== confirmPassword) {
      setConfirmPwdError("Passwords don't match!");
      return;
    }
    signUp(email, password);
  };

  return (
    <main className="sign-up">
      <h1>Sign Up</h1>
      {loading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {confirmPwdError && <div>{confirmPwdError}</div>}
      {!user && <section>
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
          />
        </label>
        <label>
          Confirm password:
          <input
            type="password"
            required
            value={inputValues.confirmPassword}
            onChange={(e) => {
              setInputValues({
                ...inputValues,
                confirmPassword: e.target.value,
              });
            }}
          />
        </label>
        <button
          onClick={() => {
            signUser();
            setInputValues({ email: "", password: "", confirmPassword: "" });
          }}
          disabled={loading ? true : false}
        >
          SIGN UP
        </button>
      </section>}
      {user && <div>Account created successfully</div>}
    </main>
  );
}
