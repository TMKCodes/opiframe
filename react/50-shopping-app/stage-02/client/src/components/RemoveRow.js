import React from 'react';

const RemoveRow = (props) => {
    return (
        <tr>
            <td>{props.item.type}</td>
            <td>{props.item.count}</td>
            <td>{props.item.price}</td>
            <td><button className="btn btn-success" onClick={() => props.changeMode("cancel", -1)}>cancel</button></td>
            <td><button className="btn btn-danger" onClick={() => props.removeItem(props.item.id)}>Remove</button></td>
        </tr>
    )
}

export default RemoveRow;