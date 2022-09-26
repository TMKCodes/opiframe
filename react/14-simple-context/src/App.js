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
    <div className="App">
      <ThemeContext.Provider value={state.theme}>
        <Headline>Dark Theme</Headline>
        <Paragraph>This is a paragraph in the dark theme.</Paragraph>
        <ThemeButton toggleTheme={toggleTheme} />
      </ThemeContext.Provider>
    </div>
  );
}

export default App;
