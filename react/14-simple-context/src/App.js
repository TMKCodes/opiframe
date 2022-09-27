import './App.css';
import { useState } from 'react';
import { ThemeContext, themes } from './ThemeContext';
import Headline from './Headline';
import Paragraph from './Paragraph';
import ThemeButton from './ThemeButton';


function App() {
  const [state, setState] = useState({
    theme: themes.dark
  });

  const toggleTheme = () => {
    setState({
      theme: state.theme === themes.dark ? themes.light : themes.dark
    });
  };

  return (
    <ThemeContext.Provider value={state.theme}>
      <div className="App">
        <Headline>Theme changers</Headline>
        <Paragraph>This is theme changer with React context, so please click the theme button to see it in action.</Paragraph>
        <ThemeButton toggleTheme={toggleTheme} />
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
