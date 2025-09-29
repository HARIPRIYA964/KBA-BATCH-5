import { useState } from 'react'

import './App.css'
import Logos from './Components/Logos'
function App() {
  const [count, setCount] = useState(0)
const [countNew,setCountNew] = useState(0)
const [liked,setLiked] = useState(false)
const toggleLike = ()=>{
  setLiked(!liked)
}
  return (
    <>
    <Logos />
    <Logos />
      <h1>Vite + React</h1>
      <div className="card">
     
        <button onClick={() => setCountNew((count) => count + 10)}>
          count is {countNew}
        </button>
        <button onClick={toggleLike}>
         {liked ? 'Like': 'dislike' }
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
