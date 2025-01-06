import React from 'react';

const WordDisplay = ({ words }) => {
  return (
    <div className="word-display">
      {words.map((word, index) => (
        <span key={index} className="word">{word}</span>
      ))}
    </div>
  );
};

export default WordDisplay;