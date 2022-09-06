import './App.css';
import useCount from './hooks/usecount';

function App() {
  const [count, increment, decrement, reset] = useCount(10);
  return (
    <div className="App">
      <h2>Value: { count }</h2>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}

export default App;
