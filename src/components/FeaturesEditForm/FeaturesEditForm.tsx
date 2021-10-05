import { Button, Cascader, Form, FormProps, Input } from 'antd';
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

export default function FeaturesEditForm({id, onFinish} : Props){
  

  return (
      <Form id={id} {...layout} labelAlign={"left"} name="nest-messages" onFinish={onFinish}>

        <Form.Item
          name={['type']}
          label="Type"
          rules={[
            {
              required: true,
            },
          ]}
        >

          <Cascader options={[{
            value: 'zhejiang',
            label: 'Zhejiang',
          }]} onChange={()=>{}} placeholder="Please select" />

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