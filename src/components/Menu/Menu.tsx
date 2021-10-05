import React, { useState } from 'react';
import { Image, Menu, Typography } from 'antd';
import {
  RobotFilled,
  AppstoreOutlined,
  SettingOutlined,
  LoginOutlined
} from '@ant-design/icons';
import SubMenu from 'antd/lib/menu/SubMenu';
import { Header } from 'antd/lib/layout/layout';
import logo from "./ic_launcher.png"
import { useHistory } from 'react-router-dom';
import DeviceModal from '../DeviceModal/DeviceModal';
import { DeviceItemsSchema } from '../../constants/device';

type CardsSchema = {
  deviceTitle: string,
}


type Props ={
  handleSaveDevice: (newDevice: DeviceItemsSchema) => void;
}

export default function LateralMenu({handleSaveDevice} : Props){
  
  const [showDeviceModal, setShowDeviceModal] = useState(false)
  let hist = useHistory();

  
  const handleCloseDeviceModal = () => {
    setShowDeviceModal(false);
  }

  return (
    <div style={{backgroundColor: "#1f1f1f"}}>
      <Image  src={logo} preview={false} style={{borderWidth: 1, borderRadius: 80}}/>
      <Header>
        IOT - DASHBOARD
      </Header>
      <Menu
        style={{ width: 256 }}
        defaultSelectedKeys={['1']}
        // defaultOpenKeys={['sub1']}
        mode={'vertical'}
        theme={'dark'}
      >
        <Menu.Item key="1" icon={<AppstoreOutlined />} >
          Dashboard
        </Menu.Item>

        <Menu.Item key="2" icon={<RobotFilled />} onClick={() => setShowDeviceModal(true)}>
          New Device
        </Menu.Item>

        <SubMenu key="sub1" icon={<SettingOutlined />} title="Settings">
          <Menu.Item key="3">Option 3</Menu.Item>
          <Menu.Item key="4">Option 4</Menu.Item>
          {/* <SubMenu key="sub1-2" title="Submenu">
            <Menu.Item key="5">Option 5</Menu.Item>
            <Menu.Item key="6">Option 6</Menu.Item>
          </SubMenu> */}
        </SubMenu>
        
        <Menu.Item key="link" icon={<LoginOutlined/>} onClick={hist.goBack}>
          Log Out
        </Menu.Item>

      </Menu>

      <DeviceModal 
        visible={showDeviceModal} 
        handleClose={handleCloseDeviceModal}
        handleSave={handleSaveDevice}/>
    </div>
  );
};