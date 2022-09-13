
import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './App.css';

import Navbar from './components/Navbar';
import ShoppingForm from "./components/ShoppingForm";
import ShoppingList from './components/ShoppingList';

function App() {
  const [state, setState] = useState({
    list: [],
  });

  const [urlRequest, setUrlRequest] = useState({
    url: "",
    request: {},
    action: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      if(!urlRequest.url) {
        return;
      }
      let response = await fetch(urlRequest.url, urlRequest.request);
      if(response.ok) {
        switch(urlRequest.action) {
          case "addItem":
            getList();
            return;
          case "getList":
            let data = await response.json();
            setState({ ...state, list: data });
            return;
          default:
            return;
        }
      } else {
        switch(urlRequest.action) {
          case "addItem":
            console.log("Error: Server responded with status.", response.status);
            return;
          case "getList":
            console.log("Error: Server responded with status.", response.status);
            return;
          default:
            return;
        }
      }
    };
    fetchData();
  }, [urlRequest]);

  

  const addItem = (item) => {
    setUrlRequest({
      url: "http://localhost:3010/api/shopping",
      request: {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      },
      action: "addItem",
    });
  };

  const getList = () => {
    setUrlRequest({
      url: "http://localhost:3010/api/shopping",
      request: {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
      action: "getList",
    });
  }

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<ShoppingList list={state.list} />} />
        <Route path="/form" element={<ShoppingForm addItem={addItem} />} />
      </Routes>
    </div>
  );
}

export default App;
