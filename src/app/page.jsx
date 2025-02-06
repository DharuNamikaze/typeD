"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import content from "@components/content";
import React from "react";
import Context from "@components/Context";

const Page = () => {
  const maxTime = 60;
  const [ranIndex, setRanIndex] = useState(null);
  const [currcontent, setCurrContent] = useState(null);

  const [word, setWord] = useState("");
  const [charIndex, setCharIndex] = useState(0);
  const [time, setTime] = useState(maxTime);
  const [mistakes, setMistakes] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [acc, setAcc] = useState(0);

  const totalChar = useRef(0);
  const totalCorrectChar = useRef(0);
  const timer = useRef();

  useEffect(() => {
    if (ranIndex === null) {
      const index = Math.floor(Math.random() * content.length);
      setRanIndex(index);
      setCurrContent(content[index]);
    }
  }, [ranIndex]);

  useEffect(() => {
    if (time > 0 && timer.current) {
      timer.current = setTimeout(() => setTime(sec => sec - 1), 1000);
    }
    if (time <= 0) clearTimeout(timer.current);
  }, [time]);

  const callbackref = useCallback(inputEl => {
    if (inputEl) document.addEventListener("keydown", () => inputEl.focus());
  }, []);

  const handleInput = (e) => {
    const { value } = e.target;
    setWord(value);
    setCharIndex(value.length);

    const { mistakes, wpm } = testCalculator(currcontent, value);
    setMistakes(mistakes);
    setWpm(wpm);
    testAccuracy(value, currcontent);

    if (!timer.current) {
      timer.current = setTimeout(() => setTime(t => t - 1), 1000);
    }
  };

  const testCalculator = (originalValue, typedvalue) => {
    const mistakes = typedvalue.split('').reduce((acc, typedChar, index) => 
      typedChar !== originalValue[index] ? acc + 1 : acc, 0);
    const cpm = typedvalue.length - mistakes;
    const wpm = Math.floor(cpm / 5);
    return { mistakes, cpm, wpm };
  };

  function testAccuracy(value, content) {
    if (value.length > charIndex) {
      totalChar.current++;
      if (value[charIndex] === content[charIndex]) {
        totalCorrectChar.current++;
      }
      setAcc(Math.round((totalCorrectChar.current / totalChar.current) * 100));
    }
  }

  function handleReset() {
    setWord("");
    setCharIndex(0);
    setTime(maxTime);
    setMistakes(0);
    setWpm(0);
    setAcc(0);
    clearTimeout(timer.current);
    totalChar.current = 0;
    totalCorrectChar.current = 0;
    timer.current = undefined;
  }

  const handleRestart = () => {
    let ri;
    do {
      ri = Math.floor(Math.random() * content.length);
    } while (ri === ranIndex); 
  
    setRanIndex(ri);
    setCurrContent(content[ri]);
    handleReset();
  };

  if (currcontent === null) return <div>Loading...</div>;

  return (
    <div className="container">
      <div className="top-bar">
        <p>{time > 0 ? `${time}s` : "Time's up!"}</p>
        <p>WPM: {wpm}</p>
        <p>Accuracy: {acc}%</p>
      </div>

      <div className="text-frame">
        <Context currcontent={currcontent} word={word} charIndex={charIndex} />
      </div>

      <input
        type="text"
        className="hidden-input"
        value={word}
        onChange={handleInput}
        autoFocus
        ref={callbackref}
        disabled={time === 0}
      />

      {time === 0 && (
        <div className="overlay">
          <p>Time up! Press Restart to try again.</p>
        </div>
      )}

      <button className="restart-btn" onClick={handleRestart}>Restart</button>

      <div className="bottom-right-text"> made by dharun and beens </div>
    </div>
  );
};

export default Page;
