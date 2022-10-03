import React, { useState } from 'react';
import './App.css';
import ShoppingItem from './models/ShoppingItem';

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
      
    </div>
  );
}

export default App;
