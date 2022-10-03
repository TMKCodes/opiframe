import {Link} from 'react-router-dom';
import useActions from '../hooks/useActions';
import useAppState from '../hooks/useAppState';

const Navbar = (props) => {
	const {logout} = useActions();
	const {isLogged} = useAppState();

	let links = <ul className="navbar-nav"></ul>
	if(isLogged) {
		links = <ul className="navbar-nav">
					<li className="nav-item">
						<Link to="/">Shopping List</Link>
					</li>
					<li className="nav-item" style={{marginLeft:10}}>
						<Link to="/form">Add new item</Link>
					</li>
					<li className="nav-item" style={{marginLeft:10}}>
						<Link to="/" onClick={logout}>Logout</Link>
					</li>
			</ul>
	}
	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-light">
			<p className="navbar-brand" style={{marginLeft:10}}>Shopping App</p>
			{links}
		</nav>
	)
}

export default Navbar;