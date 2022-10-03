import React from 'react';
import ShoppingItem from '../models/ShoppingItem';

interface Props {
  list: ShoppingItem[];
  removeFromList(id: number): void;
}

const ShoppingList: React.FC<Props> = (props: Props) => {
  let items = props.list.map(item => (
    <tr key={item.id}>
      <td>{item.type}</td>
      <td>{item.count}</td>
      <td>{item.price}</td>
      <td>{(item.count * item.price).toFixed(2)}</td>
      <td><button onClick={() => props.removeFromList(item.id)}>Remove</button></td>
    </tr>
  ));
  return (
    <table style={{ width: "50%", margin: "auto", paddingTop: "20px"}}>
      <thead>
        <tr>
          <th>Type</th>
          <th>Count</th>
          <th>Price</th>
          <th>Total</th>
          <th>Remove</th>
        </tr>
      </thead>
      <tbody>
        {items}
      </tbody>
    </table>
  )
}

export default ShoppingList;