import React from "react";
import ShoppingItem from "../models/ShoppingItem";
import { add } from "../actions/shoppingActions";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { useDispatch, useSelector } from "react-redux";

interface TokenState {
  login: {
    token: string;
  }
}

const ShoppingForm: React.FC<{}> = (props) => {
  const tokenSelector = (state: TokenState) => state.login.token;
  const token = useSelector(tokenSelector);
  const dispatch: ThunkDispatch<{}, {}, AnyAction> = useDispatch();

  const [item, setItem] = React.useState<ShoppingItem>({
    id: 0,
    type: "",
    count: 0,
    price: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    dispatch(add(token, item));
  };

  let formStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: '20px',
    padding: '20px',
    width: '300px',
    margin: '0 auto',
    
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <label htmlFor="type">Nimi</label>
      <input type="text" name="type" placeholder="Type" onChange={handleChange} />
      <label htmlFor="count">Määrä</label>
      <input type="number" name="count" placeholder="Count" onChange={handleChange} />
      <label htmlFor="price">Hinta</label>
      <input type="number" name="price" placeholder="Price" step="0.01" onChange={handleChange} />
      <button type="submit">Add</button>
    </form>
  )
}

export default ShoppingForm;