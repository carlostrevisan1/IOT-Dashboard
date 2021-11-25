import { AxiosResponse } from "axios";
import { DeviceItemsSchema, EditFeatureSchema, NewFeatureSchema } from "../constants/device";
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

  async saveFeature(newFeature: NewFeatureSchema){
    const res = api.post<NewFeatureSchema, AxiosResponse<boolean>>(`/create_feature`, newFeature)
        .then(res => res.data)
        .catch((error) =>  false);

        return res
  }

  async editFeature(editFeature: EditFeatureSchema){
    const res = api.put<EditFeatureSchema, AxiosResponse<boolean>>(`/update_feature`, editFeature)
        .then(res => res.data)
        .catch((error) =>  false);

        return res
  }

  async deleteFeature(feature_id: number){
    const res = api.delete<{feature_id: number}, AxiosResponse<boolean>>(`/delete_feature`, {data: {feature_id}})
        .then(res => res.data)
        .catch((error) =>  false);

        return res
  }
}