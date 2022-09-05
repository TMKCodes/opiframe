import { useState, useEffect } from 'react';

const StatefulComponent = () => {
    let [state, setState] = useState({ seconds: 0, timer: 0});

    const startTimer = () => {
        setState((state) => {
            return {
                ...state,
                seconds:state.seconds + 1
            }
        });
    };

    const clearTimer = () => {
        clearInterval(state.timer);
        setState((state) => {
            return {
                ...state,
                seconds: 0,
                timer: 0
            }
        });
    }

    useEffect(() => {
        console.count("useEffect");
        let timer = setInterval(startTimer, 1000);
        setState((state) => {
            return {
                ...state,
                timer: timer
            }
        });
        return () => {
            clearInterval(timer);
            setState((state) => {
                return {
                    ...state,
                    seconds: 0,
                    timer: 0
                }
            });
        };
    }, []);

    return (
        <div>
            <h1>Seconds {state.seconds} since you entered the page.</h1>
            <button onClick={ clearTimer }>Stop Timer</button>
        </div>
    )
}

export default StatefulComponent;