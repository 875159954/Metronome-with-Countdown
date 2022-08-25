import css from "../UI/Final.module.scss";
import { stateManager } from "./Timer";

import { useContext, useEffect } from "react";
import { GiMusicalNotes } from "react-icons/gi";
import { FaUndoAlt } from "react-icons/fa";
import { MyAudioContext } from "../../ContextProvider";
function Final(props) {
  const { jobState } = props;
  const stateContext = useContext(stateManager);
  const audioContext = useContext(MyAudioContext);
  function goBackToSetter() {
    stateContext.nextState("RESTART");
  }
  useEffect(() => {
    if(jobState=='success')audioContext.playmusic();
    return ()=>{audioContext.stopmusic()}
  },[])
  return (
    <div>
      <h1 className={css.title}>
        {jobState == "success" ? <GiMusicalNotes /> : <FaUndoAlt />}
      </h1>
      <button className={css.button} onClick={goBackToSetter}>
        {jobState == "success" ? "再来一次" : "重新开始"}
      </button>
    </div>
  );
}

export default Final;
