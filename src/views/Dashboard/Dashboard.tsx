import { List, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import LateralMenu from '../../components/Menu/Menu';
import StandardCard from '../../components/StandardCard/StandardCard';
import { DeviceItemsSchema, DevicesSchema } from '../../constants/device';
import { featuresTypeEnums } from '../../constants/featureTypes';
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

export default function Dashboard() {
  let hist = useHistory();
  
  const [cards, setCards] = useState<DeviceItemsSchema[]>(CardMOCK);

  function loadCards(){
    // setCards(CardMOCK2);
    // setTimeout(()=>{
    //   console.log(cards)
    // }, 1000)
  }

  const handleSaveDevice = (newDevice: DeviceItemsSchema) => {
    setCards([...cards, newDevice]);
  }
  
  useEffect(() => {
    loadCards();    
  }, [cards])

  return (
    <div style={{flexDirection: "row", display: 'flex', alignItems: "stretch", height: "100%"}}>

      <LateralMenu handleSaveDevice={handleSaveDevice}/>

      <div className="dashboard"  >
      
      {cards?.map(x => {
          return <StandardCard deviceTitle={x.name} features={x.features}  key={x.ip_address}/>
        })}

      {/* <List
        grid={{ gutter: 16, column: 4 }}
        style={{width: "calc(100% - 10px)"}}
        itemLayout={ 'horizontal'}
        dataSource={cards}
        renderItem={item => (

          <List.Item style={{marginLeft: 5}}>

            <StandardCard features={item.features} deviceTitle={item.device.name} key={item.broker.ip}/>

          </List.Item>
      )}
      /> */}
      </div>


    </div>
  );
}

