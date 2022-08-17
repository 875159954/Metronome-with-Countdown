import css from "../UI/Pyramide.module.scss";
import { useRef, useState, useEffect } from "react";
import { BsClock, bs } from "react-icons/bs";
import { BsHouse } from "react-icons/bs";

function Pyramide(props) {
  const [show, setShow] = useState(false);
  const self = useRef();

  function shiftMode() {
    self.current.style.setProperty("display", 'flex');
    self.current.parentElement.replaceChild(self.current, self.current);
    setShow(!show);
  }

  return (
    <div>
      <div
        className={css.container}
        style={{
          animationDirection: show ? "normal" : "reverse",
          animationFillMode: show ? "" : "forwards",
        }}
        ref={self}
      >
        <div className={css.circle}>
          <div className={css.sun}></div>
          <div className={css.right}></div>
          <div className={css.left}></div>
          <div className={css.land}></div>
          <div className={css.shadow}></div>
        </div>
      </div>

      <button
        style={{ color: show ? "white" : "" }}
        onClick={shiftMode}
        className={css.shiftMode}
      >
        {show ? <BsClock /> : <BsHouse />}
      </button>
    </div>
  );
}

export default Pyramide;
