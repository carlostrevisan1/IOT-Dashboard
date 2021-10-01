import React from 'react';
import { Card, Menu, Slider, Switch, Typography } from 'antd';
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
    <div style={{marginLeft: 10}}>
      <Card style={{ width: 300}}>
        <Header style={{backgroundColor: "#282c34"}}>{deviceTitle}</Header>
        <div>
          <Typography>valor</Typography>
        </div>
        <Slider/>
        <Switch/>
      </Card>
    </div>
  );
};