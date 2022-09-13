import React from 'react';
import { useState } from "react";
import ShoppingRow from "./ShoppingRow";
import RemoveRow from "./RemoveRow";
import EditRow from "./EditRow";

const ShoppingList = (props) => {
    const [state, setState] = useState({
        removeIndex: -1,
        editIndex: -1,
    });

    const changeMode = (mode, index) => {
        switch(mode) {
            case "remove":
                setState({ ...state, removeIndex: index });
                return;
            case "edit":
                setState({ ...state, editIndex: index });
                return;
            case "cancel":
                setState({ ...state, removeIndex: -1, editIndex: -1 });
                return;
            default:
                return;
        }
    }

    const removeItem = (index) => {
        props.removeItem(index);
        changeMode("cancel", -1);
    }

    let items = props.list.map((item, index) => {
        if (state.removeIndex === index) {
            return <RemoveRow key={index} item={item} index={index} changeMode={changeMode} removeItem={removeItem} />
        } else if(state.editIndex === index) {
            return <EditRow key={index} item={item} index={index} changeMode={changeMode} updateItem={props.updateItem} />
        }
        return (
            <ShoppingRow key={index} item={item} index={index} changeMode={changeMode} />
        );
    });
    return (
        <div style={{
            width: "100%",
            backgroundColor: "lightgray",
            padding: "10px",
            margin: "auto",
        }}>
            <table className="table table-striped m-auto w-50 ">
                <thead>
                    <tr>
                        <th scope="col">Tyyppi</th>
                        <th scope="col">Määrä</th>
                        <th scope="col">Hinta</th>
                        <th scope="col">Muokkaa</th>
                        <th scope="col">Poista</th>
                    </tr>
                </thead>
                <tbody>
                    {items}
                </tbody>
            </table>
        </div>
    )
}

export default ShoppingList;