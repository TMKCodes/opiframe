import './App.css';
import ContactCard from './Components/ContactCard';
import NamedChildren from './Components/NamedChildren';

function App() {
  return (
    <div className="App">
      <ContactCard>
        <h3>Mr. Whiskerson</h3>
        <p>Phone: (212) 555-1234</p>
        <p>Email: loller</p>
      </ContactCard>
      <NamedChildren header={<h3>Mr. Whiskerson</h3> }
                      media={<img src="http://placekitten.com/300/200" alt="kitty" />}
                      content={ <p>Phone: (212) 555-1234</p> } />
      
    </div>
  );
}

export default App;
