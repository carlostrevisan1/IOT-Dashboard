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
import NewUserForm from '../NewUserForm/NewUserForm';
import { UserSchema } from '../../constants/user';

const layout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 20,
  },
};

type CardsSchema = {
  userTitle: string,
}


type Props = {
  visible: boolean;
  handleClose: () => void;
  handleSave: (newUser: UserSchema) => void;
}

export default function UserModal(
  { visible, 
    handleClose,
    handleSave } : Props){
      

  function handleFinish(val: UserSchema){
    handleSave(val);
    handleClose();
  }

  return (
    <div>
      <Modal 
        title="New User" 
        visible={visible} 
        onCancel={handleClose}
        destroyOnClose
        footer={[
          <Button type="default" onClick={handleClose}>
            Cancel
          </Button>,

          <Button form="NewUserForm" type="primary" htmlType="submit" >
                Add
          </Button>,
        ]} >
          <NewUserForm id="NewUserForm" onFinish={handleFinish}/>
      </Modal>
    </div>
  );
};