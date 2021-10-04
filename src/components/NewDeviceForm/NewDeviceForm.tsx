import { Button, Form, FormProps, Input } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import React from 'react';

const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 20,
  },
};

type Props = FormProps &{
}

export default function NewDeviceForm({id, onFinish} : Props){
  

  return (
      <Form id={id} {...layout} labelAlign={"left"} name="nest-messages" onFinish={onFinish}>

        <Form.Item
          name={['device', 'name']}
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
          name={['device', 'description']} 
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
          name={['device', 'color']}
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
          name={['broker', 'ip']} 
          label="Broker Ip"
          rules={[
            {
              required: true,
            },
          ]}>
          <Input />
        </Form.Item>

        <Form.Item 
          name={['broker', 'port']} 
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