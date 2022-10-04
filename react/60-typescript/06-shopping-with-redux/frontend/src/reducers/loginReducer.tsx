import * as actionConstants from '../types/actionConstants';
import { LoginState } from '../types/states';
import { AnyAction, Reducer } from 'redux';

const getInitialState = (): LoginState => {
  let state = sessionStorage.getItem('loginState');
  if (state) {
    return JSON.parse(state);
  } else {
    return {
      isLogged: false,
      token: '',
      error: '',
      loading: false
    }
  }
}

const saveToStorage = (state: LoginState) => {
  sessionStorage.setItem('loginState', JSON.stringify(state));
}

const loginReducer: Reducer<LoginState, AnyAction> = (state = getInitialState(), action: AnyAction) => {
  let tmpState: LoginState = {
    ...state
  }
  switch (action.type) {
    case actionConstants.LOADING:
      return {
        ...state,
        loading: true,
        error: ""
      }
    case actionConstants.STOP_LOADING:
      return {
        ...state,
        loading: false,
        error: ""
      }
    case actionConstants.LOGIN_SUCCESS:
      tmpState = {
        ...state,
        isLogged: true,
        token: action.token,
        error: "",
        loading: false
      }
      saveToStorage(tmpState);
      return tmpState;
    case actionConstants.LOGIN_FAILED:
      tmpState = {
        ...state,
        error: action.error,
        loading: false
      }
      saveToStorage(tmpState);
      return tmpState;
    case actionConstants.LOGOUT_SUCCESS:
      tmpState = {
        ...state,
        isLogged: false,
        token: '',
        error: "",
        loading: false
      }
      saveToStorage(tmpState);
      return tmpState;
    case actionConstants.LOGOUT_FAILED:
      tmpState = {
        ...state,
        isLogged: false,
        token: '',
        error: action.error,
        loading: false
      }
      saveToStorage(tmpState);
      return tmpState;
    case actionConstants.REGISTER_SUCCESS:
      tmpState = {
        ...state,
        loading: false,
        error: "Register success"
      }
      saveToStorage(tmpState);
      return tmpState;
    case actionConstants.REGISTER_FAILED:
      tmpState = {
        ...state,
        loading: false,
        error: action.error
      }
      saveToStorage(tmpState);
      return tmpState;
    case actionConstants.CLEAR_STATE:
      tmpState = {
        isLogged: false,
        token: '',
        error: '',
        loading: false
      }
      saveToStorage(tmpState);
      return tmpState;
    default:
      return state;
  }
}

export default loginReducer;