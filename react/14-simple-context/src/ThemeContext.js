import { createContext } from 'react';

export const themes = {
  light: {
    color: "white",
    backgroundColor: "#d3d3d3"
  },
  dark: {
    color: "black",
    backgroundColor: "#595959"
  }
}

export const ThemeContext = createContext(themes.dark);

ThemeContext.displayName = "ThemeContext";
