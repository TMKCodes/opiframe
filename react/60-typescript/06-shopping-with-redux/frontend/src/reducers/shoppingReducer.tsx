import * as actionConstants from '../types/actionConstants';
import ShoppingItem from '../models/ShoppingItem';
import { ShoppingState } from '../types/states';
import { AnyAction, Reducer } from 'redux';

const getInitialState = (): ShoppingState => {
  let state = sessionStorage.getItem('shoppingState');
  if (state) {
    return JSON.parse(state);
  } else {
    return {
      list: [],
      error: ''
    }
  }
}

const saveToStorage = (state: ShoppingState) => {
  sessionStorage.setItem('shoppingState', JSON.stringify(state));
}

const shoppingReducer: Reducer<ShoppingState, AnyAction> = (state = getInitialState(), action: AnyAction) => {
  let tmpState: ShoppingState = {
    ...state
  }
  switch (action.type) {
    case actionConstants.LOADING:
      return {
        ...state,
        error: "",
      }
    case actionConstants.ADD_ITEM_SUCCESS:
      tmpState = {
        ...state,
        list: [...state.list, action.item],
        error: ''
      }
      saveToStorage(tmpState);
      return tmpState;
    case actionConstants.ADD_ITEM_FAILED:
      tmpState = {
        ...state,
        error: action.error
      }
      saveToStorage(tmpState);
      return tmpState;
    case actionConstants.FETCH_LIST_SUCCESS:
      tmpState = {
        ...state,
        list: action.list,
        error: ''
      }
      saveToStorage(tmpState);
      return tmpState;
    case actionConstants.FETCH_LIST_FAILED:
      tmpState = {
        ...state,
        error: action.error
      }
      saveToStorage(tmpState);
      return tmpState;
    case actionConstants.REMOVE_ITEM_SUCCESS:
      tmpState = {
        ...state,
        list: state.list.filter((item: ShoppingItem) => item.id !== action.id),
        error: ''
      }
      saveToStorage(tmpState);
      return tmpState;
    case actionConstants.REMOVE_ITEM_FAILED:
      tmpState = {
        ...state,
        error: action.error
      }
      saveToStorage(tmpState);
      return tmpState;
    case actionConstants.UPDATE_ITEM_SUCCESS:
      tmpState = {
        ...state,
        error: ''
      }
      saveToStorage(tmpState);
      return tmpState;
    case actionConstants.UPDATE_ITEM_FAILED:
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

export default shoppingReducer;