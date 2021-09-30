import React from 'react';
import { Redirect, useHistory } from "react-router-dom";
import { Login } from '../../components/Login/Login';
import './App.css';
import logo from './logo.svg'

type LoginObj = {
  password: string,
  username: string,
}

function App() {
  let hist = useHistory();
  
  const handleLogin = (values: LoginObj) => {
    console.log(values)
    hist.push('Dashboard')
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo"/>
        <h1 id="title">
          IOT-Dashboard 
        </h1>

        <Login onSubmit={handleLogin}/>

      </header>
    </div>
  );
}

export default App;
