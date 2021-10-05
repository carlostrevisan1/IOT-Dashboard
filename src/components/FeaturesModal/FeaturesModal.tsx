import { Button } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import React from 'react';
import { DeviceSchema } from '../../constants/device';
import FeaturesEditForm from '../FeaturesEditForm/FeaturesEditForm';

const layout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 20,
  },
};


type Props = {
  visible: boolean;
  handleClose: () => void;
  handleSave: (newDevice: any) => void;
}

export default function FeaturesModal(
  { visible, 
    handleClose,
    handleSave } : Props){
      

  function handleFinish(val: any){
    handleSave(val);
    handleClose();
  }

  return (
    <div>
      <Modal 
        title="Edit Features" 
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

          <FeaturesEditForm id="NewDeviceForm" onFinish={handleFinish}/>
          
      </Modal>
    </div>
  );
};