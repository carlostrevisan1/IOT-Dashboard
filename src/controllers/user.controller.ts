import { debug } from '../constants/debug';
import { NewUserSchema, UserFetched, UserSchema } from '../constants/user'
import api from '../services/api'
import { UserService } from '../services/user.service';

type RequestObjectType = {
  email: string, 
  passw: string,
}

const service = new UserService();
export class UserController {

  static async userLogin(email: string, passw: string){
    if(debug){
      return {
        login_status: 1,
        devices: [
          {
            id: 0,
            name: 'Teste', 
            desc: 'Descricao teste', 
            colour: '#990949',
            user_id: 1,
            ip_address: '192.168.0.05', 
            port: '5080',
            features: undefined,
          }
        ]
      }
    }

    try{
      const res = await service.login(email, passw);

      return res;
    }
    catch(error){
      console.log(error)

      return {login_status: false, error: error};
    }
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