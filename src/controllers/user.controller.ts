import React from 'react'
import { NewUserSchema, UserFetched, UserSchema } from '../constants/user'
import api from '../services/api'

type RequestObjectType = {
  email: string, 
  passw: string,
}

export class UserController {

  static async userLogin(email: string, passw: string){
      const path = `/login`;

      const result = await api.get<UserFetched>(path, 
        {
          params: {
            email,
            passw
          }  
        })
        .then( res => {
          
          return res.data
        })
        .catch(({ response }) => {
          throw new Error(response.status);
        });
        

      return result;
  }

  static userSignUp(newUser: NewUserSchema){

    const path = `/create_user`;

    console.log(newUser.user);

    const result = 
        api.post<UserSchema, boolean>(path, newUser.user)
        .then(res =>  res)
        .catch((error) =>  false)
    
    return result;
    
  }

}