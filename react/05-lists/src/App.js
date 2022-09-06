import { useState } from 'react';
import './App.css';
import ContactForm from './components/ContactForm';

function App() {
	const [state, setState] = useState({
		list: [],
		id: 100
	});

	const addContact = (contact) => {
		contact.id = state.id;
		setState((state) => ({
			list: [...state.list, contact],
			id: state.id + 1
		}));
	};

	const deleteContact = (id) => {
		setState((state) => ({
			list: state.list.filter((contact) => contact.id !== id)
		}));
	};

	return (
		<div className="App">
			<ContactForm addContact={addContact} />
		</div>
	);
};

export default App;
