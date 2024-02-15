import axios from "../../lib/axios";
import { createContext, useContext, useState } from "react";
import useStorage from "../hooks/useStorage";
const { VITE_API_URL } = import.meta.env;

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useStorage(null);
  console.log(user);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const signUp = (email, password) => {
    if (loading) {
      return;
    }
    setError(null);
    setLoading(true);
    const body = { email, password };
    axios
      .post(`${VITE_API_URL}/user/sign-up`, body)
      .then((res) => setUser(res.data))
      .catch((err) => {
        console.error(err);
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const logIn = (email, password) => {
    if (loading) {
      return;
    }
    setError(null);
    setLoading(true);
    const body = { email, password };
    axios
      .post(`${VITE_API_URL}/user/log-in`, body)
      .then((res) => setUser(res.data))
      .catch((err) => {
        console.error(err);
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const logOut = () => {
    setUser(null);
  };

  const values = {
    user,
    signUp,
    logIn,
    logOut,
    error,
    loading,
  };

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("Missing UserProvider");
  }
  return context;
};
