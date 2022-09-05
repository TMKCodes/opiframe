import { useState } from 'react';

const NameForm = (props) => {
    const [state, setState] = useState({
            firstName: '',
            lastName: ''
    });

    const onChange = (event) => {
        setState((state) => {
            return {
                ...state,
                [event.target.name]: event.target.value
            }
        });
    };

    const onSubmit = (event) => {
        event.preventDefault();
        props.setGreeting(`${state.firstName} ${state.lastName}`);
    };

    return (
        <form onSubmit={onSubmit}>
            <label htmlFor="firstName">First name:</label>
            <input id="firstName" 
                type="text" 
                name="firstName"
                onChange={onChange}
                value={state.firstName} />
            <label htmlFor="lastName">Last name:</label>
            <input id="lastName" 
                type="text" 
                name="lastName"
                onChange={onChange}
                value={state.lastName} />
            <button type="submit">Submit</button>
        </form>
    );
};

export default NameForm;