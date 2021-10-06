import { Button, Form, FormProps, Input } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import React from 'react';
import { NewUserSchema, UserSchema } from '../../constants/user';

const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 20,
  },
};

type Props = {
  id?: string;
  onFinish: (values: NewUserSchema) => void;
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
          <Input />
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
          label="Colour"
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