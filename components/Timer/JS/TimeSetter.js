import css from "../UI/TimeSetter.module.scss";
import React,{useEffect,useState,useContext} from "react";
import { stateManager } from './Timer'
import useLongPress from "../../../hooks/useLongPress";
function TimeSetter(props) {
  const { focusTime,setFocusTime } = props;
  const stateContext = useContext(stateManager)
  const changeFoucusTime = useLongPress({down:setTime,up:stopChanging,interval:300})
  function stopChanging(e) {
  }
  function setTime(e) {
    const isUp = e.target.id == "up";
    let [boundary, deltaTime] = [240, 15];
    if (!isUp) {
      boundary = 15;
      deltaTime = -15;
    }
    setFocusTime((pre) => { console.log(pre); return pre == boundary ? boundary : pre + deltaTime; });
  }
  function startFocus() {
    stateContext.nextState("START");
      const context = new AudioContext();
      const osc = context.createOscillator();
      osc.connect(context.destination);

      /* Let's play a sine wave for one second. */

      osc.start(context.currentTime+5);
      osc.stop(context.currentTime + 5.5);
  }
  return (
    <div className={css.container} >
      <h2 className={css.title} style={{fontFamily:'monospace'}}>Clock</h2>
      <div className={css.setterContainer}>
        <div className={css.focusTime}>
          <span>{focusTime}</span>
        </div>
        <button
          id="up"
          className={`${css.timerButton} ${css.up}`}
          {...changeFoucusTime.handlers}

        ></button>
        <button
          className={`${css.timerButton} ${css.down}`}
          {...changeFoucusTime.handlers}

        ></button>
      </div>
      <button className={css.startButton} onClick={startFocus}
      
      >

        开始
      </button>
    </div>
  );
}
function speedUp(interval, setId, callback) {
  interval = interval < 50 ? 50 : interval;
  setId(
    setTimeout(() => {
      callback();
      speedUp(interval / 1.3, setId, callback);
    }, interval)
  );
}

export default TimeSetter;
