import { useEffect, useState } from "react";

export function useLocalStorage(key, initialValue) {
  let [value, setValue] = useState(initialValue);
  useEffect(() => {
    const item = window.localStorage.getItem(key);
    if (item == "{}" || item == "null") {
      localStorage.setItem(key, JSON.stringify(initialValue));
      setStoredValue(initialValue);
      return;
    }
    setStoredValue(JSON.parse(item));
  }, []);

  function setStoredValue(valuePassIn) {
    try {
      if (valuePassIn == null) throw "try setting null to localStorage";
      const valueToStore =
        valuePassIn instanceof Function ? valuePassIn(value) : valuePassIn;
      setValue(valueToStore);
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
        console.log("store");
      }
    } catch (error) {
      console.log(error);
    }
  }
  return [value, setStoredValue];
}
