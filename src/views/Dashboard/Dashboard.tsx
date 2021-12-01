import { notification } from 'antd';
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from "react-router-dom";
import LateralMenu from '../../components/Menu/Menu';
import StandardCard from '../../components/StandardCard/StandardCard';
import { DeviceItemsSchema, DevicesSchema, NewDeviceSchema } from '../../constants/device';
import { featuresTypeEnums } from '../../constants/featureTypes';
import { UserFetched } from '../../constants/user';
import { DeviceController } from '../../controllers/device.controller';
import './styles.css'


type NewPass = {
  nPass: string;
  confirmPass: string;
}


type locationParams = {
  user: UserFetched
}

export default function Dashboard() {
  let location = useLocation<locationParams>();
  
  const [user, setUser] = useState<UserFetched>(location.state.user);
  const [cards, setCards] = useState<DeviceItemsSchema[]>();

  async function loadCards(){
    const result = await DeviceController.getDevices(user ? user.login_status : 0);
    setCards(result)
  }

  const handleSaveNewPass = async (newPass: NewPass) => {
    console.log(newPass)
  }

  const handleSaveDevice = async (newDevice: NewDeviceSchema) => {

    const result = await DeviceController.saveDevice(newDevice, user ? user.login_status : 0)

    //TODO CHECAR ESSA TIPAGEM DO RESULT
    if(result){
      notification.open({
        message: "Device criado com sucesso!!",
        description: "",
        style:{backgroundColor: "#006700"},
      })
      loadCards();
    }
    else{
      notification.open({
        message: "Falha ao criar device!",
        description: "Por favor, tente novamente.",
        style:{backgroundColor: "#670000"},
      })
    }
  }
  
  useEffect(() => {
    loadCards();    
  }, [cards?.length])

  return (
    <div style={{flexDirection: "row", display: 'flex', alignItems: "stretch", height: "100%"}}>

      <LateralMenu handleSaveDevice={handleSaveDevice} handleSaveNewPass={handleSaveNewPass}/>

      <div className="dashboard"  >
      
      {cards?.map(x => {
          return <StandardCard 
                  deviceTitle={x.name} 
                  features={x.features}  
                  key={x.ip_address}
                  colour={x.colour}
                  deviceId={x.id}
                  loadCards={loadCards}
                  brokerIp={x.ip_address}
                  brokerPort={x.port}
                  device={x}
                  />
        })}
      </div>


    </div>
  );
}

