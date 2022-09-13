import React from 'react';
import { useState } from "react";

const EditRow = (props) => {

    const [state, setState] = useState({
        type: props.item.type,
        count: props.item.count,
        price: props.item.price,
    });

    const onChange = (e) => {
        setState({...state, [e.target.name]: e.target.value});
    }

    const editItem = () => {
        let item = {
            ...state,
            id: props.item.id,
        }
        props.updateItem(item, props.index);
        props.changeMode("cancel", -1);
    }

    return (
        <tr>
            <td><input type="text" className="form-control" id="type" name="type" value={state.type} onChange={onChange} /></td>
            <td><input type="decimal" className="form-control" id="count" name="count" value={state.count} onChange={onChange} /></td>
            <td><input type="decimal" className="form-control" id="price" name="price" value={state.price} onChange={onChange} /></td>
            <td><button className="btn btn-danger" onClick={() => props.changeMode("cancel", -1)}>cancel</button></td>
            <td><button className="btn btn-success" onClick={() => editItem()}>Save</button></td>
        </tr>
    );
};

export default EditRow;