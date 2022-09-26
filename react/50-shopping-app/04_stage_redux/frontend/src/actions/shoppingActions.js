import {loading, stopLoading, clearState } from './loginActions';

export const FETCH_LIST_SUCCESS = "FETCH_LIST_SUCCESS";
export const FETCH_LIST_FAILED = "FETCH_LIST_FAILED";
export const ADD_ITEM_SUCCESS = "ADD_ITEM_SUCCESS";
export const ADD_ITEM_FAILED = "ADD_ITEM_FAILED";
export const REMOVE_ITEM_SUCCESS = "REMOVE_ITEM_SUCCESS";
export const REMOVE_ITEM_FAILED = "REMOVE_ITEM_FAILED";
export const EDIT_ITEM_SUCCESS = "EDIT_ITEM_SUCCESS";
export const EDIT_ITEM_FAILED = "EDIT_ITEM_FAILED";

// Async actions
export const getList = (token) => {
  return async (dispatch) => {
    let request = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "token" : token
      },
    };
    dispatch(loading());
    const response = await fetch("http://localhost:3080/api/shopping", request);
    dispatch(stopLoading());
    if(!response) {
      dispatch(fetchListFailed("Failed to fetch shopping information."));
    }
    if(response.ok) {
      const data = await response.json();
      if(!data) {
        dispatch(fetchListFailed("Failed to parse shopping information."));
      }
      dispatch(fetchListSuccess(data));
    } else { 
      if(response.status === 403) {
        dispatch(clearState());
        dispatch(fetchListFailed("Session expired. Please log in again."));
      } else {
        dispatch(fetchListFailed("Failed to fetch shopping information. Server responded with " + response.status + " " + response.statusText));
      }
    }
  }
}

export const addItem = (token, item) => {
  return async (dispatch) => {
    let request = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "token" : token
      },
      body: JSON.stringify(item),
    };
    dispatch(loading());
    const response = await fetch("http://localhost:3080/api/shopping", request);
    dispatch(stopLoading());
    if(!response) {
      dispatch(addItemFailed("Failed to add item."));
    }
    if(response.ok) {
      dispatch(addItemSuccess());
      dispatch(getList(token));
    } else {
      if(response.status === 403) {
        dispatch(clearState());
        dispatch(addItemFailed("Session expired. Please log in again."));
      } else {
        dispatch(addItemFailed("Failed to add item. Server responded with " + response.status + " " + response.statusText));
      }
    }
  }
}

export const remove = (token, id) => {
  return async (dispatch) => {
    let request = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "token" : token
      },
    }
    dispatch(loading());
    const response = await fetch("http://localhost:3080/api/shopping/" + id, request);
    dispatch(stopLoading());
    if(!response) {
      dispatch(removeItemFailed("Failed to remove item."));
    }
    if(response.ok) {
      dispatch(removeItemSuccess());
      dispatch(getList(token));
    } else {
      if(response.status === 403) {
        dispatch(clearState());
        dispatch(removeItemFailed("Session expired. Please log in again."));
      } else {
        dispatch(removeItemFailed("Failed to remove item. Server responded with " + response.status + " " + response.statusText));
      }
    }
  }
}

export const edit = (token, item) => {
  return async (dispatch) => {
    let request = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "token" : token
      },
      body: JSON.stringify(item),
    }
    dispatch(loading());
    const response = await fetch("http://localhost:3080/api/shopping/" + item.id, request);
    dispatch(stopLoading());
    if(!response) {
      dispatch(editItemFailed("Failed to edit item."));
    }
    if(response.ok) {
      dispatch(editItemSuccess());
      dispatch(getList(token));
    } else {
      if(response.status === 403) {
        dispatch(clearState());
        dispatch(editItemFailed("Session expired. Please log in again."));
      } else {
        dispatch(editItemFailed("Failed to edit item. Server responded with " + response.status + " " + response.statusText));
      }
    }
  }
}

// Action creators

const fetchListSuccess = (list) => {
  return {
    type: FETCH_LIST_SUCCESS,
    list: list,
  };
}

const fetchListFailed = (error) => {
  return {
    type: FETCH_LIST_FAILED,
    error: error,
  };
}

const addItemSuccess = () => {
  return {
    type: ADD_ITEM_SUCCESS,
  };
}

const addItemFailed = (error) => {
  return {
    type: ADD_ITEM_FAILED,
    error: error,
  };
} 

const removeItemSuccess = () => {
  return {
    type: REMOVE_ITEM_SUCCESS,
  };
} 

const removeItemFailed = (error) => {
  return {
    type: REMOVE_ITEM_FAILED,
    error: error,
  };
}

const editItemSuccess = () => {
  return {
    type: EDIT_ITEM_SUCCESS,
  };
}

const editItemFailed = (error) => {
  return {
    type: EDIT_ITEM_FAILED,
    error: error,
  };
}
