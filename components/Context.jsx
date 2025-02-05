import React from "react";

const Context = React.memo(({ currcontent = "", word = "", charIndex = 0 }) => {
  console.log("Render Check", currcontent);
  
  return (
    <div className="paragraph">
      {currcontent ? (
        currcontent.split("").map((char, index) => (
          <span key={index} className={`char 
            ${index === charIndex ? "active" : ""} 
            ${word[index] === char ? "correct" : index < charIndex ? "incorrect" : ""}`}>
            {char}
          </span>
        ))
      ) : (
        <span>No content available</span>
      )}
    </div>
  );
});

Context.displayName = "Context";

export default Context;
