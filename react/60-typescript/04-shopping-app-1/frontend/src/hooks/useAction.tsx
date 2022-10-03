import React, { useReducer, useEffect, useState } from 'react';
import ShoppingItem from '../models/ShoppingItem';

type AppState = {
  list: ShoppingItem[];
  loading: boolean
}

type FetchState = {
  request:Request
}

type Action = {
  type: String,
  payload?: any
}

const initialState: AppState = {
  list: [],
  loading: false
}

const listReducer = (state: AppState, action: Action) => {
  switch (action.type) {
    case 'LOADING':
      return {
        ...state,
        loading: true
      }
    case 'STOP_LOADING':
      return {
        ...state,
        loading: false
      }
    case 'FETCH_DONE':
      if(action.payload) {
        return {
          ...state,
          list: action.payload as ShoppingItem[]
        }
      } else {
        return state;
      }
    default:
      return state;
  }
}