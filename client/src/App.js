import './App.css';
import React from 'react';
import LandingPage from './components/LandingPage/LandingPage.jsx';
import { Route } from "react-router-dom";
import Home from './components/Home/Home.jsx';
import CreatePokemon from './components/CreatePokemon/CreatePokemon';
import PokemonDetails from './components/Details/Details';



function App() {
  return (
    <div>
      <Route exact path="/">
        <LandingPage />
      </Route>
      <Route exact path="/home">
        <Home />
      </Route>
      <Route exact path="/create">
        <CreatePokemon />
      </Route>
      <Route exact path="/pokemon/:id">
        <PokemonDetails/>
      </Route>

    </div>
  );
}
export default App;
