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
  

  const [type, setType] = useState(Number(feature?.feat_type));

  useEffect(() => {
    setType(Number(feature?.feat_type))
  }, [feature])

  

  function renderDynamicForm(){
    switch(type){
      case 1:
        return ( 
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
        );
      case 2:
        return (
        <>
          <Form.Item 
            name={['valueOn']} 
            label="Value ON"
            rules={[
              {
                required: true,
              },
            ]}>

            <Input value={feature ? feature?.value : ''}/>

        </Form.Item>

        <Form.Item 
          name={['valueOFF']} 
          label="Value OFF"
          rules={[
            {
              required: true,
            },
          ]}>

          <Input value={feature ? feature?.value : ''}/>

        </Form.Item>
      </>);
      case 3:
        return (
          <>
            <Form.Item 
              name={['initialRange']} 
              label="Initial Range"
              rules={[
                {
                  required: true,
                },
              ]}>

              <Input value={feature ? feature?.value : ''}/>

            </Form.Item>

            <Form.Item 
              name={['finalRange']} 
              label="Final Range"
              rules={[
                {
                  required: true,
                },
              ]}>

              <Input value={feature ? feature?.value : ''}/>

            </Form.Item>

            <Form.Item 
              name={['prefix']} 
              label="Prefix (optional)"
              rules={[
                
              ]}>

              <Input value={feature ? feature?.value : ''}/>

            </Form.Item>

            <Form.Item 
              name={['sufix']} 
              label="Sufix (optional)"
              rules={[
              
              ]}>

              <Input value={feature ? feature?.value : ''}/>

            </Form.Item>
          </>
        );
        break;
      case 4:
        break;
    }
  }

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
          onSelect={sel => {setType(Number(sel))}}
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

        {renderDynamicForm()}

        
        
        
      </Form>
  );
};