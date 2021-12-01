import { AxiosResponse } from 'axios';
import { UserFetched } from '../constants/user';
import api from '../services/api'


export class UserService {
  async login(email: string, passw: string){
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
      .catch((err) => {
        throw new Error(err);
      });

      return result
  }

  async changePass(passw: string, user_id: number){
    const res = api.put<{user_id: number, passw: string}, AxiosResponse<boolean>>(`/update_user`, {user_id, passw})
        .then(res => res.data)
        .catch((error) =>  false);

        return res
  }
}