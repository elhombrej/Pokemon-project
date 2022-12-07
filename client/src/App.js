import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import LandingPage from './components/LandingPage/LandingPage';
import Home from './components/Home/Home';
import PokemonCreate from './components/PokemonCreate/PokemonCreate';
import PokemonDetails from './components/PokemonDetails/PokemonDetails';
import PageNotFound from './components/PageNotFound/PageNotFound';
import axios from 'axios';
axios.defaults.baseURL = 'https://pi-pokemon-main-production-a050.up.railway.app/'
//'https://pi-pokemon-main-production-a050.up.railway.app/'
//'http://localhost:3001/'
function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
        <Route exact path= '/' component= {LandingPage}/>
        <Route exact path= '/home' component= {Home}/>
        <Route exact path= '/pokemon/create' component= {PokemonCreate}/>
        <Route exact path= '/details/:id' component= {PokemonDetails}/>
        <Route path="*" component={PageNotFound} />
      </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
