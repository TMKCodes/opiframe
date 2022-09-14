import React from 'react';
import { useState } from 'react';

const LoginPage = (props) => {
    const [state, setState] = useState({
        username: "",
        password: "",
    });

    const handleChange = (e) => {
        setState({...state, [e.target.name]: e.target.value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(state.username.length < 4) {
            props.setErrorMessage("Username must be at least 4 characters long");
        } else if(state.password.length < 8) {
            props.setErrorMessage("Password must be at least 8 characters long");
        }
        let user = {
            ...state
        }
        if(e.target.name === "register") {
            props.registerUser(user);
        } else {
            props.loginUser(user);
        }

    }

    return (
        <div className="login-page">
            <form>
                <label htmlFor="username" className="form-label">Username</label>
                <input type="text" className="form-control" id="username" name="username" value={state.username} onChange={handleChange} />
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" id="password" name="password" value={state.password} onChange={handleChange} />
                <button type="button" className="btn btn-primary" name="login" onClick={handleSubmit}>Login</button>
                <button type="button" className="btn btn-secondary" name="register" onClick={handleSubmit}>Register</button> 
            </form>
        </div>
    )
}

export default LoginPage;