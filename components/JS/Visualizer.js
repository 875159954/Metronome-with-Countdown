import css from "../UI/Visualizer.module.scss";
import { MyAudioContext } from "/components/ContextProvider";
import React, { useState, useContext, useEffect, useRef } from "react";

function rootMeanSquaredSignal(data) {
  let rms = 0;
  for (let i = 0; i < data.length; i++) {
    rms += data[i] * data[i];
  }
  return Math.sqrt(rms / data.length);
}
function Visualizer(props) {
  const [test, setTest] = useState(0);
  const idRef = useRef();

  const audioContext = useContext(MyAudioContext);
  function playmusic() {
    if (audioContext.isPlaying()) return;
    audioContext.playmusic(0);
    idRef.current = setInterval(() => {
      draw();
    }, 1000 / 60);
  }
  function stopmusic() {
    audioContext.stopmusic();
    clearInterval(idRef.current);
  }
  function draw() {
    const signals = audioContext.getData();
    const Canvas = document.getElementById("myCanvas"); // access the canvas object
    const CanvasContext = Canvas.getContext("2d"); // access the canvas context
    CanvasContext.clearRect(0, 0, Canvas.width, Canvas.height);

    if (signals == null) return;
    let i = 0;
    for (let { analyser, data, color } of signals) {
      analyser.getFloatTimeDomainData(data);
      const signal = rootMeanSquaredSignal(data);

    
      // Now do the real drawings:
      CanvasContext.fillStyle = color; // set the color to blue

      const height = signal * Canvas.height*10;

      const x = Canvas.width/signals.length *i;
      const y = Canvas.height;
      CanvasContext.fillRect(x, Canvas.height, Canvas.width/signals.length, -height);
      console.log(x, y, height);
      i++
    }
  }
  return (
    <div>
      <button onClick={playmusic}>play</button>
      <button onClick={stopmusic}>stop</button>
      <button onClick={draw}>test</button>
      <canvas id="myCanvas" width="220" height="190">
        {" "}
        Your browser still doesn't work!{" "}
      </canvas>
      <h1>{test}</h1>
    </div>
  );
}

export default Visualizer;