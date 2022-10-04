import React, { useReducer, useEffect, useState } from 'react';
import ShoppingItem from '../models/ShoppingItem';

type AppState = {
  list: ShoppingItem[],
  loading: boolean
};

type FetchState = {
  request:Request
};

type Action = {
  type: String,
  payload?: any
};

const initialState: AppState = {
  list: [],
  loading: false
};

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
  };
};

export const useAction = (): [ShoppingItem[], boolean, (item: ShoppingItem) => void, (id: number) => void] => {
  const [urlRequest, setUrlRequest] = useState<FetchState>({
    request: new Request('', {})
  });

  const [state, dispatch] = useReducer(listReducer, initialState);

  useEffect(() => {
    if(!urlRequest.request.url) return;
    const fetchData = async () => {
      dispatch({ type: 'LOADING' });
      const response = await fetch(urlRequest.request);
      dispatch({ type: 'STOP_LOADING' });
      const data = await response.json();
      if(!response) {
        return;
      }
      if (response.ok) {
        if(urlRequest.request.method === 'GET') {
          dispatch({ type: 'FETCH_DONE', payload: data });
        } else  {
          getList();
        }
      } else {
        console.log(`Server responded with ${response.status}, ${response.statusText}`);
      }
    };
    fetchData();
  }, [urlRequest.request]);

  const getList = () => {
    let tmpRequest = new Request('/api/shopping', {
      method: 'GET',
    });
    setUrlRequest({
      request: tmpRequest
    });
  };

  const addToList = (item: ShoppingItem) => {
    let tmpRequest = new Request('/api/shopping', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item)
    });
    setUrlRequest({
      request: tmpRequest
    });
  };

  const deleteFromList = (id: number) => {
    let tmpRequest = new Request(`/api/shopping/${id}`, {
      method: 'DELETE'
    });
    setUrlRequest({
      request: tmpRequest
    });
  };

  return [state.list, state.loading, addToList, deleteFromList];
};