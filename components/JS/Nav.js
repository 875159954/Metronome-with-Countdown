import css from "../UI/Nav.module.scss";

import React from "react";
import { TbActivityHeartbeat } from "react-icons/tb";
function Nav(props) {
  return (
    <header className={css.bg}>
      <nav className={css.nav}>
        <div className={css.logo}>
          <div className={css.logoText}>ME.</div>
        </div>
        <div className={css.brand}>
          <span></span>
        </div>
        <button className={css.contactButton}>
          <span>Contact me</span>
        </button>
      </nav>
    </header>
  );
}

export default Nav;
