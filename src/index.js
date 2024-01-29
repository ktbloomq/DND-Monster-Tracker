import React from 'react';
import ReactDOM from 'react-dom/client';
// import './css/main.css';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap'
import reportWebVitals from './reportWebVitals';
import Monsters from './Monsters';

const root = ReactDOM.createRoot(document.getElementById('root'));

document.body.classList.add("bg-dark")
root.render(
  <React.StrictMode>
      <Monsters />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
