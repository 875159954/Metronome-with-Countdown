import { useState, useEffect, useRef, useCallback } from "react";

function SoundMaker(props) {
  const { tempo, ticking } = props;

  const [audio, setAudio] = useState(null);
  const [bufferSource, setBufferSource] = useState(null);

  const changeSpeedDebounced = useCallback(
    debounce_leading(changeSpeed, 300),
    []
  );

  useEffect(
    function createAudioContext() {
      if (window == undefined || audio) return;
      setup();
      return function cleanup() {
        if (window == undefined || !audio) return;
        audio.close();
      };
    },
    [audio, bufferSource]
  );

  useEffect(() => {
    if (window == undefined || !audio || !bufferSource) return;
    changeSpeedDebounced(audio, bufferSource, tempo, ticking);
    return () => {
      if (window == undefined || !audio || !bufferSource) return;
      audio.suspend();
    };

    //audio and bufferSouce never change, there is no need to track them
    //eslint-disable-next-line
  }, [tempo, ticking]);

  function setup() {
    const audio = new (AudioContext || webkitAudioContext)();
    const buffer = audio.createBuffer(
      2,
      audio.sampleRate * 2,
      audio.sampleRate
    );
    const channel1 = buffer.getChannelData(0);
    const phase = 0; //
    const amplifier = 1; //Sound amplifier
    const duration_frames = audio.sampleRate / 50; // Time slice
    const pitchE = 370; // measure in Hz

    for (let i = 0; i < duration_frames; i++) {
      channel1[i] = Math.sin(phase) * amplifier;
      phase += (2 * Math.PI * pitchE) / audio.sampleRate;
      phase -= phase > 2 * Math.PI ? 2 * Math.PI : 0;
      amplifier -= 1 / duration_frames;
    }

    const ocurrence = tempo / 60; // n = speed (measure by seconds) / 60s
    const frequency = 1 / ocurrence; // f = 1/n

    const bufferSource = audio.createBufferSource();
    bufferSource.buffer = buffer;
    bufferSource.loop = true;
    bufferSource.loopEnd = frequency;
    bufferSource.connect(audio.destination);
    bufferSource.start(0);

    setAudio(audio);
    setBufferSource(bufferSource);
  }

  return <div>{`${tempo} ${ticking}  `}</div>;
}

function changeSpeed(audio, source, tempo, ticking) {
  if (ticking) audio.resume();
  source.loopEnd = (1 / tempo) * 60;
}

function debounce_leading(func, timeout = 300) {
  let timer;
  return (...args) => {
    if (!timer) {
      func.apply(this, args);
    }
    clearTimeout(timer);
    timer = setTimeout(() => {
      timer = undefined;
      func.apply(this, args);
    }, timeout);
  };
}
export default SoundMaker;
