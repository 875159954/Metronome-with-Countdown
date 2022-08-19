import { useEffect, useCallback, useState, useRef } from "react";

function SoundMaker(props) {
  const { tempo, ticking, beatsPerMeasure } = props;
  useEffect(() => {
    let audio = null;
    if (!ticking) return;
    audio = new AudioContext();
    createBuffer(tempo, audio, 330);
    createBuffer(tempo / 4, audio, 370);
    audio.suspend();

    const id = setTimeout(() => {
      audio.resume();
    }, 60/tempo*1000); 
    return () => {
      clearInterval(id);
      if (audio) audio.close();
    };
  }, [tempo, ticking, beatsPerMeasure]);

  return <div>{`${tempo} ${ticking} ${beatsPerMeasure} ${test} `}</div>;
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
  bufferSource.start(0);
}
export default SoundMaker;
