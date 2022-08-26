import css from "../UI/MuteButton.module.scss";
import { MyAudioContext } from "/components/JS/ContextProvider";
import { BsBell, BsBellSlash } from "react-icons/bs";
import { useContext,useRef} from "react";

function MuteButton(props) {
  const context = useContext(MyAudioContext);
  const button = useRef();
  function handleClick() {
    context.toggleMute();
    let cur = button.current;
    if(context.isMute())
      cur.parentElement.replaceChild(cur, cur);
  }
  return (
    <button ref={button} className={css.muteButton} onClick={handleClick}>
      {context.isMute() ? <BsBellSlash /> : <BsBell />}
    </button>
  );
}

export default MuteButton;
