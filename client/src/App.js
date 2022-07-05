import './App.css';
import Landing from './components/Landing';
import { Route, Switch } from 'react-router-dom';
import Nav from './components/Nav';
import Home from './components/Home';
import DogDetails from './components/DogDetails';
import CreateDog from './components/CreateDog';
import NotFound from './components/NotFound';
import SuccessCreated from './components/SuccessCreated';

function App() {
  return (
    <div className="App">
      <Nav />
      <Switch>
        <Route exact path="/" component={() => <Landing />} />
        <Route exact path="/dogs/home" component={() => <Home />} />
        <Route exact path="/dogs/create_dogs" component={(props) => <CreateDog {...props} />} />
        <Route exact path="/dogs/create_dogs/Success" component={(props) => <SuccessCreated {...props} />} />
        <Route exact path="/dogs/dont_found/404" component={(props) => <NotFound {...props} />} />
        <Route exact path="/dogs/:id" component={(props) => <DogDetails {...props} />} />
        <Route exact path="*" component={(props) => <NotFound {...props} />} />
      </Switch>
      
    </div>
  );
}

export default App;
