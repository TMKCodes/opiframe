import { useState } from 'react';
import './ContactForm.css';


const ContactForm = (props) => {
  const [state, setState] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((state) => ({
      ...state,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.addContact({ ...state});
    setState({
      name: '',
      email: '',
      phone: ''
    });
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name</label>
      <input
        type="text"
        name="name"
        id="name"
        placeholder="Your name"
        value={state.name}
        onChange={handleChange}
      />
      <label htmlFor="email">Email</label>
      <input
        type="email"
        name="email"
        id="email"
        placeholder="Email address"
        value={state.email}
        onChange={handleChange}
      />
      <label htmlFor="phone">Phone</label>
      <input
        type="tel"
        name="phone"
        id="phone"
        placeholder="Phone number"
        value={state.phone}
        onChange={handleChange}
      />
      <button type="submit">Add Contact</button>
    </form>
  );
};

export default ContactForm;