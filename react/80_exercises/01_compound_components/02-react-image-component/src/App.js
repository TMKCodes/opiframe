import logo from './logo.svg';
import './App.css';
import FancyImage from './FancyImage';
import flower from './Flower_11.jpg';

// TODO: Read about importing images into React Applications using create-react-app. Import Flower_11.jpg properly. https://create-react-app.dev/docs/adding-images-fonts-and-files/
// Add a suitable description as a prop.

function App() {
  return (
    <div className="App">
		<FancyImage src={flower} text="Flower"/>
    </div>
  );
}

export default App;
