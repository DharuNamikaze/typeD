'use client'
import "../app/globals.css";
import { useEffect, useState } from "react";
import Results from "@components/Results.jsx";
import Timer from "@components/Timer.jsx";
import TypingBox from "@components/TypingBox.jsx";
import WordDisplay from "@components/WordDisplay.jsx";
import React from 'react'
import './reset.css'

export default function Page(){
  const [words, setWords] = useState([]);
  const [UserInput, setUserInput] = useState('');
  const [TimeLeft, setTimeLeft] = useState(60);
  const [isActive, setIsActive] = useState(false);
  
  useEffect(()=>{
    const randomwords=["start ","typing ","test ","and ","check ","your ","results "]
    setWords(randomwords);
  },[]);

  const handleActive = ()=>{
    setIsActive(!false);
  }

  return (
    <div className="typing-test">
      {!isActive ? (
        <button onClick={handleActive} className="flex bg-white text-black mx-10 px-5 py-2 rounded-full hover:text-white hover:bg-black">Start Test</button>
      ) : (
        <div className="typing-contents flex flex-wrap justify-center">
        <Timer TimeLeft={TimeLeft} setTimeLeft={setTimeLeft} />
        <WordDisplay words={words} />
        <TypingBox UserInput={UserInput} setUserInput={setUserInput} />
        <Results />
        </div>
      )}
    </div>
  );
}