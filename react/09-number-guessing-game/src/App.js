import { useState } from 'react';
import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import './App.css';
import Home from './pages/Home';
import Game from './pages/Game';
import Won from './pages/Won';

function App() {
  const [state, setState] = useState({
    playerName: "",
    targetNumber: 0,
    topList: [
      { playerName: "I'm bad player", result: 9 },
      { playerName: "I'm semi good.", result: 6 },
      { playerName: "I'm epic player.", result: 1 },
    ],
  });

  const navigate = useNavigate();

  const startGame = (playerName) => {
    if(!playerName) {
      alert("Please enter your name");
      return;
    }
    setState({
      ...state,
      playerName: playerName,
      targetNumber: Math.floor(Math.random() * 100) + 1,
    });
    navigate("/game");
  };

  const endGame = (playerName, result, win) => {
    if(win !== "win") {
      navigate("/");
      return;
    }
    setState({
      ...state,
      playerName: "",
      targetNumber: 0,
      topList: [...state.topList, { playerName, result }],
    });
    navigate("/won");
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home topList={state.topList} startGame={startGame}/>} />
        <Route path="/game" element={<Game endGame={endGame} playerName={state.playerName} targetNumber={state.targetNumber} />} />
        <Route path="/won" element={<Won />} />
      </Routes>
    </div>
  );
}

export default App;
