import React, { useEffect } from 'react'

const Timer = ({TimeLeft,setTimeLeft}) => {
    useEffect(()=>{

        if (TimeLeft>0) {
            const timer = setInterval(()=> setTimeLeft(prev => TimeLeft-1),1000);
            return ()=> clearInterval(timer)
        }
    },[TimeLeft])
  return (
    <div className="" >

    </div>
  )
}

export default Timer