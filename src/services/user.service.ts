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
}