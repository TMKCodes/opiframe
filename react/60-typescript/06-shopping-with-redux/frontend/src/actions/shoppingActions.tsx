import ShoppingItem from "../models/ShoppingItem";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import * as actionConstants from "../types/actionConstants";

export const getList = (token: string) => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    const request = new Request("/api/shopping", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: token
      }
    });
    handleFetch(request, "getlist", dispatch, token);
  };
}

export const add = (token: string, item: ShoppingItem) => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    const request = new Request("/api/shopping", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: token
      },
      body: JSON.stringify(item)
    });
    handleFetch(request, "add", dispatch, token);
  };
}

export const remove = (token: string, id: number|string) => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    const request = new Request(`/api/shopping/` + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        token: token
      }
    });
    handleFetch(request, "remove", dispatch, token);
  };
}

export const update = (token: string, item: ShoppingItem) => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    const request = new Request(`/api/shopping/` + item.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        token: token
      },
      body: JSON.stringify(item)
    });
    handleFetch(request, "update", dispatch, token);
  };
}


const handleFetch = async (request: Request, action: string, dispatch: ThunkDispatch<any, any, AnyAction>, token: string) => {
  dispatch({ type: actionConstants.LOADING });
  const response = await fetch(request);
  dispatch({ type: actionConstants.STOP_LOADING });
  if(!response) {
    return;
  }
  if(response.ok) {
    switch(action) {
      case "getlist":
        const data = await response.json();
        if(!data) {
          dispatch({
            type: actionConstants.FETCH_LIST_FAILED,
            error: "Error parshing shopping list"
          });
        }
        let list = data as ShoppingItem[];
        dispatch({
          type: actionConstants.FETCH_LIST_SUCCESS,
          list: list
        });
        return;
      case "add":
        dispatch({
          type: actionConstants.ADD_ITEM_SUCCESS
        });
        dispatch(getList(token));
        return;
      case "remove":
        dispatch({
          type: actionConstants.REMOVE_ITEM_SUCCESS
        });
        dispatch(getList(token));
        return;
      case "update":
        dispatch({
          type: actionConstants.UPDATE_ITEM_SUCCESS
        });
        dispatch(getList(token));
        return;
      default:
        return;
    }
  } else {
    if(response.status === 403) {
      dispatch({
        type: actionConstants.CLEAR_STATE
      });
      dispatch({
        type: actionConstants.LOGOUT_FAILED,
        error: "Session has expired. Logging you out!"
      })
      return;
    }
    switch(action) {
      case "getlist":
        dispatch({
          type: actionConstants.FETCH_LIST_FAILED,
          error: "Error fetching shopping list" + response.status + " " + response.statusText
        });
        return;
      case "add":
        dispatch({
          type: actionConstants.ADD_ITEM_FAILED,
          error: "Error adding item" + response.status + " " + response.statusText
        });
        return;
      case "remove":
        dispatch({
          type: actionConstants.REMOVE_ITEM_FAILED,
          error: "Error removing item" + response.status + " " + response.statusText
        });
        return;
      case "update":
        dispatch({
          type: actionConstants.UPDATE_ITEM_FAILED,
          error: "Error updating item" + response.status + " " + response.statusText
        });
        return;
      default:
        return;
    }
  }
}
