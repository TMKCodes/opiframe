import { useState, useEffect } from 'react';

const StatefulComponent = () => {
    const [state, setState] = useState({ count: 0 });
    
    // Oikein tehty useEffect toimii vaikka strictMode on päällä
    // https://reactjs.org/docs/strict-mode.html#detecting-unexpected-side-effects

    useEffect(() => {
        // Voisi käyttää setTimeout, mutta kerran Opettaja käytti setInterval, joten käytän sitä.
        const interval = setInterval(() => {
            setState(state => ({ count: state.count + 1 }));
        }, 1000);
        return () => {
            clearInterval(interval);
        };
    }, []);
    
    return (
        <div>
            <p>Seconds {state.count} since you entered the page.</p>
            <button onClick={() => setState({ count: 0 })}>Reset timer</button>
        </div>
    );
};

export default StatefulComponent;