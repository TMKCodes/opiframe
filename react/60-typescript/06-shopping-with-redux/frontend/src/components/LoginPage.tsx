import { useState } from "react";
import { useDispatch } from "react-redux";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { register, login } from "../actions/loginActions";
import { useNavigate } from "react-router-dom";
import User from "../models/User";


const Loginpage: React.FC<{}> = (props) => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    username: '',
    password: '',
  });

  const dispatch: ThunkDispatch<any, any, AnyAction> = useDispatch();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  }

  const onRegister = (e: React.SyntheticEvent) => {
    e.preventDefault();
    let user = new User(state.username, state.password);
    dispatch(register(user));
  }

  const onLogin = (e: React.SyntheticEvent) => {
    e.preventDefault();
    let user = new User(state.username, state.password);
    dispatch(login(user));
    navigate('/');
  }

  return (
    <form style={{ display: "flex", flexDirection: "column", gap: "5px", width: "50%", margin: "auto"}}>
      <label htmlFor="username">Username</label>
      <input type="text" name="username" value={state.username} onChange={onChange} />
      <label htmlFor="password">Password</label>
      <input type="password" name="password" value={state.password} onChange={onChange} />
      <button onClick={onLogin}>Login</button>
      <button onClick={onRegister}>Register</button>
    </form>
  )
}

export default Loginpage