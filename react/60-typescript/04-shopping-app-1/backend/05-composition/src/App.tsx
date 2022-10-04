import React from 'react';
import './App.css';
import ContactCard from './components/ContactCard';
import NamedChildrenCard from './components/NamedChildren';

function App() {
  return (
    <div className="App">
      <ContactCard>
        <div>
          <h5>Toni Lukkaroinen</h5>
          <p>Phone: 555-555-5555</p>
        </div>
        
      </ContactCard>
      <NamedChildrenCard 
        header={<h5>Toni Lukkaroinen</h5>} 
        media={<img src="https://placekitten.com/150/75" alt="cat" />}
        content={<p>Call me at 555-555-5555</p>}/>
      <NamedChildrenCard 
        header={<h5>Toni Lukkaroinen</h5>} 
        content={<p>Call me at 555-555-5555</p>}/>
    </div>
  );
}

export default App;
