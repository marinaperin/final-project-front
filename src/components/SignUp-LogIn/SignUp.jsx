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
  const [confirmPwdError, setConfirmPwdError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [missingError, setMissingError] = useState("");
  const [pwdError, setPwdError] = useState("");

  const signUser = () => {
    const { email, password, confirmPassword } = inputValues;
    if (!email || !password || !confirmPassword) {
      setMissingError("All fields must be filled");
      return;
    }
    if (!email.includes("@")) {
      setEmailError("Invalid email");
      return;
    }
    if (password.length < 10) {
      setPwdError(
        "Password must contain at least 10 characters: 1 lowercase, 1 uppercase, 1 number and 1 symbol"
      );
      return;
    }
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
      {error && <div>Issue creating account</div>}
      {emailError && <div>{emailError}</div>}
      {missingError && <div>{missingError}</div>}
      {pwdError && <div>{pwdError}</div>}
      {confirmPwdError && <div>{confirmPwdError}</div>}
      {!user && (
        <section
          onClick={() => {
            setConfirmPwdError("");
            setEmailError("");
            setMissingError("");
            setPwdError("");
          }}
        >
          <label>
            Email:
            <input
              type="email"
              required
              value={inputValues.email}
              onChange={(e) => {
                setConfirmPwdError("");
                setEmailError("");
                setMissingError("");
                setPwdError("");
                setInputValues({ ...inputValues, email: e.target.value });
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  signUser();
                  setInputValues({
                    email: "",
                    password: "",
                    confirmPassword: "",
                  });
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
                setConfirmPwdError("");
                setEmailError("");
                setMissingError("");
                setPwdError("");
                setInputValues({ ...inputValues, password: e.target.value });
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  signUser();
                  setInputValues({
                    email: "",
                    password: "",
                    confirmPassword: "",
                  });
                }
              }}
              title="Must contain at least 10 characters: 1 lowercase, 1 uppercase, 1 number and 1 symbol"
            />
          </label>
          <label>
            Confirm password:
            <input
              type="password"
              required
              value={inputValues.confirmPassword}
              onChange={(e) => {
                setConfirmPwdError("");
                setEmailError("");
                setMissingError("");
                setPwdError("");
                setInputValues({
                  ...inputValues,
                  confirmPassword: e.target.value,
                });
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  signUser();
                  setInputValues({
                    email: "",
                    password: "",
                    confirmPassword: "",
                  });
                }
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
        </section>
      )}
      {user && <div>Account created successfully</div>}
    </main>
  );
}
