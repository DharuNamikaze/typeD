import React from 'react'

const Context = ({currcontent, word, charIndex}) => {
  return (
    <div className="paragraph">
    {
      currcontent.split('').map((char,index) => (
        <span key={index} className={`char 
        ${index === charIndex ? 'active': ''} 
        ${word[index] === char ? 'correct': index < charIndex ? 'incorrect' : ''}`}>{char}</span>
      ))
    }
  </div>
  )
}

export default Context;