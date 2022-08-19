import { useRef } from "react";

export default function useLongPress({down,up,interval}){
  const timerId = useRef();

  function speedUp(interval,e) {
    interval = interval < 20 ? 20 : interval;
    return setTimeout(() => {
      down(e);
      timerId.current = speedUp(interval / 1.3,e);
    }, interval)
  }
  function handlePointerDown(e) {
    e.preventDefault();
    down(e);
    timerId.current= speedUp(interval,e)
  }
  function handlePointerUp(e) {
    e.preventDefault();
    clearInterval(timerId.current);
    up(e);
  }

  return {
    handlers: {
      onPointerDown: handlePointerDown,
      onPointerUp:handlePointerUp,
      onPointerCancel:handlePointerUp,
      onPointerLeave:handlePointerUp,
    }
  }

}