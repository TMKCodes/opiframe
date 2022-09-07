import { useState } from 'react';

const Game = (props) => {
  const [state, setState] = useState({
    guess: "",
    min: 0,
    max: 100,
    guesses: [],
  });

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let guess = parseInt(state.guess);
    if (guess === props.targetNumber) {
      props.endGame(props.playerName, state.guesses.length + 1);
    } else if (guess < state.min) {
      alert("Guess must be greater than " + state.min);
    } else if (guess > state.max) {
      alert("Guess must be less than " + state.max);
    } else if (guess < props.targetNumber) {
      setState({
        ...state,
        guess: "",
        min: guess,
        guesses: [...state.guesses, guess],
      });
    } else if (guess > props.targetNumber) {
      setState({
        ...state,
        guess: "",
        max: guess,
        guesses: [...state.guesses, guess],
      });
    }
  };

  return (
    <div className="game">
      <h2>Guess a number between {state.min} and {state.max}</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="guess">Enter your guess: </label>
        <input type="number" name="guess" value={state.guess} onChange={handleChange} />
        <button type="submit">Guess</button>
      </form>
      <p>{state.result}</p>
      <p>Guesses: {state.guesses.join(", ")}</p>
      <button onClick={() => props.endGame(props.playerName, state.guesses.length)}>End Game</button>
    </div>
  );
};

export default Game;