import { useState, useMemo } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const [currentWord, setCurrentWord] = useState(0);
  const words = ["Banaani", "Omena", "Olut", "Jäätelö"];
  const word = words[currentWord];

  const computeWord = (word) => {
    let i = 0;
    while (i < 1000000000) i++;
    return word.length;
  }

  // const wordLength = computeWord(word);
  const wordLength = useMemo(() => computeWord(word), [word]);

  return (
    <div className="App">
      <h3>Compute the length of the word {word}</h3>
      <p>Word length: {wordLength}</p>
      <button onClick={() => { 
        const next = currentWord + 1 === words.length ? 0 : currentWord + 1;
        setCurrentWord(next);
      }}>Next word</button>

      <h3>Increment counter</h3>
      <p>Counter: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

export default App;
