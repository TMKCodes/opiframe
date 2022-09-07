import { Route, Routes, Link } from 'react-router-dom';
import './App.css';
import Home from './pages/Home.js';
import About from './pages/About.js';
import Secret from './pages/Secret.js';

function App() {
  return (
    <div className="App">
      <ul style={{ listStyleType:"none" }}>
				<li><Link to="/">Home</Link></li>
				<li><Link to="/about">About</Link></li>
			</ul>
			<hr/>
			<Routes>
				<Route exact path="/" element={<Home/>}/>
				<Route path="/about" element={<About/>}/>
				<Route path="/secret" element={<Secret/>}/>
			</Routes>
    </div>
  );
}

export default App;
