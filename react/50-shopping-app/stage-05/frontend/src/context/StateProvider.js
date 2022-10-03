import { useReducer } from "react";
import AppStateContext  from "./AppStateContext";
import ActionContext  from "./ActionContext";
import * as ActionConstants from "../types/actionConstants";

const getInitialState = () => {
  const state = localStorage.getItem("state");
  if (state) {
    return JSON.parse(state);
  } else {
    return {
      list: [],
      isLogged: false,
      token: "",
      loading: false,
      error: "",
    };
  }
};

const initialState = getInitialState();

const saveToStorage = (state) => {
  localStorage.setItem("state", JSON.stringify(state));
}

const listReducer = (state, action) => {
  let tmpState = {};
  switch(action.type) {
    case ActionConstants.LOADING:
      return {
        ...state,
        loading: true,
        error: ""
      }
    case ActionConstants.STOP_LOADING:
      return {
        ...state,
        loading: false,
        error: ""
      }
    case ActionConstants.REGISTER_SUCCESS:
      tmpState = {
        ...state,
        error: "You successfully registered. Please login."
      }
      saveToStorage(tmpState);
      return tmpState;
    case ActionConstants.REGISTER_FAILED:
      tmpState = {
        ...state,
        error: action.error
      }
      saveToStorage(tmpState);
      return tmpState;
    case ActionConstants.LOGIN_SUCCESS:
      tmpState = {
        ...state,
        isLogged: true,
        token: action.token,
        error: ""
      }
      saveToStorage(tmpState);
      return tmpState;
    case ActionConstants.LOGIN_FAILED:
      tmpState = {
        ...state,
        error: action.error
      }
      saveToStorage(tmpState);
      return tmpState;
    case ActionConstants.LOGOUT_SUCCESS:
      tmpState = {
        ...state,
        isLogged: false,
        token: "",
        error: ""
      }
      saveToStorage(tmpState);
      return tmpState;
    case ActionConstants.LOGOUT_FAILED:
      tmpState = {
        ...state,
        error: action.error
      }
      saveToStorage(tmpState);
      return tmpState;
    case ActionConstants.FETCH_LIST_SUCCESS:
      tmpState = {
        ...state,
        list: action.list,
        error: ""
      }
      saveToStorage(tmpState);
      return tmpState;
    case ActionConstants.FETCH_LIST_FAILED:
      tmpState = {
        ...state,
        error: action.error
      }
      saveToStorage(tmpState);
      return tmpState;
    case ActionConstants.ADD_ITEM_FAILED:
      tmpState = {
        ...state,
        error: action.error
      }
      saveToStorage(tmpState);
      return tmpState;
    case ActionConstants.REMOVE_ITEM_FAILED:
      tmpState = {
        ...state,
        error: action.error
      }
      saveToStorage(tmpState);
      return tmpState;
    case ActionConstants.EDIT_ITEM_FAILED:
      tmpState = {
        ...state,
        error: action.error
      }
      saveToStorage(tmpState);
      return tmpState;
    default:
      return state;
  }
}

const StateProvider = (props) => {
  const [state, dispatch] = useReducer(listReducer, initialState);

  return (
    <AppStateContext.Provider value={state}>
      <ActionContext.Provider value={{dispatch:dispatch}}>
        {props.children}
      </ActionContext.Provider>
    </AppStateContext.Provider>
  )
}

export default StateProvider;