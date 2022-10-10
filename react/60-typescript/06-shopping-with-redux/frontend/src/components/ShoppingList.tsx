import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import ShoppingItem from "../models/ShoppingItem";
import { getList, remove, update } from "../actions/shoppingActions";

import ShoppingRow from "./ShoppingRow";
import DeleteRow from "./DeleteRow";
import EditRow from "./EditRow";

interface TokenState {
  login: {
    token: string;
  }
}

interface ListState {
  shopping: {
    list: ShoppingItem[];
  }
}

interface State {
  removeIndex: number;
  editIndex: number;
}

const ShoppingList: React.FC<{}> = (props) => {
  const list = useSelector((state: ListState) => state.shopping.list);
  const token = useSelector((state: TokenState) => state.login.token);
  const dispatch: ThunkDispatch<{}, {}, AnyAction> = useDispatch();

  const [state, setState] = React.useState<State>({
    removeIndex: -1,
    editIndex: -1,
  });
  
  useEffect(() => {
    dispatch(getList(token));
  }, [dispatch, token]);

  const changeMode = (index: number, mode: string) => {
    if (mode === "remove") {
      setState({ ...state, removeIndex: index });
    } else if (mode === "update") {
      setState({ ...state, editIndex: index });
    } else {
      setState({ ...state, removeIndex: -1, editIndex: -1 });
    }
  };

  const removeItem = (id: string|number) => {
    dispatch(remove(token, id));
    changeMode(0, "cancel");
  };

  const updateItem = (item: ShoppingItem) => {
    dispatch(update(token, item));
    changeMode(0, "cancel");
  };

  let listStyle: React.CSSProperties = {
    width: '300px',
    margin: '0 auto',
  };

  return (
    <div>
      <h1>Shopping List</h1>
      <table style={listStyle}>
        <thead>
          <tr>
            <th>Nimi</th>
            <th>Määrä</th>
            <th>Hinta</th>
            <th>Toiminnot</th>
          </tr>
        </thead>
        <tbody>
          { list.map((item, index) => {
            if (state.removeIndex === index) {
              return <DeleteRow key={item.id} item={item} changeMode={changeMode} removeItem={removeItem} />
            } else if (state.editIndex === index) {
              return <EditRow key={item.id} item={item} changeMode={changeMode} updateItem={updateItem} />
            } else {
              return <ShoppingRow key={item.id} item={item} index={index} changeMode={changeMode} />
            }
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ShoppingList;
