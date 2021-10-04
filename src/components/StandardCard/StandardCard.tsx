import React from 'react';
import { Badge, Card, Menu, Slider, Switch, Typography } from 'antd';
import {
  MailOutlined,
  CalendarOutlined,
  AppstoreOutlined,
  SettingOutlined,
  LinkOutlined,
} from '@ant-design/icons';
import { Header } from 'antd/lib/layout/layout';

type Props = {
  deviceTitle: string;
}

export default function StandardCard({ deviceTitle }: Props){


  return (
    <div style={{marginLeft: 10,}}>
      <Card style={{ width: 300, borderRadius: 30}} >
        
        <Header  style={{backgroundColor: "#282c34", 
                        flexDirection: 'row', 
                        display: 'flex', 
                        borderRadius: 100, 
                        padding: 0,

                        }}>
          <div style={{width:"100%", backgroundColor: '#177ddc', borderRadius: 100 }}>

            <Typography>{deviceTitle}</Typography>

          </div>
          <div style={{width: "30%", cursor: "pointer"}} onClick={(v)=> console.log(v)} >

            <SettingOutlined/> 
            
          </div>

        </Header>
          
        <div>
          <Typography>Teste</Typography>
        </div>
        <Slider/>
        <Switch/>
      </Card>
    </div>
  );
};