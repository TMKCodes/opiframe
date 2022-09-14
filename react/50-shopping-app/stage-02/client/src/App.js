import React from "react";
import { Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './App.css';

import Navbar from './components/Navbar';
import LoginPage from './components/LoginPage';
import ShoppingForm from "./components/ShoppingForm";
import ShoppingList from './components/ShoppingList';

function App() {
  const [state, setState] = useState({
    list: [],
    token: "",
    isLogged: false,
    loading: false,
    error: "",
  });

  const [urlRequest, setUrlRequest] = useState({
    url: "",
    request: {},
    action: "",
  });

  const setLoading = (loading) => {
    setState({ 
      ...state, 
      loading: loading,
      error: "",
    });
  }

  const setErrorMessage = (error) => {
    sessionStorage.setItem("state", JSON.stringify(state));
    setState({
      ...state,
      error: error,
    });
    
  }

  const cleanState = () => {
    sessionStorage.setItem("state", JSON.stringify(state));
    setState({
      ...state,
      list: [],
      isLogged: false,
      loading: false,
      error: "",
    });
  }

  useEffect(() => {
    let state = sessionStorage.getItem("state");
    if(state) {
      setState(JSON.parse(state));
      if(state.isLogged) {
        getList();
      }
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if(!urlRequest.url) {
        return;
      }
      setLoading(true);
      let response = await fetch(urlRequest.url, urlRequest.request);
      setLoading(false);
      if(response.ok) {
        switch(urlRequest.action) {
          case "addItem":
            getList();
            return;
          case "deleteItem":
            getList();
            return;
          case "updateItem":
            getList();
            return;
          case "getList":
            let data = await response.json();
            if(data) {
              setState({ ...state, list: data });
              sessionStorage.setItem("state", JSON.stringify(state));
            }
            return;
          case "login":
            let login = await response.json();
            if(login.token) {
              setState({ ...state, token: login.token, isLogged: true });
              sessionStorage.setItem("state", JSON.stringify(state));
              getList();
            }
            return;
          case "logout":
            setErrorMessage("You have been logged out");
            return
          case "register":
            setErrorMessage("User registered successfully");
            return
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
          case "logout":
            setErrorMessage("Error: Server responded with status:", response.status + ", with msg " +response.message);
            return
          case "register":
            setErrorMessage("Error: Server responded with status:", response.status + ", with msg " +response.message);
            return
          default:
            console.log("Error: Server responded with status.", response.status);
            return;
        }
      }
    };
    fetchData();
  }, [urlRequest.action]);

  const loginUser = (user) => {
    setUrlRequest({
      url: "http://localhost:3010/api/authentication/login",
      request: {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      },
      action: "login",
    });
  }

  const logoutUser = () => {
    setUrlRequest({
      url: "http://localhost:3010/api/authentication/logout",
      request: {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "token" : state.token,
        },
        body: JSON.stringify(),
      },
      action: "logout",
    });
    cleanState();
  }

  const registerUser = (user) => {
    setUrlRequest({
      url: "http://localhost:3010/api/authentication/register",
      request: {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      },
      action: "register",
    });
  }

  const addItem = (item) => {
    setUrlRequest({
      url: "http://localhost:3010/api/shopping",
      request: {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "token" : state.token,
        },
        body: JSON.stringify(item),
      },
      action: "addItem",
    });
  };

  const getList = (token) => {
    let tmpToken = token ? token : state.token;
    setUrlRequest({
      url: "http://localhost:3010/api/shopping",
      request: {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "token" : tmpToken,
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
          "token" : state.token,
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
          "token" : state.token,
        },
        body: JSON.stringify(item),
      },
      action: "updateItem",
    });
  }

  // Conditional rendering
  let message = <h4> </h4>;
  if(state.loading) message = <h4>Loading...</h4>;
  if(state.error) message = <h4>{state.error}</h4>;

  let tempRender = <Routes>
        <Route path="/" element={<LoginPage loginUser={loginUser} registerUser={registerUser} />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>;

  if(state.isLogged) {
    tempRender = <Routes>
          <Route path="/" element={<ShoppingList removeItem={removeItem} updateItem={updateItem} list={state.list} />} />
          <Route path="/form" element={<ShoppingForm addItem={addItem} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>;
  }
  return (
    <div className="App">
      <Navbar isLogged={state.isLogged} logoutUser={logoutUser} />
      {message}
      {tempRender}
    </div>
  )
}

export default App;
