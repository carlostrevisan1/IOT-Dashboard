import { debug } from "../constants/debug";
import { DeviceItemsSchema, EditFeatureSchema, NewDeviceSchema, NewFeatureSchema } from "../constants/device";
import api from "../services/api";
import { DeviceService } from "../services/device.service";


const service = new DeviceService();
export class DeviceController {

  static saveDevice(newDevice: NewDeviceSchema, userId: number){
    //TODO ARRUMAR -  PASSA PRO SERVICE
    const path = `/create_device`;
    
    const reqObj = {...newDevice, user_id: userId};


    const result = 
        api.post<NewDeviceSchema, boolean>(path, reqObj)
        .then(res => res)
        .catch((error) =>  false);

    return result;
  }

  static async getDevices(userId: number){
    if(debug){
      return [
        {
          id: 0,
          name: 'Teste', 
          desc: 'Descricao teste', 
          colour: '#990949',
          user_id: 1,
          ip_address: '192.168.0.05', 
          port: '5080',
          features: [
            {
              id: 1, 
              name: 'teste', 
              topic: 'Teste', 
              type: 1, 
              value: '', 
              device_id:0
            },
            {
              id: 2, 
              name: 'teste2', 
              topic: 'Teste2', 
              type: 2, 
              value: '111', 
              device_id:0
            }
          ],
        }
      ]
    }

    try{
      const res = await service.getDevices(userId);
      return res

    }
    catch(error){
      console.log(error);
    }

  }

  static async saveFeature(newFeature: NewFeatureSchema){
    const res = service.saveFeature(newFeature);

    return res;
  }

  static async editFeature(editFeature: EditFeatureSchema){
    const res = service.editFeature(editFeature);

    return res;
  }

  static async deleteFeature(feature_id: number){
    const res = service.deleteFeature(feature_id);

    return res;
  }
}