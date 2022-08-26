import { stateManager } from "./Timer";
import css from "../UI/Countdown.module.scss";
import Pyramide from "./Pyramide";

import React, { useContext, useRef, useState, useEffect } from "react";

function Countdown(props) {
  const { totalTime } = props;
  const [ticking, setTicking] = useState(true);
  const [countdown, setCountdown] = useState(totalTime);
  const [timerId, setTimerId] = useState(0);

  const stateContext = useContext(stateManager);

  const outerRef = useRef();
  function countdownSideEffect() {
    //calculate and set progress bar's angle
    const angle = Math.floor((360 * countdown) / totalTime) + "deg";
    if (outerRef.current) {
      outerRef.current.style.setProperty("--angle-end", angle);
    }
    //if countdown is 0, send "END" event to state machine.
    if (countdown == 0) {
      clearInterval(timerId);
      stateContext.nextState("END");
    }
  }
  function initializeTimer() {
    const id = setInterval(() => {
      setCountdown((pre) => pre - 1);
    }, 1);
    setTimerId(id);
    return () => clearInterval(id);
  }
  useEffect(initializeTimer, []);
  useEffect(countdownSideEffect, [countdown]);

  function stopCounting() {
    console.log("run");
    stateContext.nextState("STOP");
  }
  function toggleClock() {
    if (!ticking) {
      initializeTimer();
    }
    else {
      clearInterval(timerId);
    }
    setTicking(!ticking);
  }

  return (
    <div>

      <div className={css.container}>
      <Pyramide />

        <h2 className={css.title}></h2>
        <div className={css.outer} ref={outerRef}>
          <div className={css.endpoint}></div>
          <div className={css.inner}></div>
          <span>{formatTime(countdown)}</span>
        </div>
        <div className={css.buttons}>
          <button onClick={stopCounting} className={css.stopButton}>
            结束
          </button>
          <button onClick={toggleClock} className={css.stopButton}>
            {ticking ? "暂停" : "开始"}
          </button>
        </div>
      </div>
    </div>
  );
}
function formatTime(total) {
  let min = Math.floor(total / 60);
  let sec = total % 60;
  return `${min}:${sec > 9 ? sec : "0" + sec}`;
}
export default Countdown;
