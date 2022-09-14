import css from "../UI/Metronome.module.scss";

import { useRef, useState, useEffect } from "react";
import SoundMaker from "./SoundMaker";
import useLongPress from "../../hooks/useLongPress";
import Modal from "./Modal";

function Metronome(props) {
  const [bpm, setBpm] = useState(60);
  const [speedInfo, setSpeedInfo] = useState("Adagio");
  const [beatsPerMeasure, setBeatsPerMeasure] = useState(4);
  const [ticking, setTicking] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const controlButton = useLongPress({
    down: changeBpm,
    up: stopChanging,
    interval: 300,
  });

  const barsRef = useRef();

  function togglePlay(e) {
    setTicking((pre) => !pre);
  }
  useEffect(() => {
    let nextInfo = findFirstLess(bpm);
    setSpeedInfo(nextInfo);
  }, [bpm]);
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
    const isDecrease =
      e.key == "ArrowLeft" || e.key == "ArrowDown" || e.target.innerText == "-";
    const step = isDecrease ? -1 : 1;
    setBpm((pre) => clamp(pre + step, 40, 240));
  }
  function stopChanging(e) {}
  function changeBeats(e) {
    setBeatsPerMeasure((pre) => (pre == 8 ? pre % 7 : pre + 1));
  }
  function toggleModal() {
    setShowModal(!showModal);
  }
  function handleKeyPress(e) {
    if (ArrowKeys.includes(e.key)) {
      changeBpm(e);
    }
    console.log("down");
  }
  function handleKeyUp(e) {
    if (e.key == "`" || e.key == "-") {
      toggleModal();
    } else if (e.key == " ") {
      togglePlay();
    }
    console.log("up");
  }
  useEffect(function autoSelect() {
    document.addEventListener("keydown", handleKeyPress);
    document.addEventListener("keyup", handleKeyUp);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, []);
  return (
    <div className={css.container}>
      <div className={css.screen} onClick={toggleModal}>
        <span className={css.depictor}>{speedInfo}</span>
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
          {...controlButton.handlers}
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
          {...controlButton.handlers}
        >
          +
        </button>
      </div>

      <button className={css.beatsChanger} onClick={changeBeats}>
        {beatsPerMeasure} Beats
      </button>
      <SoundMaker
        tempo={bpm}
        ticking={ticking}
        beatsPerMeasure={beatsPerMeasure}
      />
      {showModal ? (
        <Modal
          title="输入节拍数"
          toggleModal={toggleModal}
          setBpm={setBpm}
          previousValue={bpm}
        />
      ) : (
        <></>
      )}
    </div>
  );
}
export default Metronome;

function clamp(val, min, max) {
  return Math.max(min, Math.min(max, val));
}
const speedSheet = {
  Prestissimo: 178,
  Presto: 168,
  Allegrissimo: 151,
  Vivacissimo: 141,
  Vivace: 133,
  Allegro: 110,
  Allegretto: 98,
  Moderato: 86,
  Andantino: 78,
  Andante: 73,
  "Andante moderato": 70,
  Adagietto: 66,
  Adagio: 56,
  Larghetto: 51,
  Largo: 46,
  Lento: 41,
  Grave: 20,
};
function findFirstLess(speed) {
  let keys = Object.keys(speedSheet);
  let i = 0,
    j = keys.length - 1;
  while (i < j) {
    let m = (i + j) >> 1;
    if (speedSheet[keys[m]] <= speed) j = m;
    else i = m + 1;
  }
  return keys[i];
}
var ArrowKeys = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
