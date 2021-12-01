import { Button, Form, FormProps, Input } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import React from 'react';
import { DeviceItemsSchema, DevicesSchema, NewDeviceSchema } from '../../constants/device';

const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 20,
  },
};

type Props = FormProps & {
  id: string;
  onFinish: (val: DeviceItemsSchema)=> void;
  device: DeviceItemsSchema;
}

export default function EditDeviceForm({id, onFinish, device, form} : Props){
  
  console.log(device)

  return (
      <Form id={id} 
      {...layout} 
      labelAlign={"left"} 
      form={form}
      name="nest-messages" 
      onFinish={onFinish}>

        <Form.Item
          name={['name']}
          label="Name"
          rules={[
            {
              required: true,
            },
          ]}
        >

          <Input value={device.name}   />

        </Form.Item>

        <Form.Item 
          name={['desc']} 
          label="Description"
          rules={[
            {
              required: true,
              max: 200
            },
          ]}>

          <Input.TextArea value={device.desc}/>

        </Form.Item>

        <Form.Item
          name={['colour']}
          label="Color"
          rules={[
            {
              type: 'string',
              required: true,
            },
          ]}
        >

          <Input value={device.colour}/>
          
        </Form.Item>

        <Form.Item 
          name={['ip_address']} 
          label="Broker Ip"
          rules={[
            {
              required: true,
            },
          ]}>
          <Input value={device.ip_address}/>
        </Form.Item>

        <Form.Item 
          name={['port']} 
          label="Port"
          rules={[
            {
              required: true,
            },
          ]}>
          <Input value={device.port}/>
        </Form.Item>
        
      </Form>
  );
};