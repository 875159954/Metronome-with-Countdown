import css from "../UI/Metronome.module.scss";

import { useRef, useState, useEffect } from "react";
import { userAgent } from "next/server";

function Metronome(props) {
  const [bpm, setBpm] = useState(60);
  const [beatsPerMeasure, setbeatsPerMeasure] = useState(4);
  const [ticking, setTicking] = useState(false);
  const [controlId, setControlId] = useState(-1);
  const strongRef = useRef();
  const weakRef = useRef();
  const barsRef = useRef();

  function togglePlay() {
    setTicking(!ticking);
  }
  useEffect(function sideEffectofTicking() {
    const speed = 60000 / bpm;
    let counter = 0;
    let id = -1;
    if (ticking) {
      id = setInterval(() => {
        if (counter % beatsPerMeasure) weakRef.current.play();
        else strongRef.current.play();

        const bars = Array.from(barsRef.current.children);
        for (let i = 0; i < bars.length; i++){
          if(i==counter)  {
            bars[i].classList.add(css.currentBar);
            bars[i].style.setProperty('--sparkle-time', `${speed/1000}s`)
            console.log(bars[i].style.getPropertyValue('--sparkle-time'))
            
            }
          else bars[i].classList.remove(css.currentBar)
        }
        counter = (counter + 1) % beatsPerMeasure;
      }, speed);
    }
    return () => {
      clearInterval(id);
    };
  }, [ticking, bpm, beatsPerMeasure]);
  function changeBpm(e) {
    setBpm(Number(e.target.value));
  }
  function handleControl(e) {
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
    speedUp(300, setControlId, fn);
  }
  function stopChanging() {
    clearInterval(controlId);
  }
  function changeBeats() {
    setbeatsPerMeasure((pre) => {
      const next = (pre + 1) % 9;
      if (next == 0) return 1;
      return next;
    })
  }
  return (
    <div className={css.container}>
      <div className={css.screen}>
        <span className={css.depictor}>Allegro</span>  
        <span>{bpm}</span>
      <div className={css.bars} ref={barsRef}>
          {Array(beatsPerMeasure).fill(1).map((e, i) => <div key={i} className={css.bar} ></div>)}
      </div>
    </div>
      <div className={css.controls}>
        <audio src="./asset/strongbeat.wav" ref={strongRef}></audio>
        <audio src="./asset/weakbeat.wav" ref={weakRef}></audio>
        <button
          className={`${css.button} ${css.decrease}`}
          onPointerDown={handleControl}
          onPointerLeave={stopChanging}
          onPointerUp={stopChanging}
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
          onPointerLeave={stopChanging}
          onPointerUp={stopChanging}
        >
          +
        </button>
      </div>
 
      <button onPointerUp={changeBeats}>{ beatsPerMeasure}beats</button>
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

export default Metronome;
