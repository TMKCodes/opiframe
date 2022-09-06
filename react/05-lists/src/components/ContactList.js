import './ContactList.css';

const ContactList = (props) => {

  let contacts = props.contacts.map((contact) => (
    <tr key={contact.id}>
      <td>{contact.name}</td>
      <td>{contact.email}</td>
      <td>{contact.phone}</td>
      <td><button onClick={() => props.deleteContact(contact.id) }>Delete</button></td>
    </tr>
  ));
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>{contacts}</tbody>
    </table>
  );
};

export default ContactList;