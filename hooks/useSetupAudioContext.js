import { useEffect, useRef, useState } from "react";

async function fetchMusic(audioContext) {
  const soundResponse = await fetch("/metronome/asset/bgm.mp3", {
    method: "GET",
    responseType: "arraybuffer",
    cache: "force-cache",
  });
  const soundArrayBuffer = await soundResponse.arrayBuffer();
  return await audioContext.decodeAudioData(soundArrayBuffer);
}

export default function useSetupAudioContext() {
  const [audioContext, setAudioContext] = useState(null);
  const [gain, setGain] = useState(null);
  const musicBuffer = useRef();

  const [load, setLoad] = useState(false);
  useEffect(() => {
    const audio = new AudioContext();
    const gain = audio.createGain();
    gain.connect(audio.destination);
    setAudioContext(audio);
    setGain(gain);
    if (!load) {
      fetchMusic(audio).then((data) => (musicBuffer.current = data));
      setLoad(true);
    }
    return () => {
      audio.close();
    };
  }, []);

  return [audioContext, gain, musicBuffer];
}
