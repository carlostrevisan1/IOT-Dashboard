import { Button, Cascader, Form, FormProps, Input } from 'antd';
import React from 'react';
import { FeaturesSchema } from '../../constants/device';

const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 20,
  },
};


type ToEditFeature = {
  name: string,
  topic: string,
  feat_type: string[],
  value: string,
}


type Props = FormProps & {
  visible: boolean;
  feature?: ToEditFeature;
}

export default function FeaturesEditForm({id, onFinish, visible, feature, form} : Props){
  


  return (
      <Form 
        id={id} 
        {...layout} 
        labelAlign={"left"} 
        name="nest-messages" 
        onFinish={onFinish} 
        hidden={visible} 
        form={form}>

        <Form.Item
          name={['feat_type']}
          label="Type"
          rules={[
            {
              required: true,
            },
          ]}
        >

        <Cascader 
          value={[feature ? feature?.feat_type.toString() : '']}
          options={
          [
            {
              value: '1',
              label: 'Button',
            },
            {
              value: '2',
              label: 'Switch',
            },
            {
              value: '3',
              label: 'Slider',
            },
            {
              value: '4',
              label: 'TextInput',
            },
            
          ]} 
          onChange={()=>{console.log(feature)}} 
          placeholder="Please select" />

        </Form.Item>

        <Form.Item 
          name={['name']} 
          label="Name"
          rules={[
            {
              required: true,
              max: 50
            },
          ]}>

          <Input.TextArea value={feature ? feature?.name : ''} />

        </Form.Item>

        <Form.Item
          name={['topic']}
          label="Topic"
          rules={[
            {
              type: 'string',
              required: true,
            },
          ]}
        >

          <Input value={feature ? feature?.topic : ''} />
          
        </Form.Item>

        <Form.Item 
          name={['value']} 
          label="Value"
          rules={[
            {
              required: true,
            },
          ]}>
          <Input value={feature ? feature?.value : ''}/>
        </Form.Item>
        
        
      </Form>
  );
};