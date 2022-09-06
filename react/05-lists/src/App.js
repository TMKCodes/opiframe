import { useState } from 'react';
import './App.css';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';

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
		console.log("deleteContact", id);
		setState((state) => ({
			list: state.list.filter((contact) => contact.id !== parseInt(id)),
			id: state.id
		}));
	};

	return (
		<div className="App">
			<ContactForm addContact={addContact} />
			<ContactList contacts={state.list} deleteContact={deleteContact} />
		</div>
	);
};

export default App;
