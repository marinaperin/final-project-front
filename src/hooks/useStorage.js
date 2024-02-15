import { useState } from "react";

export default function (key, defaultVal) {
  const initialVal = sessionStorage.getItem(key);
  const [state, setState] = useState(
    initialVal === null ? defaultVal : JSON.parse(initialVal)
  );
  const changeState = (newVal) => {
    setState(newVal);
    sessionStorage
    .setItem(key, JSON.stringify(newVal));
  };
  return [state, changeState];
}
