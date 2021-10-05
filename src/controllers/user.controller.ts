import React from 'react'
import { UserFetched } from '../constants/user'
import api from '../services/api'

type RequestObjectType = {
  email: string, 
  password: string,
}

export class UserController {

  static async userLogin(req: RequestObjectType){

      const result = await api.post<RequestObjectType, UserFetched>("/login", req)
                      .then(x => {
                        console.log(x);
                        return true
                      })
                      .catch(() => {
                        return false
                      })
      console.log(result)
      return result
  }

}