import { DeviceItemsSchema } from "../constants/device";
import api from "../services/api";

export class DeviceService{
  async getDevices(userId: number){
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