import { Button, notification } from 'antd';
import React, { useState } from 'react';
import { Redirect, useHistory } from "react-router-dom";
import { Login } from '../../components/Login/Login';
import SignUpModal from '../../components/SignUpModal/SignUpModal';
import { UserController } from '../../controllers/user.controller';
import './App.css';
import logo from './logo.svg'

type LoginObj = {
  password: string,
  email: string,
}

function App() {
  let hist = useHistory();
  const [showModal, setShowModal] = useState(false)
  
  const handleLogin = async (values: LoginObj) => {
    
    const result = await UserController.userLogin(values);

    if(true){

      hist.push('Dashboard')
    }
    else {
      notification.open({
        message: "Login Inválido",
        description: "Por favor, tente novamente.",
        style:{backgroundColor: "#670000"},
      })
    }
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
