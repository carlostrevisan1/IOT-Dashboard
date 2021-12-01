import { Button } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import React from 'react';
import EditSettingsForm from '../EditSettingsForm/EditSettingsForm';


type NewPass = {
  nPass: string;
  confirmPass: string;
}

type Props = {
  visible: boolean;
  handleClose: () => void;
  handleSave: (newPass: NewPass) => void;
}

export default function SettingsModal(
  { visible, 
    handleClose,
    handleSave } : Props){
      

  function handleFinish(val: NewPass){
    handleSave(val);
    handleClose();
  }

  return (
    <div>
      <Modal 
        title="Edit Your Password" 
        visible={visible} 
        onCancel={handleClose}
        destroyOnClose
        footer={[
          <Button type="default" onClick={handleClose}>
            Cancel
          </Button>,

          <Button form="EditSettingsForm" type="primary" htmlType="submit" >
            Change
          </Button>,
        ]} >

          <EditSettingsForm id="EditSettingsForm" onFinish={handleFinish}/>
          
      </Modal>
    </div>
  );
};