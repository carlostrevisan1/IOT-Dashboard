import { DeviceItemsSchema, NewDeviceSchema } from "../constants/device";
import api from "../services/api";


export class DeviceController {

  static saveDevice(newDevice: NewDeviceSchema, userId: number){
    const path = `/create_device`;
    
    const reqObj = {...newDevice, user_id: userId};


    const result = 
        api.post<NewDeviceSchema, boolean>(path, reqObj)
        .then(res => res)
        .catch((error) =>  false);

    return result;
  }

  static async getDevices(userId: number){
    const path = `/get_user_info`

    const result = await api.get<DeviceItemsSchema[]>(path,
        {
          params:{ 
            user_id: userId
          }
        })
        .then(res => res.data)
        .catch(({ response }) => {
          throw new Error(response.status);
        });

    return result
  }

}