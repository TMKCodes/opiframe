import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand m-3" href="#">Shopping cart</a>
            <ul className="navbar-nav mr-auto m-3">
                <li className="nav-item">
                    <Link to="/" className="nav-link">Home</Link>
                </li>
                <li className="nav-item">
                    <Link to="/form" className="nav-link">Add new item</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar;