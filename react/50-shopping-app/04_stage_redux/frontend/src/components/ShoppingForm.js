import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../actions/shoppingActions';

const ShoppingForm = (props) => {

	const token = useSelector(state => state.login.token);
	const dispatch = useDispatch();	

	const [state,setState] = useState({
		type:"",
		count:0,
		price:0
	});

	
	const onChange = (event) => {
		setState((state) => {
			return {
				...state,
				[event.target.name]:event.target.value
			}
		})
	}
	
	const onSubmit = (event) => {
		event.preventDefault();
		let item = {
			...state
		}
		dispatch(addItem(token, item));
		setState({
			type:"",
			count:0,
			price:0
		})
	}
	return(
		<div style={{
			backgroundColor:"lightgreen",
			width:"40%",
			margin:"auto"
		}}>
			<form onSubmit={onSubmit} className="mb-3">
				<label htmlFor="type" className="form-label">Type</label>
				<input type="text"
						name="type"
						id="type"
						className="form-control"
						value={state.type}
						onChange={onChange}/>
				<label htmlFor="count" className="form-label">Count</label>
				<input type="number"
						name="count"
						id="count"
						className="form-control"
						value={state.count}
						onChange={onChange}/>
				<label htmlFor="price" className="form-label">Price</label>
				<input type="number"
						name="price"
						id="price"
						className="form-control"
						step="0.01"
						value={state.price}
						onChange={onChange}/>
				<input type="submit" className="btn btn-primary" value="Add"/>
			</form>
		</div>
	)
}

export default ShoppingForm;