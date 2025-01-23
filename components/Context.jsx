import React from 'react'

const Context = React.memo(({currcontent, word, charIndex}) => {
  console.log("Render Check")
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
})

Context.displayName='Context';

export default Context;