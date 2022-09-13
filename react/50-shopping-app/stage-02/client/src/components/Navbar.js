import React from 'react';
import {Link} from 'react-router-dom';

const Navbar = (props) => {
	
	return (
		<div style={{
            width: "100%",
            margin: "auto",
        }}>
		<nav className="navbar navbar-light bg-light justify-content-center">
			<a className="navbar-brand m-2">Shopping App</a>
			<ul className="navbar-nav navbar-left flex-row m-auto">
                <li className="nav-item m-2">
                    <Link to="/" className="nav-link">Shopping List</Link>
                </li>
                <li className="nav-item m-2">
                    <Link to="/form" className="nav-link">Add Item</Link>
                </li>
			</ul>		
		</nav>
		</div>
	)
}

export default Navbar;