import React from 'react';
import logo from './logo.svg';
import './App.css';
import { ListOfItems } from './components/list';

function App() {
  return (
    <div className="App">
      <header className="App-header">
       <ListOfItems />
      </header>
    </div>
  );
}

export default App;
