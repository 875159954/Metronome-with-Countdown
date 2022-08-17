import css from "../UI/TimeSetter.module.scss";
import React,{useEffect,useState,useContext} from "react";
import { stateManager } from './Timer'
function TimeSetter(props) {
  const { focusTime,setFocusTime,nextState } = props;
  const [timerId, setTimerId] = useState(0);
  const stateContext = useContext(stateManager)
  
  function stopChanging(e) {
    clearInterval(timerId);
  }
  function setTime(e) {
    const isUp = e.target.id == "up";
    let [boundary, deltaTime] = [240, 15];
    if (!isUp) {
      boundary = 15;
      deltaTime = -15;
    }
    setFocusTime((pre) => { console.log(pre); return pre == boundary ? boundary : pre + deltaTime; });

    speedUp(200, setTimerId, () =>
      setFocusTime((pre) => (pre == boundary ? boundary : pre + deltaTime))
    );
  }
  function startFocus() {
    nextState("START");
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
          onPointerUp={stopChanging}
          onPointerDown={setTime}
          onPointerLeave={stopChanging}

        ></button>
        <button
          className={`${css.timerButton} ${css.down}`}
          onPointerUp={stopChanging}
          onPointerDown={setTime}
          onPointerLeave={stopChanging}
        ></button>
      </div>
      <button className={css.startButton} onClick={startFocus}>
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
