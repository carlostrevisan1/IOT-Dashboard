import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, useHistory } from 'react-router-dom'
import reportWebVitals from './reportWebVitals';
import Routes from './routes/Routes';
import './index.css';


ReactDOM.render(
  <BrowserRouter >
    <div className="App">
      <Routes/>
    </div>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
