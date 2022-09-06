import { useState } from 'react';
import './ContactList.css';

const ContactList = (props) => {
	const [state,setState] = useState({
		removeIndex: -1,
		editIndex: -1,
    id: -1,
    name: '',
    email: '',
    phone: ''
	});

	const changeToRemoveMode = (index) => {
		setState((state) =>({
      ...state,
			removeIndex: index,
			editIndex: -1
		}));
	};

	const changeToEditMode = (index, contact) => {
		setState({
      removeIndex: -1,
      editIndex: index,
      id: contact.id,
      name: contact.name,
      email: contact.email,
      phone: contact.phone
    });
	};

	const changeToViewMode = () => {
		setState({
			removeIndex:-1,
      editIndex:-1,
      id: -1,
      name: '',
      email: '',
      phone: ''
		});
	};
	
	const deleteContact = (id) => {
		props.deleteContact(id);
		changeToViewMode();
	}

  const saveContact = () => {
    let contact = {
      id: state.id,
      name: state.name,
      email: state.email,
      phone: state.phone
    }
    props.editContact(contact);
    changeToViewMode();
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((state) => ({
      ...state,
      [name]: value
    }));
  };

  let contacts = props.contacts.map((contact, index) => {
    if (state.removeIndex === index) {
      return (
        <tr key={contact.id}>
          <td>{contact.name}</td>
          <td>{contact.email}</td>
          <td>{contact.phone}</td>
          <td><button onClick={() => changeToViewMode() }>Cancel</button></td>
          <td><button onClick={() => deleteContact(contact.id) }>Confirm</button></td>
        </tr>
      );
    } else if(state.editIndex === index) {
      return (
        <tr key={contact.id}>
          <td><input type="text" name="name" value={state.name} onChange={handleChange} /></td>
          <td><input type="email" name="email" value={state.email} onChange={handleChange} /></td>
          <td><input type="tel" name="phone" value={state.phone} onChange={handleChange} /></td>
          <td><button onClick={() => changeToViewMode() }>Cancel</button></td>
          <td><button onClick={() => saveContact() }>Save</button></td>
        </tr>
      );
    } else {
      return (
        <tr key={contact.id}>
          <td>{contact.name}</td>
          <td>{contact.email}</td>
          <td>{contact.phone}</td>
          <td><button onClick={() => changeToEditMode(index, contact) }>Edit</button></td>
          <td><button onClick={() => changeToRemoveMode(index) }>Delete</button></td>
        </tr>
      );
    }
  });
  
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>{contacts}</tbody>
    </table>
  );
};

export default ContactList;