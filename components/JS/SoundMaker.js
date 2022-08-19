import { useEffect, useCallback, useState, useRef } from "react";

function SoundMaker(props) {
  const { tempo, ticking, beatsPerMeasure } = props;
  const audio = useRef();

  useEffect(() => {
    if (!ticking) return;
    if (!audio.current) {
      audio.current = new AudioContext();
    }
    audio.current.resume();

    const s1 = createBuffer(tempo, audio.current, 330);
    const s2 = createBuffer(tempo / beatsPerMeasure, audio.current, 370);
    s1.start(audio.current.currentTime + 60 / tempo);
    s2.start(audio.current.currentTime + 60 / tempo);
    
    return () => {
      if (s1 || s2) {
        s1.disconnect()
        s2.disconnect();
      }
    }
  }, [tempo, ticking, beatsPerMeasure]);

  return <div>{`${tempo} ${ticking} ${beatsPerMeasure}  `}</div>;
}

function createBuffer(tempo, audio, pitch) {
  console.log("buffer");
  const buffer = audio.createBuffer(1, audio.sampleRate * 12, audio.sampleRate);
  const channel = buffer.getChannelData(0);
  let phase = 0; //
  let amplitude = 1; //Sound amplitude
  const duration_frames = audio.sampleRate / 50; // Time slice

  for (let i = 0; i < duration_frames; i++) {
    channel[i] = Math.sin(phase) * amplitude;
    phase = phase + (2 * Math.PI * pitch) / audio.sampleRate;
    phase -= phase > 2 * Math.PI ? 2 * Math.PI : 0;
    amplitude -= 1 / duration_frames;
  }

  const ocurrence = tempo / 60; // n = speed (measure by seconds) / 60s
  const frequency = 1 / ocurrence; // f = 1/n

  const bufferSource = audio.createBufferSource();
  bufferSource.buffer = buffer;
  bufferSource.loop = true;
  bufferSource.loopEnd = frequency;
  bufferSource.connect(audio.destination);
  // bufferSource.start(audio.currentTime + 60 / tempo);

  return bufferSource;
}
export default SoundMaker;
