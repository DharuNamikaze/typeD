'use client'
import "./globals.css";
import { useCallback, useEffect, useState } from "react";
import content from "@components/content";
import React from 'react'
import './reset.css'
import Context from "@components/Context";

export default function Page() {
  const maxTime = 60; // max time can be changed
  const [currcontent, setCurrContent] = useState(content[ranIndex]);
  const [word, setWord] = useState('');
  const [charIndex, setCharIndex] = useState(0);
  const [time, setTime] = useState(maxTime);
  const [mistakes, setMistakes] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [cpm, setCpm] = useState(0);
  const [acc, setAcc] = useState(0); // accuracy
  
  useEffect(()=>{
    const ranIndex = Math.floor(Math.random() * content.length);
    setCurrContent(content[ranIndex]);
  },[]);
  
  const callbackref = useCallback(InputEvent => {
    if (InputEvent) {
      document.addEventListener("keydown", () => InputEvent.focus())
    }
  })
  
  const handleInput = (e) => {
    const { value } = e.target;
    setWord(value);
    setCharIndex(value.length);
    const result = testCalculator(currcontent, value);
  }

  const testCalculator = (originalValue, inputValue) => {
    // Your logic to calculate test results
  }

  return (
    <div className="tab">
      <div className="timer">
        {time > 0 ? (
          <>
            <p>{time}</p>
            <small>Seconds</small>
          </>
        ) : (
          <small className="">Time's up!</small>
        )}
      </div>

      <div className="square">
        <p>{wpm}</p>
        <small>Word/Min</small>
      </div>

      <div className="square">
        <p>{cpm}</p>
        <small>Char/Min</small>
      </div>

      <div className="square">
        <p>{mistakes}</p>
        <small>Mistakes</small>
      </div>

      <div className="square">
        <p>{acc}</p>
        <small>% Accuracy</small>
      </div>

      <input type="text" value={word} onChange={handleInput} ref={callbackref} style={{ opacity: 0 }} />
      <Context currcontent={currcontent} word={word} charIndex={charIndex} />
      <span className="restart">&#x27F3;</span>
    </div>
  );
}