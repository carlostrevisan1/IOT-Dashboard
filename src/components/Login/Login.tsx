import React from 'react';
import 'antd/dist/antd.dark.css';
import { Form, Input, Button, Checkbox } from 'antd';

type LoginObj = {
  passw: string,
  email: string,
}

type Props = {
  onSubmit: (values: LoginObj) => void,
  onFinishFailed?: (errorInfo: any) => void,
  onSignUp?:() => void,
}

export const Login = ({
  onSubmit,
  onFinishFailed ,
  onSignUp
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
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="passw"
        rules={[
          {
            required: true,
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
        <Button type="primary" htmlType="submit" style={{marginRight: 10}}>
          Submit
        </Button>

        <Button onClick={onSignUp}>Cadastre-se</Button>
      </Form.Item>
    </Form>
  );
};