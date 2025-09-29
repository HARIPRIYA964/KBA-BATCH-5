import React, { useEffect,useState } from 'react'

const IncrementButton = ({startNumber,incrementNumber}) => {
    const [count,setCount] = useState(startNumber)
    const [heading,setHeading] = useState("Hello World")

    useEffect(()=>{
        console.log('Useeffect is called!','count is',count)
    },[count])
  return (
    <button onClick={() => {setCount((count) => count + incrementNumber )
        setHeading("New Heading")}
    }>
        count is {count} 
        {heading}
  

  </button>
  )
}

export default IncrementButton
