import { Button, Cascader, Form, FormProps, Input } from 'antd';
import React, { useEffect, useState } from 'react';
import { FeaturesSchema } from '../../constants/device';

const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 20,
  },
};


type Props = FormProps & {
}

export default function EditSettingsForm({id, onFinish, form} : Props){

  
  return (
      <Form 
        id={id} 
        {...layout} 
        labelAlign={"left"} 
        name="nest-messages" 
        onFinish={onFinish} 
        form={form}>



        <Form.Item
          name={['nPass']}
          label="New Password"
          rules={[
            {
              type: 'string',
              required: true,

              

            },
          ]}
        >

          <Input.Password />
          
        </Form.Item>

        <Form.Item
          name={['confirmPass']}
          label="Confirm"
          rules={[
            {
              type: 'string',
              required: true,
            },
          ]}
        >

          <Input.Password />
          
        </Form.Item>
        
      </Form>
  );
};