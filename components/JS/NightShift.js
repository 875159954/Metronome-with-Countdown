import React, { useState, useEffect } from "react";
import { FaPallet } from "react-icons/fa";
import { AiFillCloud } from "react-icons/ai";
import { MdWbSunny } from "react-icons/md";

const palette = {
  light: {
    "--global-bg": "--light-gray",
    "--bg-color-pop": "--dark-blue",
    "--component-bg-color": "--black",
    "--text-color": "--black",
    "--text-color-counter-theme": "--lighter-gray",
    "--border-hover": "--orange",
    "--border-color": "--gray",
    "--border-shadow-color": "--light-blue",
    "--input-bg-color": "--lighter-gray",
    "--input-bg-color-hover": "--light-gray",
    "--button-bg-color": "--gray",
  },
  dark: {
    "--global-bg": "--rich-black-fogra-39",
    "--bg-color-pop": "--rich-black-fogra-39",
    "--component-bg-color": "--dutch-white",
    "--text-color": "--dutch-white",
    "--text-color-counter-theme": "--dutch-white",
    "--border-hover": "--orange",
    "--border-color": "--dutch-white",
    "--border-shadow-color": "--brown",
    "--input-bg-color": "--black-olive",
    "--input-bg-color-hover": "--eerie-black",
    "--button-bg-color": "--black-olive",
  },
};
const style = {
  position: "fixed",
  transform: "scale(3)",
  bottom: "50px",
  right: "30px",
  appearance: "none",
  backgroundColor: "inherit",
  border: "none",
  color: "var(--text-color)",
};
export default function NightShift(props) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  function shiftMode() {
    setIsDarkMode(!isDarkMode);
  }
  useEffect(() => {
    const currentMode = isDarkMode ? "dark" : "light";
    let styles = palette[currentMode];
    for (let key in styles) {
      console.log(key, styles[key]);
      document.documentElement.style.setProperty(key, `var(${styles[key]})`);
    }
  }, [isDarkMode]);

  return (
    <div>
      <div></div>
      <button style={style} onClick={shiftMode}>
        {isDarkMode ? <AiFillCloud /> : <MdWbSunny />}
      </button>
    </div>
  );
}
