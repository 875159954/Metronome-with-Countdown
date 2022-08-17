import css from "../UI/Metronome.module.scss";

import { useRef, useState, useEffect } from "react";
import SoundMaker from "./SoundMaker";

function Metronome(props) {
  const [bpm, setBpm] = useState(60);
  const [beatsPerMeasure, setbeatsPerMeasure] = useState(4);
  const [ticking, setTicking] = useState(false);
  const [controlId, setControlId] = useState(-1);
  const barsRef = useRef();

  function togglePlay(e) {
    e.preventDefault();
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
          for (let i = 0; i < bars.length; i++) {
            if (i == counter) {
              bars[i].classList.add(css.currentBar);
              bars[i].style.setProperty("--sparkle-time", `${speed / 1000}s`);
              console.log(bars[i].style.getPropertyValue("--sparkle-time"));
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
    setBpm(Number(e.target.value));
  }
  function handleControl(e) {
    clearInterval(controlId);
    const isDecrease = e.target.innerText == "-";
    let boundary = 240,
      step = 1;
    if (isDecrease) {
      (boundary = 40), (step = -1);
    }
    const fn = () => {
      setBpm((pre) => (pre == boundary ? pre : pre + step));
    };
    fn();
    speedUp(200, setControlId, fn);
  }
  function stopChanging(e) {
    clearInterval(controlId);
    setBpm((pre) => pre);
  }
  function changeBeats() {
    setbeatsPerMeasure((pre) => {
      const next = (pre + 1) % 9;
      if (next == 0) return 1;
      return next;
    });
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
          onPointerDown={handleControl}
          onPointerCancel={stopChanging}
          onPointerUp={stopChanging}
          onPointerOut={stopChanging}
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
          onPointerDown={handleControl}
          onPointerCancel={stopChanging}
          onPointerUp={stopChanging}
          onPointerOut={stopChanging}
        >
          +
        </button>
      </div>

      <button onPointerUp={changeBeats}>{beatsPerMeasure}beats</button>
      <SoundMaker tempo={bpm} ticking={ticking} />
    </div>
  );
}
function speedUp(interval, setId, callback) {
  interval = interval < 20 ? 20 : interval;
  setId(
    setTimeout(() => {
      callback();
      speedUp(interval / 1.3, setId, callback);
    }, interval)
  );
}
function getSpeedWithinLimit(speed) {
  return clamp(speed, 30, 240);
}
function clamp(value, minValue, maxValue) {
  return Math.max(minValue, Math.min(maxValue, value));
}
export default Metronome;
