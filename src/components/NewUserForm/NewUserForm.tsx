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

export default function NewUserForm({id, onFinish} : Props){
  

  return (
      <Form id={id} {...layout} labelAlign={"left"} name="nest-messages" onFinish={onFinish}>

        <Form.Item
          name={['user', 'name']}
          label="Name"
          rules={[
            {
              required: true,
              max: 40
            },
          ]}
        >
        <Input />
        </Form.Item>

        <Form.Item 
          name={['user', 'email']} 
          label="Email"
          rules={[
            {
              required: true,
              max: 60
            },
          ]}>
          <Input.TextArea />
        </Form.Item>

        <Form.Item
          name={['user', 'passw']}
          label="Password"
          rules={[
            {
              type: 'string',
              required: true,
              max: 50
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item 
          name={['user', 'colour']} 
          label="Broker Ip"
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