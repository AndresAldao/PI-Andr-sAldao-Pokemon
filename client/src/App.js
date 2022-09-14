import './App.css';
import React from 'react';
import Country from './components/country.jsx';

function  App(){
  return (
    <div className="App">
      <header className="App-header">
        <Country/>
      </header>
    </div>
  );
}


/*   const {name} = country();
  return (
    <div className="App">
      <p>{name}</p>
      <h1>Henry Countries</h1>
    </div>
  );
} */

export default App;
