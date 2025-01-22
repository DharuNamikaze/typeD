import React, { useState } from 'react';

const TypingBox = () => {
  const inputArray = ["Muruga", "Amma", "adapter", "Console", "Javascript", "sat", "Help", "Philosophy"];
  const [targetWord, setTargetWord] = useState(inputArray[Math.floor(Math.random() * inputArray.length)]);
  const [userInput, setUserInput] = useState("");

  const handleInput = (e) => {
    setUserInput(e.target.value);
  };

  const getStyledUserInput = () => {
    return userInput.split('').map((char, index) => {
      const color = char === targetWord[index] ? 'green' : 'red';
      return (
        <span key={index} style={{ color }}>
          {char}
        </span>
      );
    });
  };

  return (
    <div>
      <div>{getStyledUserInput()}</div>
      <input
        type="text"
        value={userInput}
        onChange={handleInput}
      />
    </div>
  );
};

export default TypingBox;