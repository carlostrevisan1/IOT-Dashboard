import { Button, Card, Form, List } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import React, { useEffect, useState } from 'react';
import { FeaturesSchema } from '../../constants/device';
import {
  PlusCircleOutlined,
  EditOutlined,
  DeleteOutlined
} from '@ant-design/icons';
import FeaturesEditForm from '../FeaturesEditForm/FeaturesEditForm';
import { colors } from '../../constants/colors';

const layout = {
  labelCol: {
    span: 5,
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
  id?: number,
}

type FinishingValues = {
  name: string,
  topic: string,
  feat_type: string[],
  value?: string,
  valueOn?: string,
  valueOFF?: string,
  initialRange?: string,
  finalRange?: string,
  prefix?: string,
  sufix?: string,
  id?: number,
}


type Props = {
  visible: boolean;
  handleClose: () => void;
  handleSave: (newFeature: any) => void;
  handleDelete: (feature: FeaturesSchema) => void;
  features?: FeaturesSchema[];
}

export default function FeaturesModal(
  { visible,
    handleClose,
    handleSave,
    features,
    handleDelete
  }: Props) {

  const [visibleForm, setVisibleForm] = useState(true);
  const [visibleList, setVisibleList] = useState(false);
  const [feature, setFeature] = useState<ToEditFeature>();
  const [isEdit, setIsEdit] = useState(false);

  const [form] = Form.useForm();

  function resetModal(){
    setVisibleList(false);
    setVisibleForm(true);
  }

  function handleFinish(val: FinishingValues) {
    resetModal();

    const [featType] = val.feat_type;

    let toSave: ToEditFeature = {} as ToEditFeature;

    switch(Number(featType)){
      case 1:
        {
          toSave = {...val, value: val.value || ''};

          break;
        }
      case 2: {

        const value = `${val.valueOn}Ḝ${val.valueOFF}`;

        toSave = {...val, value};

        break;
      }

      case 3: {

        const value = `${val.initialRange}Ḝ${val.finalRange}Ḝ${val.prefix ? val.prefix : ''}Ḝ${val.sufix ? val.sufix : ''}`;

        toSave = {...val, value};

        break;
      }
      case 4:
        const value = ``;

        toSave = {...val, value};
        break;
    }

    handleSave({...toSave, isEdit, id: feature?.id});

    handleClose();
  }

  function onClose(){
    resetModal();
    handleClose();
  }

  useEffect(() => {
    form.setFieldsValue(feature)
  }, [form, feature])

  return (
    <div>
      <Modal
        title="Edit Features"
        visible={visible}
        onCancel={onClose}
        footer={[
          <Button type="default" onClick={onClose}>
            Cancel
          </Button>,

          <Button form="FeatureForm" type="primary" htmlType="submit" hidden={visibleForm ? true : false} >
            Add
          </Button>,
        ]} >
          
        {/*! LIST */}
        <div hidden={visibleList}>

          <List
            itemLayout='vertical'
            dataSource={features}
            renderItem={item => (
              <List.Item>
                <Card key={item.id}>
                  <Card.Grid style={{
                    width: '100%'
                  }}
                  >
                    <div style={{ display: 'flex', textAlign: 'center', justifyContent: 'space-between'}}>
                      <span style={{ display: 'inline-block', verticalAlign: 'middle', lineHeight: 'normal' }}>
                        {`${item.name} - ${item.topic}`}
                      </span>

                      <div>
                        <EditOutlined 
                          onClick={() => {
                            const formatFeature: ToEditFeature = {
                              feat_type: [item.type.toString()],
                              name: item.name,
                              topic: item.topic,
                              value: item.value,
                              id: item.id,
                            } 

                            setIsEdit(true);
                            setFeature(formatFeature);
                            setVisibleForm(!visibleForm);
                            setVisibleList(true);
                          }}
                          style={{ color: 'yellow', marginRight: 25}} 
                        />

                        <DeleteOutlined onClick={() => handleDelete(item)} style={{color: 'red'}}/>
                      </div>
                    </div>

                  </Card.Grid>
                </Card>
              </List.Item>
            )

            }
          />

          <Card
            hoverable
            onClick={() => {
              setIsEdit(false);
              setVisibleForm(!visibleForm);
              setVisibleList(true);
              setFeature({
                feat_type: [''],
                name: '',
                topic: '',
                value: '',
                id: 0,
              } as ToEditFeature);
            }}>

            <Card.Grid style={{
              width: '100%'
            }}
            >
              <div style={{ display: 'flex', textAlign: 'center', justifyContent: 'space-between' }}>
                <span style={{ display: 'inline-block', verticalAlign: 'middle', lineHeight: 'normal', color: colors.green}}>
                  {'Add Feature'}
                </span>
                <PlusCircleOutlined style={{color: colors.green}} />
              </div>

            </Card.Grid>
          </Card>

        </div>

        { /* Form */}
        <FeaturesEditForm id="FeatureForm" onFinish={handleFinish} visible={visibleForm} feature={feature} form={form} />

      </Modal>
    </div>
  );
};