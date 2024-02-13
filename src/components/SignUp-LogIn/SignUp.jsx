import { useState } from "react";
import "./auth.scss";

export default function () {
  const [inputValues, setInputValues] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  return (
    <main className="sign-up">
      <h1>Sign Up</h1>
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
            console.log(inputValues);
            setInputValues({ email: "", password: "", confirmPassword: "" });
          }}
        >
          SIGN UP
        </button>
      </section>
    </main>
  );
}
