//components for tarot game
import {Routes, Route, Link, useParams} from 'react-router-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import {MyApp} from "./TarotGame.js";

function App() {
    
return (
	<Router>
      <MyApp />
	</Router>
  );
}

export default App;