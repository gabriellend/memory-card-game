import { useState, useRef } from 'react'
import './App.css'

function App() {
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const currentScoreRef = useRef(0);
  const bestScoreRef = useRef(0);

  return (
    <>
     <div className='header'>
      <div className='header-left'>
        <h1>Barbie Memory Card Game</h1>
        <h2>Win by clicking on all barbies only once - use that memory!</h2>
      </div>
      <div className='header-right'>
        <h3>Current score: {currentScore}</h3>
        <h3>Best score: {bestScore}</h3>
      </div>
     </div>
     <div className='game'></div>
    </>
  )
}

export default App
