import React from 'react';
import './App.css';

import LoginPage from './components/LoginPage';
import Navbar from './components/Navbar';
import ShoppingForm from './components/ShoppingForm';
import ShoppingList from './components/ShoppingList';

// import react router dom
import { BrowserRouter, Routes, Route } from 'react-router-dom';
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<ShoppingList />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/add" element={<ShoppingForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
