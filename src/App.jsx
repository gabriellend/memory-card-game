import { useState, useRef, useEffect } from 'react';
import { getCats } from './api';
import { shuffleArray } from './utils';
import './App.css'
import Modal from './components/Modal';

function App() {
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const currentScoreRef = useRef(0);
  const bestScoreRef = useRef(0);
  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [clickedCatIds, setClickedCatIds] = useState([])
  const [outcome, setOutcome] = useState(null);

  useEffect(() => {
    // console.log("API:", import.meta.env.VITE_API_KEY)
    const fetchCats = async() => {
        try {
            const catData = await getCats();
            setCats(catData);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }
  
    fetchCats()
  }, []);

  const handleClick = (catID) => {
    if (!clickedCatIds.includes(catID)) {
      setClickedCatIds(ids => {
        const updatedIds = [...ids, catID];
        if (updatedIds.length === cats.length) {
          setOutcome('remembered')
        } else {
          randomizeCats(cats);
        }

        return updatedIds;
      });

      currentScoreRef.current = currentScoreRef.current + 1;
      setCurrentScore(currentScoreRef.current);

      if (bestScoreRef.current < currentScoreRef.current) {
        bestScoreRef.current = currentScoreRef.current;
        setBestScore(bestScoreRef.current);
      }
    } else {
      setOutcome('furrgot');
    }
  }

  const randomizeCats = (catsArray) => {
    const randomizedCats = shuffleArray(catsArray);
    setCats(randomizedCats);
  }

  const startNewGame = () => {
    currentScoreRef.current = 0;
    setCurrentScore(0);
    setOutcome(null);
    randomizeCats(cats);
    setClickedCatIds([]);
  }

  const endGame = () => {
    setOutcome(null);
  }

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
      {loading
        ? 
        <div className="loading-text">
            Loading
            <span className="dot">.</span>
            <span className="dot">.</span>
            <span className="dot">.</span>
          </div>
        : cats.length > 0
          ? cats.map(cat => (
            <div key={cat.id} className='cat-card' onClick={() => handleClick(cat.id)}>
              <div className='img-container'>
                <img src={cat.url} alt={cat.name} />
              </div>
              <p className='cat-name'>{cat.name}</p>
            </div>
          ))
          : <p>{`Sorry, couldn't fetch cats :(`}</p>
      }
      {outcome && (
        <Modal outcome={outcome} startNewGame={startNewGame} endGame={endGame}></Modal>
      )}
     </div>
    </>
  )
}

export default App
