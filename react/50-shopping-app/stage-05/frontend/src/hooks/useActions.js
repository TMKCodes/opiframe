import { useState, useEffect, useContext } from "react";
import useAppState from "./useAppState";
import ActionContext from "../context/ActionContext";
import * as ActionConstants from "../types/actionConstants";

const useActions = () => {
  const action = useContext(ActionContext);
  const [state, setState] = useState({
    url: "",
    request: {},
    action: "",
  });

  const { token } = useAppState();

  useEffect(() => {
    const contactBackend = async () => {
      if(!state.url) {
        return;
      }
      action.dispatch({
        type: ActionConstants.LOADING,
      });
      let response = await fetch(state.url, state.request);
      action.dispatch({
        type: ActionConstants.STOP_LOADING,
      });
      if(!response) {
        action.dispatch({
          type: ActionConstants.ERROR,
          error: response.error
        });
        return;
      }
      if(response.ok) {
        let data = {}
        switch(state.action) {
          case "register":
            action.dispatch({
              type: ActionConstants.REGISTER_SUCCESS,
              payload: await response.json(),
            });
            return;
          case "login":
            data = await response.json();
            if (!data) {
              action.dispatch({
                type: ActionConstants.LOGIN_FAILED,
                error: "Failed to parse information"
              });
            } else {
              action.dispatch({
                type: ActionConstants.LOGIN_SUCCESS,
                token: data.token,
              });
            }
            return;
          case "logout":
            action.dispatch({
              type: ActionConstants.LOGOUT_SUCCESS,
            });
            return;
          case "getlist":
            data = await response.json();
            if (!data) {
              action.dispatch({
                type: ActionConstants.FETCH_LIST_FAILED,
                error: "Failed to parse information"
              });
            } else {
              action.dispatch({
                type: ActionConstants.FETCH_LIST_SUCCESS,
                list: data.list,
              });
            }
            return;
          case "add":
            data = await response.json();
            if (!data) {
              action.dispatch({
                type: ActionConstants.ADD_ITEM_FAILED,
                error: "Failed to parse information"
              });
            } else {
              action.dispatch({
                type: ActionConstants.ADD_ITEM_SUCCESS,
                list: data.list,
              });
            }
            return;
          case "remove":
            data = await response.json();
            if (!data) {
              action.dispatch({
                type: ActionConstants.REMOVE_ITEM_FAILED,
                error: "Failed to parse information"
              });
            } else {
              action.dispatch({
                type: ActionConstants.REMOVE_ITEM_SUCCESS,
                list: data.list,
              });
            }
            return;
          case "edit":
            data = await response.json();
            if (!data) {
              action.dispatch({
                type: ActionConstants.EDIT_ITEM_FAILED,
                error: "Failed to parse information"
              });
            } else {
              action.dispatch({
                type: ActionConstants.EDIT_ITEM_SUCCESS,
                list: data.list,
              });
            }
            return;
          default:
            return;
        }
      } else {
        if(response.status == 403) {
          action.dispatch({
            type: ActionConstants.LOGOUT_FAILED,
            error: "Your session has expired. Loggin you out."
          });
          return;
        }
        switch(state.action) {
          case "register":
            if(response.status === 409) {
              action.dispatch({
                type: ActionConstants.REGISTER_FAILED,
                error: "User already exists"
              });
            } else {
              action.dispatch({
                type: ActionConstants.REGISTER_FAILED,
                error: "Register failed. Server responded with a status code: " + response.status + " statusText: " + response.statusText
              });
            }
            return;
          case "login":
            action.dispatch({
              type: ActionConstants.LOGIN_FAILED,
              error: "Login failed. Server responded with a status code: " + response.status + " statusText: " + response.statusText
            });
            return;
          case "logout":
            action.dispatch({
              type: ActionConstants.LOGOUT_FAILED,
              error: "Logout failed. Server responded with a status code: " + response.status + " statusText: " + response.statusText
            });
            return;
          case "getlist":
            action.dispatch({
              type: ActionConstants.FETCH_LIST_FAILED,
              error: "Failed to fetch list. Server responded with a status code: " + response.status + " statusText: " + response.statusText
            });
            return;
          case "add":
            action.dispatch({
              type: ActionConstants.ADD_ITEM_FAILED,
              error: "Failed to add item. Server responded with a status code: " + response.status + " statusText: " + response.statusText
            });
            return;
          case "remove":
            action.dispatch({
              type: ActionConstants.REMOVE_ITEM_FAILED,
              error: "Failed to remove item. Server responded with a status code: " + response.status + " statusText: " + response.statusText
            });
            return;
          case "edit":
            action.dispatch({
              type: ActionConstants.EDIT_ITEM_FAILED,
              error: "Failed to edit item. Server responded with a status code: " + response.status + " statusText: " + response.statusText
            });
            return;
          default:
            return;
        }
      }
    }
    contactBackend();
  }, [state]);

  const register = (user) => {
    setState({
      url: "http://localhost:3080/register",
      request: {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      },
      action: "register",
    });
  };

  const login = (user) => {
    setState({
      url: "http://localhost:3080/login",
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

  const logout = () => {
    setState({
      url: "http://localhost:3080/logout",
      request: {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
      },
      action: "logout",
    });
  }

  const getList = () => {
    setState({
      url: "http://localhost:3080/api/shopping",
      request: {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
      },
      action: "getlist",
    });
  }

  const add = (item) => {
    setState({
      url: "http://localhost:3080/api/shopping",
      request: {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
        body: JSON.stringify(item),
      },
      action: "add",
    });
  }

  const remove = (id) => {
    setState({
      url: `http://localhost:3080/api/shopping/${id}`,
      request: {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
      },
      action: "remove",
    });
  }

  const edit = (item) => {
    setState({
      url: `http://localhost:3080/api/shopping/${item.id}`,
      request: {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
        body: JSON.stringify(item),
      },
      action: "edit",
    });
  }


  return {
    register,
    login,
    logout,
    getList,
    add,
    remove,
    edit,
    
  }
};

export default useActions;