import './App.css';
import { useState } from 'react';
import NameForm from './components/NameForm';


function App() {
	const [appState, setAppState] = useState({ greeting : "No greeting yet" });

	const setGreeting = (name) => {
		setAppState({ greeting : `Hello ${ name }` });
	}

	return (
		<div className="App">
			<NameForm setGreeting={setGreeting} />
			<h2>{appState.greeting}</h2>
		</div>
	);
}

export default App;
