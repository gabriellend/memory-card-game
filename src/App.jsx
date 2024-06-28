import { useState, useRef } from 'react';
import { useCats } from './hooks';
import './App.css'

function App() {
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const currentScoreRef = useRef(0);
  const bestScoreRef = useRef(0);
  const {cats, loading, error} = useCats();

  return (
    <>
     <div className='header'>
      <div className='header-left'>
        <h1>Cat Memory Card Game</h1>
        <h2>Win by clicking on all cats only once - don't furrrget!</h2>
      </div>
      <div className='header-right'>
        <h3>Current score: {currentScore}</h3>
        <h3>Best score: {bestScore}</h3>
      </div>
     </div>
     <div className='game'>
      {cats.length > 0
        ? cats.map(cat => (
          <div key={cat.id} className='cat-card'>
            <div className='img-container'>
              <img src={cat.url} alt={cat.name} />
            </div>
            <p className='cat-name'>{cat.name}</p>
          </div>
        ))
        : <div className="loading-text">
            Loading
            <span className="dot">.</span>
            <span className="dot">.</span>
            <span className="dot">.</span>
          </div>
      }
     </div>
    </>
  )
}

export default App
