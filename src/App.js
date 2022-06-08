import React from 'react';
import M from 'materialize-css' //need for materilze js
import TodoArea from './components/TodoArea';
import TodoList from './components/TodoList';
import { db } from './db/db'

import 'materialize-css/dist/css/materialize.min.css'
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
       
        <div className="card-panel teal lighten-2">This is a card panel with a teal lighten-2 class</div>
        
      </header>
      <TodoArea key="keyArea" />
      <TodoList />
    </div>
  );
}

export default App;
