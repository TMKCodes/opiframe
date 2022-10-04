import React, { useState } from 'react';
import './App.css';
import ShoppingItem from './models/ShoppingItem';
import ShoppingForm from './components/ShoppingForm';
import ShoppingList from './components/ShoppingList';
import { useAction } from './hooks/useAction';

interface State {
  list: ShoppingItem[];
  id: number;
}

function App() {

  const [list, loading, addToList, removeFromList] = useAction();

  return (
    <div className="App">
      <h1>{ loading ? 'Loading...' : 'Shopping List' }</h1>
      <ShoppingForm addToList={addToList} />
      <ShoppingList list={list} removeFromList={removeFromList} />
    </div>
  );
}

export default App;
