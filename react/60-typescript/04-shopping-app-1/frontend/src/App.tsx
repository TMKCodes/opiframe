import React, { useState } from 'react';
import './App.css';
import ShoppingItem from './models/ShoppingItem';
import ShoppingForm from './components/ShoppingForm';
import ShoppingList from './components/ShoppingList';

interface State {
  list: ShoppingItem[];
  id: number;
}

function App() {
  
  const [state, setState] = useState<State>({ list: [], id: 100 });

  const addToList = (item: ShoppingItem): void => {
    setState({ ...state, list: [...state.list, item] });
  }

  const removeFromList = (id: number): void => {
    setState({ ...state, list: state.list.filter(item => item.id !== id) });
  }

  return (
    <div className="App">
      <h1>Shopping App with React Typescript</h1>
      <ShoppingForm addToList={addToList} />
      <ShoppingList list={state.list} removeFromList={removeFromList} />
    </div>
  );
}

export default App;
