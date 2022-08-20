import css from "../UI/Timer.module.scss";
import { useState, createContext } from "react";
import Countdown from "./Countdown";
import TimeSetter from "./TimeSetter";
import Final from "./Final";


export const stateManager = createContext({
  nextState: function (event) {},
  setFocusTime: function () {},
});

function Timer(props) {
  const [timerState, setTimerState] = useState("setting");
  const [focusTime, setFocusTime] = useState(15);
  const satateContext = {
    nextState,
    setFocusTime,
  };

  const stateMachine = {
    setting: { START: "counting" },
    counting: { STOP: "failed", HIDE: "hiding", END: "success" },
    hiding: { STOP: "setting", SHOW: "counting", END: "success" },
    success: { RESTART: "setting" },
    failed: { RESTART: "setting" },
  };

  function nextState(event) {
    setTimerState((cur) => {
      const nextstate = stateMachine[cur][event];
      if (nextstate) return nextstate;
      return "setting";
    });
  }
  function getComponent() {
    const pages = {
      setting: (
        <TimeSetter
          focusTime={focusTime}
          nextState={nextState}
          setFocusTime={setFocusTime}
        />
      ),
      counting: <Countdown totalTime={focusTime * 60} nextState={nextState} />,
      success: <Final jobState="success" />,
      failed: <Final jobState="failed" />,
    };
    return pages[timerState];
  }

  return (
    <stateManager.Provider value={satateContext}>
      <div className={css.container}>{getComponent()}</div>
    </stateManager.Provider>
  );
}

export default Timer;
