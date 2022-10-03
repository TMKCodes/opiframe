import React, { useState } from 'react';
import ShoppingItem from '../models/ShoppingItem';

interface Props {
  addToList(item: ShoppingItem): void;
}

interface State {
  type: string;
  count: number;
  price: number;
}

const ShoppingForm: React.FC<Props> = (props: Props) => {
  const [state, setState] = useState<State>({ type: '', count: 0, price: 0 });
  
  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setState({ ...state, [e.target.name]: e.target.value });
  }

  const onSubmit = (e: React.SyntheticEvent): void => {
    e.preventDefault();
    const item = new ShoppingItem(0, state.type, state.count, state.price);
    console.log(item);
    props.addToList(item);
    setState({ type: '', count: 0, price: 0 });
  }

  return (
    <form onSubmit={onSubmit} style={{ display: "flex", flexDirection: "column", gap: "5px", width: "50%", margin: "auto"}}>
      <label htmlFor="type">Type</label>
      <input type="text" name="type" placeholder="Type" value={state.type} onChange={onChange} />
      <label htmlFor="count">Count</label>
      <input type="number" name="count" placeholder="Count" step="1" value={state.count} onChange={onChange} />
      <label htmlFor="price">Price</label>
      <input type="number" name="price" placeholder="Price" step="0.01" value={state.price} onChange={onChange} />
      <button type="submit">Add</button>
    </form>
  )
}

export default ShoppingForm;