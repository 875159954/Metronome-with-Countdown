import css from "../UI/Final.module.scss";
import { stateManager } from "./Timer";

import { useContext, useEffect } from "react";
import MuteButton from "../../JS/MuteButton";
import { FaUndoAlt } from "react-icons/fa";
import { MyAudioContext } from "/components/JS/ContextProvider";
import Visualizer from "/components/JS/Visualizer";
function Final(props) {
  const { jobState } = props;
  const stateContext = useContext(stateManager);
  const audioContext = useContext(MyAudioContext);
  function goBackToSetter() {
    stateContext.nextState("RESTART");
  }
  useEffect(() => {
    if (jobState == "success") audioContext.playmusic();
    return () => {
      audioContext.stopmusic();
    };
  }, []);

  return (
    <div>
      {jobState == "success" ? (
        <div>
          <h1 style={{ textAlign: "center" }}>Congrats!</h1>
          <Visualizer />
        </div>
      ) : (
        <h1 className={css.title}>
          <FaUndoAlt />
        </h1>
      )}

      <button className={css.button} onClick={goBackToSetter}>
        {jobState == "success" ? "再来一次" : "重新开始"}
      </button>
      <div style={{ position: "absolute", left: 10, top: 10 }}>
        <MuteButton />
      </div>
    </div>
  );
}

export default Final;
