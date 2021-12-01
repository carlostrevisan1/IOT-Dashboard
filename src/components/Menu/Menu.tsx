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
import { DeviceItemsSchema, NewDeviceSchema } from '../../constants/device';
import SettingsModal from '../SettingsModal/SettingsModal';

type NewPass = {
  nPass: string;
  confirmPass: string;
}


type Props ={
  handleSaveDevice: (newDevice: NewDeviceSchema) => void;
  handleSaveNewPass: (val : NewPass) => void;
}

export default function LateralMenu({handleSaveDevice, handleSaveNewPass} : Props){
  
  const [showDeviceModal, setShowDeviceModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState(['1'])

  let hist = useHistory();

  
  const handleCloseDeviceModal = () => {
    setShowDeviceModal(false);
    setSelectedMenu(['1']);

  }

  const handleCloseSettingsModal = () => {
    setShowSettingsModal(false);
    setSelectedMenu(['1']);
  }

  const handleNewDeviceClick = () => {
    setShowDeviceModal(true);
    setSelectedMenu(['2']);
  }

  const handleSettingsPassClick = () => {
    setShowSettingsModal(true);
    setSelectedMenu(['3']);
  }

  return (
    <div style={{backgroundColor: "#1f1f1f"}}>
      <Image  src={logo} preview={false} style={{borderWidth: 1, borderRadius: 80}}/>
      <Header>
        IOT - DASHBOARD
      </Header>
      <Menu
        style={{ width: 256 }}
        mode={'vertical'}
        theme={'dark'}
        selectedKeys={selectedMenu}
      >
        <Menu.Item key="1" icon={<AppstoreOutlined />} >
          Dashboard
        </Menu.Item>

        <Menu.Item key="2" icon={<RobotFilled />} onClick={handleNewDeviceClick}>
          New Device
        </Menu.Item>

        <SubMenu key="sub1" icon={<SettingOutlined />} title="Settings">
          <Menu.Item key="3" onClick={handleSettingsPassClick}>Alterar Senha</Menu.Item>
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

      <SettingsModal 
        visible={showSettingsModal} 
        handleClose={handleCloseSettingsModal}
        handleSave={handleSaveNewPass}/>
    </div>
  );
};