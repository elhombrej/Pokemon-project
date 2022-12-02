import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import LandingPage from './components/LandingPage/LandingPage';
import Home from './components/Home/Home';
import PokemonCreate from './components/PokemonCreate/PokemonCreate';
import PokemonDetails from './components/PokemonDetails/PokemonDetails'

function App() {
  return (
    <BrowserRouter>
    <div className="App">
    <h2>Proyecto Individual</h2>

      <Switch>
        <Route exact path= '/' component= {LandingPage}/>
        <Route exact path= '/home' component= {Home}/>
        <Route exact path= '/pokemon/create' component= {PokemonCreate}/>
        <Route exact path= '/details/:id' component= {PokemonDetails}/>
      </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
