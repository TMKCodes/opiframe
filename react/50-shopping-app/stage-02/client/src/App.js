import React from "react";
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
    getList();
  }, []);

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
          case "deleteItem":
            getList();
            return;
          case "updateItem":
            getList();
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
          case "deleteItem":
            console.log("Error: Server responded with status.", response.status);
            return;
          case "updateItem":
            console.log("Error: Server responded with status.", response.status);
            return;
          default:
            return;
        }
      }
    };
    fetchData();
  }, [urlRequest.action]);

  

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

  const removeItem = (id) => {
    console.log(id);
    setUrlRequest({
      url: `http://localhost:3010/api/shopping/${id}`,
      request: {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      },
      action: "removeItem",
    });
  }

  const updateItem = (item) => {
    setUrlRequest({
      url: `http://localhost:3010/api/shopping/${item.id}`,
      request: {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      },
      action: "updateItem",
    });
  }

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<ShoppingList removeItem={removeItem} updateItem={updateItem} list={state.list} />} />
        <Route path="/form" element={<ShoppingForm addItem={addItem} />} />
      </Routes>
    </div>
  );
}

export default App;
