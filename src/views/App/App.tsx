import { Button, notification } from 'antd';
import React, { useState } from 'react';
import { Redirect, useHistory } from "react-router-dom";
import { Login } from '../../components/Login/Login';
import SignUpModal from '../../components/SignUpModal/SignUpModal';
import { NewUserSchema, UserFetched } from '../../constants/user';
import { UserController } from '../../controllers/user.controller';
import './App.css';
import logo from './logo.svg'

type LoginObj = {
  passw: string,
  email: string,
}

function App() {
  let hist = useHistory();

  const [showModal, setShowModal] = useState(false);
  
  const handleLogin = async (values: LoginObj) => {
    const result = await UserController.userLogin(values.email, values.passw);

    console.log(result);
    
    if(result.login_status > 0){
      hist.push('Dashboard', {user: result})
    }
    else {
      notification.open({
        message: result.error,
        description: "Senha ou usuário inválidos.",
        style:{backgroundColor: "#670000"},
      })
    }
  }


  const handleSendToSave = async (newUser: NewUserSchema) => {

    const result = await UserController.userSignUp(newUser);
    if(result){
      notification.open({
        message: "Conta criada com Sucesso!!",
        description: "Por favor, realize o login!",
        style:{backgroundColor: "#006700"},
      })
    }
    else{
      notification.open({
        message: "Falha ao criar conta!",
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

        <Login onSubmit={handleLogin} onSignUp={handleShowSignUpModal}/>

      </header>

      <SignUpModal visible = {showModal} handleSave={handleSendToSave} handleClose = {handleShowSignUpModal}></SignUpModal>
    </div>

  );
}

export default App;
