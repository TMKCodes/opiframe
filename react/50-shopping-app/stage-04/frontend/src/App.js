import {useState,useEffect} from 'react';
import './App.css';
import {Routes,Route,Navigate} from 'react-router-dom';
import ShoppingForm from './components/ShoppingForm';
import ShoppingList from './components/ShoppingList';
import Navbar from './components/Navbar';
import LoginPage from './components/LoginPage';
import {useSelector} from 'react-redux';

function App() {

	const session = useSelector(state => state.login);
	const shopping = useSelector(state => state.shopping);
	
	//CONDITIONAL RENDERING
	
	let messageArea = <h4> </h4>
	if(session.loading) {
		messageArea = <h4>Loading ...</h4>
	}
	if(shopping.error) {
		messageArea = <h4>{shopping.error}</h4>
	}
	if(session.error) {
		messageArea = <h4>{session.error}</h4>
	}
	let tempRender = <Routes>
						<Route exact path="/" element={<LoginPage/>}/>
						<Route path="*" element={<Navigate to="/"/>}/>
					 </Routes>
	if(session.isLogged) {
		tempRender = <Routes>
						<Route exact path="/" element={<ShoppingList />}/>
						<Route path="/form" element={<ShoppingForm />}/>
						<Route path="*" element={<Navigate to="/"/>}/>
					</Routes>
	}
	return (
		<div className="App">
			<Navbar />
			{messageArea}
			<hr/>
			{tempRender}
		</div>
	);
}

export default App;
