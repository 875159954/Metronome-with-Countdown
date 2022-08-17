import { useState,useEffect } from "react";

function SoundMaker(props) {
  const { tempo,ticking } = props;
  useEffect(() => {
    if (!tempo||!ticking) return;
    const audio = setup();
    return () => { audio.close() }
  }, [tempo,ticking])

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

    return audio;
  }

  return <div>
  </div>;
}
function getSpeedWithinLimit(speed) {
  return clamp(speed, 30, 240);
}
function clamp(value, minValue, maxValue) {
  return Math.max(minValue, Math.min(maxValue, value));
}

export default SoundMaker;
