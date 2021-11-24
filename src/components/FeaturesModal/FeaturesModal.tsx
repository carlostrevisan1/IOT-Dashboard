import { Button, Card, List } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import React, { useState } from 'react';
import { FeaturesSchema } from '../../constants/device';
import {
  PlusCircleFilled,
  EditOutlined
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


type Props = {
  visible: boolean;
  handleClose: () => void;
  handleSave: (newDevice: any) => void;
  features?: FeaturesSchema[];
}

export default function FeaturesModal(
  { visible,
    handleClose,
    handleSave,
    features
  }: Props) {

  const [visibleForm, setVisibleForm] = useState(true);
  const [visibleList, setVisibleList] = useState(false);

  function handleFinish(val: any) {
    handleSave(val);
    handleClose();
  }

function onClose(){
  setVisibleList(false);
  setVisibleForm(true);
  handleClose();
}

  return (
    <div>
      <Modal
        title="Edit Features"
        visible={visible}
        onCancel={onClose}
        footer={[
          <Button type="default" onClick={handleClose}>
            Cancel
          </Button>,

          <Button form="NewDeviceForm" type="primary" htmlType="submit" >
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
                <Card
                  hoverable
                  onClick={() => {
                    // TODO SET Features data to modal and clear list
                    setVisibleForm(!visibleForm)
                    setVisibleList(true);
                  }}>

                  <Card.Grid style={{
                    width: '100%'
                  }}
                  >
                    <div style={{ display: 'flex', textAlign: 'center', justifyContent: 'space-between' }}>
                      <span style={{ display: 'inline-block', verticalAlign: 'middle', lineHeight: 'normal' }}>
                        {item.name}
                      </span>
                      <EditOutlined style={{}} />
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
              // TODO SET Features data to modal and clear list
              setVisibleForm(!visibleForm)
              setVisibleList(true);
            }}>

            <Card.Grid style={{
              width: '100%'
            }}
            >
              <div style={{ display: 'flex', textAlign: 'center', justifyContent: 'space-between' }}>
                <span style={{ display: 'inline-block', verticalAlign: 'middle', lineHeight: 'normal', color: colors.green}}>
                  {'Add Feature'}
                </span>
                <PlusCircleFilled style={{color: colors.green}} />
              </div>

            </Card.Grid>
          </Card>

        </div>

        { /* Form */}
        <FeaturesEditForm id="NewDeviceForm" onFinish={handleFinish} visible={visibleForm} />

      </Modal>
    </div>
  );
};