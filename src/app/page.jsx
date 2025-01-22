'use client'
import "./globals.css";
import { useEffect, useState } from "react";
import Results from "@components/Results.jsx";
import Timer from "@components/Timer.jsx";
import TypingBox from "@components/TypingBox.jsx";
import WordDisplay from "@components/WordDisplay.jsx";
import content from "@components/content";
import React from 'react'
import './reset.css'

const ranIndex = Math.floor(Math.random() * content.length);
const handlechange = (e) => {
  const { value } = e.target;
}
export default function Page() {
  const maxTime = 60; // maxi time can be changed
  const [currcontent, setCurrContent] = useState(content[ranIndex]);
  const [words, setWords] = useState('');
  const [charIndex, setCharIndex] = useState(0);
  const [time, setTime] = useState(maxTime);
  const [mistakes, setMistakes] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [cpm, setCpm] = useState(0);
  const [acc, setAcc] = useState(0); // accuracy da

    return (
      <>
        <div className="App">
          <h2 className="text-center font-bold">Typing Test</h2>

          <div className="tab">
          <div className="timer">
            {
              time > 0 ? 
              <>
              <p>{time}</p>
              <small>Seconds</small></>
              :
              <p>Time's up!</p>
            }
          </div>
        
          <div className="square">
            <p>{wpm}</p>
            <small> Word&#47;Min</small>
          </div>

          <div className="square">
            <p>{cpm}</p>
            <small> Char&#47;Min</small>
          </div>

          <div className="square">
            <p>{mistakes}</p>
            <small>Mistakes</small>
          </div>

          <div className="square">
            <p>{acc}</p>
            <small>% Accuracy</small>
            </div>
            
          <input type="text" value={words} onChange={handlechange} autoFocus/>

          <div className="paragraph">
            {
            console.log(currcontent.split(''))
            }
          </div>
</div>
          <span className="restart">&#x27F3;</span>
          {/* <div className="typing-test m-10 ">
            {!isActive ? (
              <button onClick={handleActive} className="flex bg-white text-black mx-10 px-5 py-2 rounded-full hover:text-white hover:bg-black">Start Test</button>
            ) : (
              <div className="typing-contents flex flex-wrap justify-center">
                <Timer TimeLeft={TimeLeft} setTimeLeft={setTimeLeft} />
                <WordDisplay words={words} />
                <div className="m-10 bg-cyan-200">
                  <TypingBox />
                </div>
                <Results />
              </div>
            )}
          </div> */}
        </div>


      </>
    );
  }