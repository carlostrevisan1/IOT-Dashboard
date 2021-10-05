import { Button } from 'antd';
import React, { useState } from 'react';
import { Redirect, useHistory } from "react-router-dom";
import { Login } from '../../components/Login/Login';
import SignUpModal from '../../components/SignUpModal/SignUpModal';
import './App.css';
import logo from './logo.svg'

type LoginObj = {
  password: string,
  username: string,
}

function App() {
  let hist = useHistory();
  const [showModal, setShowModal] = useState(false)
  
  const handleLogin = (values: LoginObj) => {
    console.log(values)
    hist.push('Dashboard')
  }

  const handleShowSignUpModal = () => {
    setShowModal(!showModal)
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo"/>
        <h1 id="title">
          IOT-Dashboard 
        </h1>

        <Login onSubmit={handleLogin}/>
        <Button onClick={handleShowSignUpModal}>Cadastre-se</Button>

      </header>
      <SignUpModal visible = {showModal} handleSave = {console.log} handleClose = {handleShowSignUpModal}></SignUpModal>
    </div>

  );
}

export default App;
