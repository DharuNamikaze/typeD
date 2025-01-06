import React from 'react';

const TypingBox = ({ userInput, setUserInput }) => {
  return (
    <input
      type="text"
      value={userInput}
      onChange={(e) => setUserInput(e.target.value)}
      placeholder="Start typing here..."
      className="typing-box"
    />
  );
};

export default TypingBox;
