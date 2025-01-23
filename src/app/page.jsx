'use client'
import "./globals.css";
import { useCallback, useEffect, useRef, useState } from "react";
import content from "@components/content";
import React from 'react'
import Context from "@components/Context";

let ranIndex = Math.floor(Math.random() * content.length);

const Page= ()=> {
  const maxTime = 5; // max time can be changed
  const [currcontent, setCurrContent] = useState(content[ranIndex]);
  const [word, setWord] = useState('');
  const [charIndex, setCharIndex] = useState(0);
  const [time, setTime] = useState(maxTime);
  const [mistakes, setMistakes] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [cpm, setCpm] = useState(0);
  const [acc, setAcc] = useState(0); // accuracy

  const totalChar = useRef(0)
  const totalCorrectChar = useRef(0)
  const timer = useRef();

  useEffect(() => {
    if (timer.current && time > 0) {
      timer.current = setTimeout(() => setTime(sec => sec - 1), 1000)
    }// if timer.current is true means 1 and time > 0 that means if seconds are available
    // settimeout (()=> setTime(prevsec => prevsec -1), 1000 1s ku one time prevsec -1 agite irukum so that i can have a time)

    if (timer <= 0 && value.length > content.length)
      clearTimeout(timer.current);
    return;
  }, [time])

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
    testAccuracy(value, currcontent)

    if (!timer.current) {
      timer.current = setTimeout(
        () => setTime(t => t - 1), 1000)
    }
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

  function testAccuracy(value, content) {
    if (value.length > charIndex) {
      totalChar.current++;
      if (value[charIndex] === content[charIndex]) {
        totalCorrectChar.current++;
      }
      setAcc(Math.round(totalCorrectChar.current / totalChar.current * 100))
    }
  }
  
  const handleTryAgain = () => {
    if (time > 0)return;
    handleReset()
  }

  function handleReset() {

    setWord(''); // typing word
    setCharIndex(0); // character index of typed value
    setTime(maxTime); //
    setMistakes(0);
    setWpm(0);
    setCpm(0);
    setAcc(0); // reset by setting 0 to all when clicked
    clearTimeout(timer.current)

    totalChar.current = 0;
    totalCorrectChar.current = 0;
    timer.current = undefined;

  }

  const handleRestart=()=>{
    let ri = Math.floor(Math.random() * content.length);

    if(ri!==ranIndex){
      ranIndex = ri
      setCurrContent(content[ri])
      handleReset()
    } else {
      handleRestart()
    }
  }
  return (
    <div className="tab">
      <div className="timer" onClick={handleTryAgain}>
        {time > 0 ? (
          <>
            <p>{time}</p>
            <small>Seconds</small>
          </>
        ) : (
          <small className="">Tim&apos;s up&#33;</small>
        )}
      </div>

      <div className="square">
        <p>{wpm}</p>
        <small>Word/Min</small>
      </div>
      
      {/* <div className="square">
        <p>{cpm}</p>
        <small>Char/Min</small>
      </div>
       */}
      

      <div className="square">
        <p>{mistakes}</p>
        <small>Mistakes</small>
      </div>


      <div className="square">
        <p>{acc}</p>
        <small>&#37; Accuracy</small>
      </div>
      <input type="text" className="in" value={word} onChange={handleInput} autoFocus ref={callbackref} style={{ opacity: 0 }} disabled={time===0}/>

      {time > 0 ? (
        <Context currcontent={currcontent} word={word} charIndex={charIndex} />
           ) : (
            <>
        <div className="timeup rounded-xl bg-violet-800 text-white p-10 flex flex-wrap">Time&apos;s up&#33; Click the restart button to try again.</div>
            </>
      )}

      <span className="restart" onClick={handleRestart}>&#x27F3;</span>
    </div>
  );
}
export default Page; 