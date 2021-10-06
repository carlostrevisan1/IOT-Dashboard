import { Button, Form, FormProps, Input } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import React from 'react';
import { DeviceItemsSchema, NewDeviceSchema } from '../../constants/device';

const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 20,
  },
};

type Props = {
  id: string;
  onFinish: (val: NewDeviceSchema)=> void;
}

export default function NewDeviceForm({id, onFinish} : Props){
  

  return (
      <Form id={id} {...layout} 
      labelAlign={"left"} 
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

          <Input />

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

          <Input.TextArea />

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

          <Input />
          
        </Form.Item>

        <Form.Item 
          name={['ip_address']} 
          label="Broker Ip"
          rules={[
            {
              required: true,
            },
          ]}>
          <Input />
        </Form.Item>

        <Form.Item 
          name={['port']} 
          label="Port"
          rules={[
            {
              required: true,
            },
          ]}>
          <Input />
        </Form.Item>
        
      </Form>
  );
};