import React, { useState } from 'react';
import { Badge, Button, Card, Menu, Slider, Switch, Typography } from 'antd';
import {
  MailOutlined,
  CalendarOutlined,
  AppstoreOutlined,
  SettingOutlined,
  LinkOutlined,
} from '@ant-design/icons';
import { Header } from 'antd/lib/layout/layout';
import { FeaturesSchema } from '../../constants/device';
import StandardInput from '../StandardInput/StandardInput';
import FeaturesModal from '../FeaturesModal/FeaturesModal';
import { cursorTo } from 'readline';

type Props = {
  deviceTitle: string;
  features?: FeaturesSchema[];
  colour: string;
}

export default function StandardCard({ deviceTitle, features, colour }: Props){

  const [showEditModal, setShowEditModal] = useState(false)
  const [spinSettings, setSpin] = useState(false);


  function handleEditModal(){
    setShowEditModal(!showEditModal);
  }

  function handleCreateFeatures(){
    const toAddFeats = features?.map( feat => {
      switch(feat.type){
        case 1:
            return <Button>{feat.name}</Button>
          break;
        case 2:
          return <Switch/>
          break;
        case 3: 
          return <Slider/>
          break;
        case 4:
          return <StandardInput label={feat.name}/>
        default: 
          return;
          
      }
    })
    return toAddFeats;
  }

  return (
    <div style={{ 
      marginLeft: 5, 
      flexGrow: 1,
      maxWidth: 350,
      minWidth: 350,
      flexShrink: 0,
      marginTop: 10,
      }}>

      <Card style={{ 
        borderRadius: 10, 
        background: `linear-gradient(182deg, ${colour} 65px, #1f1f1f 66px)`,
        
        }} >
        
        <Header  style={{
          flexDirection: 'row', 
          display: 'flex', 
          padding: 0,
          backgroundColor: "transparent",
          marginTop: -27,
          marginBottom: 20,
          }}>

            <Typography style={{
              textOverflow: "ellipsis",
              overflow: "hidden",
              whiteSpace: "nowrap",
              fontWeight: 600,
              fontSize: "1.2rem",
              width: "calc(100% - 30px)",
              
            }}>{deviceTitle}</Typography>

          <span style={{
            // marginTop: "25px",
            marginLeft: "12px",
            fontSize: "20px",
            cursor: "pointer",
          }}>
            <SettingOutlined 
              onClick={handleEditModal}
              spin={spinSettings}
              onMouseEnter={() => setSpin(!spinSettings)}
              onMouseLeave={() => setSpin(!spinSettings)}
            /> 
          </span>
          

        </Header>
          
        <div style={{marginTop: 10}}>
          {handleCreateFeatures()}
        </div>
      </Card>
      <FeaturesModal handleClose={handleEditModal} visible={showEditModal} handleSave={(va) => {console.log(va)}}/>
    </div>
  );
};