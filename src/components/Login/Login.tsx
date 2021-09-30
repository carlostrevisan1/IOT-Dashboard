import React from 'react';
import 'antd/dist/antd.dark.css';
import { Form, Input, Button, Checkbox } from 'antd';

type LoginObj = {
  password: string,
  username: string,
}

type Props = {
  onSubmit: (values: LoginObj) => void,
  onFinishFailed?: (errorInfo: any) => void,
}

export const Login = ({
  onSubmit,
  onFinishFailed 
}: Props) => {
  
  return (
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      onFinish={onSubmit}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: false,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: false,
            message: 'Please input your password!',

          },
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};