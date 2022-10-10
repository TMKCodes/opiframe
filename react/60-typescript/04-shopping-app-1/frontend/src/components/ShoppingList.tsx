import React from 'react';
import ShoppingItem from '../models/ShoppingItem';
import ShoppingRow from './ShoppingRow';
import RemoveRow from './RemoveRow';

interface Props {
  list: ShoppingItem[];
  removeFromList(id: number): void;
}

const ShoppingList: React.FC<Props> = (props: Props) => {
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
        { props.list.map(item => (
          (item.mode === 'remove') ? 
          <RemoveRow key={item.id} item={item} changeMode={props.changeMode} removeItem={props.removeItem} /> 
          : <ShoppingRow key={item.id} item={item} changeMode={props.changeMode} />
        ))}
      </tbody>
    </table>
  )
}

export default ShoppingList;