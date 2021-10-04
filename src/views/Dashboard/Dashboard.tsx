import { List, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import LateralMenu from '../../components/Menu/Menu';
import StandardCard from '../../components/StandardCard/StandardCard';
import { DeviceSchema } from '../../constants/device';
import './styles.css'


let CardMOCK : DeviceSchema[]= [
  {
    broker: {
      ip: "1", 
      port: "1",
    },
    device: {
      name: "Fita led- quarto campo casa florida", 
      description: "1", 
      color: "1",
    }
  },
  {
    broker: {
      ip: "2", 
      port: "2",
    },
    device: {
      name: "2", 
      description: "2", 
      color: "2",
    }
    
  },
  {
    broker: {
      ip: "1", 
      port: "1",
    },
    device: {
      name: "1", 
      description: "1", 
      color: "1",
    }
  },
  {
    broker: {
      ip: "2", 
      port: "2",
    },
    device: {
      name: "2", 
      description: "2", 
      color: "2",
    }
    
  },
  
  
]

let CardMOCK2 : DeviceSchema[]= [
  {
    broker: {
      ip: "3", 
      port: "3",
    },
    device: {
      name: "3", 
      description: "3", 
      color: "3",
    }
  },
  {
    broker: {
      ip: "4", 
      port: "4",
    },
    device: {
      name: "4", 
      description: "4", 
      color: "4",
    }
    
  },
  
]

export default function Dashboard() {
  let hist = useHistory();
  
  const [cards, setCards] = useState<DeviceSchema[]>(CardMOCK);

  function loadCards(){
    // setCards(CardMOCK2);
    // setTimeout(()=>{
    //   console.log(cards)
    // }, 1000)
  }

  const handleSaveDevice = (newDevice: DeviceSchema) => {
    setCards([...cards, newDevice]);
  }
  
  useEffect(() => {
    loadCards();    
  }, [cards])

  return (
    <div style={{flexDirection: "row", display: 'flex'}}>

      <LateralMenu handleSaveDevice={handleSaveDevice}/>

      <div className="dashboard" >
      {cards?.map(x => {
          return <StandardCard deviceTitle={x.device.name} key={x.broker.ip}/>
        })}
      {/* <List
        grid={{ gutter: 25, column: 4 }}
        itemLayout={ 'horizontal'}
        dataSource={cards}
        split
        renderItem={item => (
          <List.Item style={{marginLeft: 5}}>
            <StandardCard deviceTitle={item.device.name} key={item.broker.ip}/>
          </List.Item>
      )}
      /> */}
      </div>


    </div>
  );
}

