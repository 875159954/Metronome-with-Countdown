import { useState, useEffect } from "react";
import css from "../UI/Banner.module.scss";

function Banner(props) {
  const [title, setTitle] = useState("提示");

  return (
    <footer className={css.footerBackground + " " + css.hidden}>
      <div className={css.footerContent}>
        <h2></h2>
        <span>按~修改BPM</span>
      </div>
    </footer>
  );
}

export default Banner;
