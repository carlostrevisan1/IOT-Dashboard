import React from 'react';
import { Button, Form, Image, Input, Menu } from 'antd';
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
import Modal from 'antd/lib/modal/Modal';
import StandardInput from '../StandardInput/StandardInput';
import NewDeviceForm from '../NewDeviceForm/NewDeviceForm';
import { DeviceSchema } from '../../constants/device';

const layout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 20,
  },
};

type CardsSchema = {
  deviceTitle: string,
}


type Props = {
  visible: boolean;
  handleClose: () => void;
  handleSave: (newDevice: DeviceSchema) => void;
}

export default function DeviceModal(
  { visible, 
    handleClose,
    handleSave } : Props){
      

  function handleFinish(val: DeviceSchema){
    handleSave(val);
    handleClose();
  }

  return (
    <div>
      <Modal 
        title="New Device" 
        visible={visible} 
        onCancel={handleClose}
        destroyOnClose
        footer={[
          <Button type="default" onClick={handleClose}>
            Cancel
          </Button>,

          <Button form="NewDeviceForm" type="primary" htmlType="submit" >
                Add
          </Button>,
        ]} >
          <NewDeviceForm id="NewDeviceForm" onFinish={handleFinish}/>
      </Modal>
    </div>
  );
};