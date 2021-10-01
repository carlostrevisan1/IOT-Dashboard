import React from 'react';
import { Image, Menu } from 'antd';
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




export default function Demo(){
  const [mode, setMode] = React.useState('inline');
  const [theme, setTheme] = React.useState('light');
  let hist = useHistory();

  const changeMode = (value: boolean) => {
    setMode(value ? 'vertical' : 'inline');
  };

  const changeTheme = (value: boolean) => {
    setTheme(value ? 'dark' : 'light');
  };

  return (
    <div>
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
        <Menu.Item key="2" icon={<RobotFilled />}>
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
    </div>
  );
};