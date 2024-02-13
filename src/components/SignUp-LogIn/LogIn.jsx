import { useState } from "react";
import "./auth.scss";

export default function () {
  const [inputValues, setInputValues] = useState({
    email: "",
    password: "",
  });

  return (
    <main className="log-in">
      <h1>Log In</h1>
      <section>
        <label>
          Email:
          <input
            type="email"
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
            value={inputValues.password}
            onChange={(e) => {
              setInputValues({ ...inputValues, password: e.target.value });
            }}
          />
        </label>
        <button
          onClick={() => {
            console.log(inputValues);
            setInputValues({ email: "", password: "" });
          }}
        >
          LOG IN
        </button>
      </section>
    </main>
  );
}