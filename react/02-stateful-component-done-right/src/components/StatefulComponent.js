import { useState, useEffect } from 'react';

const StatefulComponent = () => {
    const [state, setState] = useState({ count: 0 });
    
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