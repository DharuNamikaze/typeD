'use client'
import "./globals.css";
import { useCallback, useEffect, useRef, useState } from "react";
import content from "@components/content";
import React from 'react'
import './reset.css'
import Context from "@components/Context";

export default function Page() {
  const maxTime = 60; // max time can be changed
  const [currcontent, setCurrContent] = useState('');
  const [word, setWord] = useState('');
  const [charIndex, setCharIndex] = useState(0);
  const [time, setTime] = useState(maxTime);
  const [mistakes, setMistakes] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [cpm, setCpm] = useState(0);
  const [acc, setAcc] = useState(0); // accuracy

  const totalChar = useRef(0)
  useEffect(() => {
    const ranIndex = Math.floor(Math.random() * content.length);
    setCurrContent(content[ranIndex]);
  }, []);

  const callbackref = useCallback(InputEvent => {
    if (InputEvent) {
      document.addEventListener("keydown", () => InputEvent.focus())
    }
  }, []);

  const handleInput = (e) => {
    const { value } = e.target;
    setWord(value);
    setCharIndex(value.length);

    const { mistakes, wpm } = testCalculator(currcontent, value);

    setMistakes(mistakes)
    setWpm(wpm)
    testAccuracy(value)
  }

  const testCalculator = (originalValue, typedvalue) => {

    const mistakes = typedvalue.split('').reduce((acc, typedChar, index) => {
      return typedChar !== originalValue[index] ? acc + 1 : acc
    }, 0)

    const cpm = typedvalue.length - mistakes

    // im dont display cpm cus nobody cares

    const wpm = Math.floor(cpm / 5); //1wpm = 5cpm

    return { mistakes, cpm, wpm }
  }

  function testAccuracy(value) {
    if (value.length > charIndex) {
      totalChar.current+=1
      console.log(totalChar)
    }
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
        {/* 
      <div className="square">
        <p>{cpm}</p>
        <small>Char/Min</small>
      </div> */}

        <div className="square">
          <p>{mistakes}</p>
          <small>Mistakes</small>
        </div>

        <div className="square">
          <p>{acc}</p>
          <small>% Accuracy</small>
        </div>

        <input type="text" value={word} onChange={handleInput} autoFocus ref={callbackref} style={{ opacity: 0 }} />
        <Context currcontent={currcontent} word={word} charIndex={charIndex} />
        <span className="restart">&#x27F3;</span>
      </div>
    );
  }