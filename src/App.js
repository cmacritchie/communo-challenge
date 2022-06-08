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
      <div className='App-content'>
        <header className="App-header">
          <div className="card-panel communo-red">
            <h3>Craig's To Do Web App </h3>
          </div>
        </header>
     
          <TodoArea key="keyArea" />
          <TodoList />
     
      </div>
    </div>
  );
}

export default App;
