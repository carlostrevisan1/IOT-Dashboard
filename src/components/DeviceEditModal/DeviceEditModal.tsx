import { Button, Form } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import React, { useEffect } from 'react';
import { DeviceItemsSchema, DevicesSchema } from '../../constants/device';
import EditDeviceForm from '../EditDeviceForm/EditDeviceForm';

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
  handleSave: (val: DeviceItemsSchema) => void;
  device: DeviceItemsSchema;
}

export default function DeviceEditModal(
  { visible, 
    handleClose,
    handleSave,
    device,
  } : Props){
      
    const [form] = Form.useForm();

    
    useEffect(() => {
      form.setFieldsValue(device)
    }, [form, device])
  

  return (
    <div>
      <Modal 
        title="Edit Device" 
        visible={visible} 
        onCancel={handleClose}
        destroyOnClose
        footer={[
          <Button type="default" onClick={handleClose}>
            Cancel
          </Button>,

          <Button form="EditDeviceForm" type="primary" htmlType="submit" >
                Send
          </Button>,
        ]} >

          <EditDeviceForm form={form} id="EditDeviceForm" device={device} onFinish={handleSave}/>
          
      </Modal>
    </div>
  );
};