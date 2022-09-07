import { useState } from 'react';

const Home = (props) => {
  const [state, setState] = useState({
    playerName: "",
  });

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  props.topList.sort((a, b) => a.result - b.result);

  let topList = props.topList.map((item, index) => {
    return (
      <li key={index}>
        Player: { item.playerName } - { item.result } guesses.
      </li>
    );
  });

  return (
    <div>
      <h2>Welcome to number guessing game!</h2>
      <p>Guess a number between 1 and 100 with least amount of guesses.</p>
      <label htmlFor="playerName">Enter your name: </label>
      <input type="text" name="playerName" value={state.playerName} onChange={handleChange} />
      <button onClick={() => props.startGame(state.playerName)}>Start Game</button>
      <h3>Top List</h3>
      <ul style={{ listStyleType : "decimal"}}>
        { topList }
      </ul>
    </div>
  );
};

export default Home;