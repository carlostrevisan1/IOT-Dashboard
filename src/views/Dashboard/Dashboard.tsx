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



let CardMOCK : DeviceItemsSchema[]= [
  {
    
    ip_address: "1", 
    port: "1",
    id: 1,
    user_id: 0,
    name: "Fita led- quarto campo casa", 
    desc: "1", 
    colour: "1",
    features:[{
      id: 0,
      name: "BotaoLigar",
      topic: "Teste",
      type: featuresTypeEnums.slider,
      value: "liga ai",
      device_id: 1,
    },
    {
      id: 0,
      name: "BotaoLigar",
      topic: "Teste",
      type: featuresTypeEnums.text,
      value: "liga ai",
      device_id: 1,
    },
    {
      id: 0,
      name: "BotaoLigar",
      topic: "Teste",
      type: featuresTypeEnums.switch,
      value: "liga ai",
      device_id: 1,
    },
    {
      id: 1,
      name: "BotaoLigar",
      topic: "Teste",
      type: featuresTypeEnums.button,
      value: "liga ai",
      device_id: 1,
    }]
  },
 
  
  
]

// let CardMOCK2 : DeviceSchema[]= [
//   {
//     broker: {
//       ip: "3", 
//       port: "3",
//     },
//     device: {
//       name: "3", 
//       description: "3", 
//       color: "3",
//     }
//   },
//   {
//     broker: {
//       ip: "4", 
//       port: "4",
//     },
//     device: {
//       name: "4", 
//       description: "4", 
//       color: "4",
//     }
    
//   },
  
// ]

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

      <LateralMenu handleSaveDevice={handleSaveDevice}/>

      <div className="dashboard"  >
      
      {cards?.map(x => {
          return <StandardCard 
                  deviceTitle={x.name} 
                  features={x.features}  
                  key={x.ip_address}
                  colour={x.colour}
                  />
        })}
      </div>


    </div>
  );
}

