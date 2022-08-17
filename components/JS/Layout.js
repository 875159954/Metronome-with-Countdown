import css from "../UI/Layout.module.scss";

import React from "react";
import Nav from "./Nav";

function Layout(props) {
  return (
    <div>
      <Nav />
      <div className={css.container}>{props.children}</div>
    </div>
  );
}

export default Layout;
