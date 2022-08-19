import css from "../UI/Metronome.module.scss";

import { useRef, useState, useEffect } from "react";
import SoundMaker from "./SoundMaker";
import useLongPress from "../../hooks/useLongPress";

function Metronome(props) {
  const [bpm, setBpm] = useState(60);
  const [beatsPerMeasure, setbeatsPerMeasure] = useState(4);
  const [ticking, setTicking] = useState(false);
  const button1 = useLongPress({
    down: changeBpm,
    up: stopChanging,
    interval: 300,
  });

  const barsRef = useRef();

  function togglePlay(e) {
    setTicking(!ticking);
  }
  useEffect(
    function sideEffectofTicking() {
      const speed = 60000 / bpm;
      let counter = 0;
      let id = -1;
      if (ticking) {
        id = setInterval(() => {
          const bars = Array.from(barsRef.current.children);
          barsRef.current.style.setProperty(
            "--sparkle-time",
            `${speed / 1000 + 0.1}s`
          );
          for (let i = 0; i < bars.length; i++) {
            if (i == counter) {
              bars[i].classList.add(css.currentBar);
              barsRef.current.replaceChild(bars[i], bars[i]);
            } else bars[i].classList.remove(css.currentBar);
          }
          counter = (counter + 1) % beatsPerMeasure;
        }, speed);
      }
      return () => {
        clearInterval(id);
      };
    },
    [ticking, bpm, beatsPerMeasure]
  );

  function changeBpm(e) {
    // if( /iPad|iPhone|iPod/.test(navigator.userAgent))
    //   setTicking(false);
    
    const isDecrease = e.target.innerText == "-";
    let boundary = 240,
      step = 1;
    if (isDecrease) {
      (boundary = 40), (step = -1);
    }
    setBpm((pre) => (pre == boundary ? pre : pre + step));
  }
  function stopChanging(e) {
  }
  function changeBeats(e) {
    setbeatsPerMeasure((pre) => (pre == 8 ? pre % 7 : pre + 1));
  }

  return (
    <div className={css.container}>
      <div className={css.screen}>
      
        <span className={css.depictor}>Allegro</span>
        <span>{bpm}</span>
        <div className={css.bars} ref={barsRef}>
          {Array(beatsPerMeasure)
            .fill(1)
            .map((e, i) => (
              <div key={i} className={css.bar}></div>
            ))}
        </div>
      </div>
      <div className={css.controls}>
        <button
          className={`${css.button} ${css.decrease}`}
          {...button1.handlers}
        >
          -
        </button>
        <button onPointerUp={togglePlay} className={css.player}>
          {ticking ? (
            <div className={css.square}></div>
          ) : (
            <div className={css.play}></div>
          )}
        </button>
        <button
          className={`${css.button} ${css.increase}`}
          {...button1.handlers}
        >
          +
        </button>
      </div>

      <button className={ css.beatsChanger}  onClick={changeBeats}>{beatsPerMeasure} Beats</button>
      <SoundMaker
        tempo={bpm}
        ticking={ticking}
        beatsPerMeasure={beatsPerMeasure}
      />
    </div>
  );
}

function clamp(val, min, max) {
  return Math.min(min, Math.max(max, val));
}
export default Metronome;
