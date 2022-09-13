import { useState } from "react";

const ShoppingForm = ( props ) => {
    const [state, setState] = useState({
        type: "",
        count: 0,
        price: 0,
    });

    const onChange = (e) => {
        setState({...state, [e.target.name]: e.target.value});
    };

    const onSubmit = (e) => {
        e.preventDefault();
        let item = {
            ...state
        }
        props.addItem(item);
        setState({
            type: "",
            count: 0,
            price: 0,
        });
    }

    return (
        <div className="shopping-form" style={{
            width: "100%",
            backgroundColor: "lightgray",
            padding: "10px",
            margin: "auto",
        }}>
            <form onSubmit={onSubmit} className="mb-3 m-auto w-50">
                <label htmlFor="type" className="form-label">Tyyppi</label>
                <input type="text" className="form-control" id="type" name="type" value={state.type} onChange={onChange} />
                <label htmlFor="count" className="form-label">Määrä</label>
                <input type="number" className="form-control" id="count" name="count" value={state.count} onChange={onChange} />
                <label htmlFor="price" className="form-label">Hinta</label>
                <input type="decimal" className="form-control" id="price" name="price" value={state.price} onChange={onChange} />
                <button type="submit" className="btn btn-primary mt-3">Lisää tuote</button>
            </form>
        </div>
    )

}

export default ShoppingForm;