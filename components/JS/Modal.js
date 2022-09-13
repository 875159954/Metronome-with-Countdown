import css from "../UI/Modal.module.scss";

import React, { useEffect, useRef, useState } from "react";

export default function Modal(props) {
  const { toggleModal, setBpm, previousValue } = props;
  const [inputNumber, setInputNumber] = useState(Number(previousValue));
  const inputRef = useRef();
  function cancel(e) {
    e.preventDefault();
    e.stopPropagation();
    toggleModal();
  }
  function submitInput(e) {
    e.stopPropagation();
    e.preventDefault();
    setBpm(clamp(inputNumber, 40, 240));
    toggleModal();
  }
  function handleKeyPress(e) {
    if (e.key == "Escape") {
      toggleModal();
    }
  }
  useEffect(function autoSelect() {
    if (inputRef.current) {
      inputRef.current.select();
    }
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);
  return (
    <div className={css.backdrop} onMouseDown={cancel}>
      <form onSubmit={submitInput} className={css.inputModal}>
        <input
          id="input"
          maxLength={Number(3)}
          ref={inputRef}
          autoFocus={true}
          type="number"
          value={inputNumber}
          onChange={(e) => {
            const nextValue = e.target.value;
            if (nextValue > 999) return;
            setInputNumber(e.target.value);
          }}
          onMouseDown={(e) => {
            e.stopPropagation();
          }}
          onClick={(e) => {
            e.stopPropagation();
            e.target.select();
          }}
        />
        <button
          onMouseDown={(e) => {
            e.stopPropagation();
          }}
          onClick={submitInput}
        >
          确定
        </button>
      </form>
    </div>
  );
}
function clamp(val, min, max) {
  return Math.max(min, Math.min(max, val));
}
