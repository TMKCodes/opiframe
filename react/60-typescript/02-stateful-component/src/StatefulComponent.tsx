import React, { useState, useEffect } from 'react';

interface State {
  seconds: number;
  timer: ReturnType<typeof setInterval> | null;
}

const StatefulComponent: React.FC<{}> = () => {
  const [state, setState] = useState<State>({} as State);

  const startTimer = (): void => {
    setState({
      seconds: 0,
      timer: setInterval(() => {
        setState(state => ({ ...state, seconds: state.seconds + 1 }));
      }, 1000),
    });
  }

  useEffect(() => {
    let interval = setInterval(startTimer, 1000);
    setState((state) => ({ ...state, timer: interval }));
    return () => {
      clearInterval(interval);
    }
  }, []);

  return (
    <div>
      <h1>Stateful Component</h1>
      <p>Seconds: {state.seconds}</p>
    </div>
  );
}

export default StatefulComponent;