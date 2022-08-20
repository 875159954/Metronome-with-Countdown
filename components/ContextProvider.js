import { useEffect, useRef, createContext, useState } from "react";
import React from "react";

export const MyAudioContext = createContext({
  audioContext: null,
  setAudioContext: function () {},
  playmusic: function (time) {},
  stopmusic: function () {},
  getData: function () {},
});

const frequencyBands = [
  { frequency: 55, color: "#D5B3E5" },
  { frequency: 110, color: "#7F3CAC" },
  { frequency: 220, color: "#22A722" },
  { frequency: 440, color: "#F1892A" },
  { frequency: 570, color: "#E84420" },
  { frequency: 960, color: "#F4CD00" },
  { frequency: 2000, color: "#3E58E2" },
  { frequency: 4000, color: "#F391C7" },
];

function ContextProvider(props) {
  const [audioContext, setAudioContext] = useState();
  const sourceRef = useRef();
  const musicBuffer = useRef();
  const dataRef = useRef();
  function getData() {
    return dataRef.current;
  }
  async function playmusic(time = 0) {
    if (sourceRef.current != null) return;
    const source = audioContext.createBufferSource(musicBuffer.current);
    source.buffer = musicBuffer.current;
    source.start(time + audioContext.currentTime);
    dataRef.current = initSignal(audioContext,source);

    source.connect(audioContext.destination);
    audioContext.resume();
    sourceRef.current = source;
  }
  function stopmusic() {
    if (sourceRef.current != null) {
      sourceRef.current.stop();
      sourceRef.current.disconnect();
      console.log(sourceRef.current);
      sourceRef.current = null;
    }
  }
  useEffect(() => {
    const audio = new AudioContext();
    setAudioContext(audio);
    fetchMusic(audio).then((data) => (musicBuffer.current = data));
    return () => {
      audio.close();
    };
  }, []);
  function isPlaying() {
    return sourceRef.current != null;
  }
  const context = {
    audioContext,
    setAudioContext,
    playmusic,
    stopmusic,
    getData,
    isPlaying,
  };
  return (
    <MyAudioContext.Provider value={context}>
      {props.children}
      <audio src="/metronome/asset/bgm.mp3" id="audio"></audio>
    </MyAudioContext.Provider>
  );
}
function initSignal(audioContext,source) {
  const signals = frequencyBands.map(({ frequency, color }) => {
    // Create an analyser
    const analyser = audioContext.createAnalyser();
    analyser.smoothingTimeConstant = 1;

    // Create FFT data
    const data = new Float32Array(analyser.fftSize);

    // Create a filter that will only allow a band of data
    // through
    const filter = audioContext.createBiquadFilter();
    filter.frequency.value = frequency;
    filter.Q.value = 1;
    filter.type = "bandpass";

    source.connect(filter);
    filter.connect(analyser);

    return {
      analyser,
      color,
      data,
      filter,
    };
  });
  return signals;
}
async function fetchMusic(audioContext) {
  const soundResponse = await fetch("/metronome/asset/bgm.mp3", {
    method: "GET",
    responseType: "arraybuffer",
    cache: "force-cache",
  });
  const soundArrayBuffer = await soundResponse.arrayBuffer();
  return await audioContext.decodeAudioData(soundArrayBuffer);
}

export default ContextProvider;
