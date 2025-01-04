import React, {useEffect, useState} from 'react';
import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Game from './game/Game.jsx';
import fetchLetter from './utils/FetchLetter.js'

function App() {
  const [title, setTitle] = useState("The Wordler")
  const [count, setCount] = useState(16);
  const [letters, setLetters] = useState([]);

  const [clickedIndices, setClickedIndices] = useState([]);
  const [timeouts, setTimeouts] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const updateLetters = async () => {
      if (count > letters.length) {
        const newLetter = await fetchLetter(letters);
        setLetters((prevLetters) => [...prevLetters, newLetter]);
      } else if (count < letters.length) {
        setLetters((prevLetters) => prevLetters.slice(0, -1));
      }
    };
    updateLetters();
  }, [count, letters.length]);

  const handleStartClick = () => {
    navigate('/the-wordler/game');
  };

  const handleLetterClick = (letter, index) => {
    console.log(`Tile clicked: ${letter}`);

    if (clickedIndices.includes(index)) {
      setClickedIndices((clicked) => clicked.filter((i) => i !== index));
    }
    setClickedIndices((clicked) => [...clicked, index]);
    setTimeout(() => {
      setClickedIndices((clicked) => clicked.filter((i) => i !== index));
    }, 1000);
  };

  return (
    <Routes>
      <Route
        path="/the-wordler/"
        element={
          <div>
            <h1 className="font-semibold text-center mt-8">The Wordler</h1>
            <div className="card mt-8 text-center">
              <input
                type="range"
                min="8"
                max="24"
                value={count}
                onChange={(e) => setCount(Number(e.target.value))}
                className="w-52"
              />
              <output
                className="flex justify-center card__text text-sm text-gray-400">Tile Count: {count}</output>
            </div>

            <div className="flex flex-col items-center justify-center">
              <div
                className="flex flex-wrap max-w-[220px] justify-center gap-2"
              >
                {letters.map((letter, index) => (
                  <div
                    key={index}
                    className={`h-12 w-12 flex items-center justify-center border border-white bg-gray-800 text-white text-lg rounded-sm cursor-pointer 
                                hover:bg-gray-600 transition
                               ${clickedIndices.includes(index) ? 'flashing' : ''}`}
                    onClick={() => handleLetterClick(letter, index)}
                  >
                    {letter}
                  </div>
                ))}
              </div>
              <button className="mt-4" onClick={handleStartClick}>
                START
              </button>
            </div>
          </div>
        }
      />
      <Route path="/the-wordler/game" element={<Game/>}/>
    </Routes>
  );
}

export default App;