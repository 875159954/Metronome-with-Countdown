import { useState, useEffect, useRef,useCallback} from "react";

function SoundMaker(props) {
  const { tempo, ticking } = props;
  const [state, setState] = useState(0);
  const changeSpeedDebounced = useCallback(debounce_leading(changeSpeed, 300), []);
  
  let bufferSourceRef = useRef();
  let audioRef = useRef();

  useEffect(() => {
    if (!audioRef.current) setup();
  }, []);
  useEffect(() => {
    if (!tempo  ||!ticking|| !audioRef.current||!bufferSourceRef.current) return;
    changeSpeedDebounced(audioRef.current,bufferSourceRef.current,tempo);
    return () => {
      if (audioRef.current) audioRef.current.suspend();
    };
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

    audioRef.current = audio;
    bufferSourceRef.current = bufferSource;
  }

  return <div>{`${tempo} ${ticking} ${state} `}</div>;
}

function changeSpeed(audio,source,tempo) {
  audio.resume();
  source.loopEnd = (1 / tempo) * 60;
  console.log(audio,source);
}

function debounce_leading(func, timeout = 300){
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
