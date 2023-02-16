import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';


// const DATA = [
//   {id: 'todo-0', name:'Eat', completed: true},
//   {id: 'todo-1', name:'Sleep', completed: false},
//   {id: 'todo-2', name:'Repeat', completed: false},
// ]

// localStorage.setItem('tasks', JSON.stringify(DATA))
const DATA = JSON.parse(localStorage.getItem('tasks')) || []

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App tasks={DATA} />
  </React.StrictMode>
);


serviceWorkerRegistration.register();
