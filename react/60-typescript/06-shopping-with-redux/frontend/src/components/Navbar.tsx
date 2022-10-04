import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { logout } from '../actions/loginActions';

interface State {
  login: {
    isLogged: boolean;
    token: string;
    error: string;
    loading: boolean;
  };
  shopping: {
    error: string;
  }
}

const Navbar: React.FC<{}> = (props) => {
  const stateSelector = (state: State) => state;
  const state = useSelector(stateSelector);
  const dispatch: ThunkDispatch<{}, {}, AnyAction> = useDispatch();

  let navStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 20px',
    backgroundColor: '#333',
    color: 'white',
    height: '50px',
    gap: '20px'
  };

  let linkStyle: React.CSSProperties = {
    textDecoration: 'none',
    color: 'white'
  };

  let header = (state.login.loading) ? 'Loading...' : 'Shopping List';
  let error = (state.shopping.error) ? state.shopping.error : (state.login.error) ? state.login.error : '';

  return (
    <div style={navStyle}>
      <h1>{header}</h1>
      <div>
        { state.login.isLogged ? (
          <div style={navStyle}>
            <Link to='/' style={linkStyle}>Home</Link>
            <Link to='/add' style={linkStyle}>Add</Link>
            <Link to='/login' style={linkStyle} onClick={() => dispatch(logout(state.login.token))}>Logout</Link>
          </div>
        ) : (
          <div style={navStyle}>
            <Link to='/' style={linkStyle}>Home</Link>
            <Link to='/login' style={linkStyle}>Login</Link>
          </div>
        )}
      </div>
      { error && <div>{error}</div> }
    </div>
  )
}

export default Navbar;