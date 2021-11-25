import React, { useState } from 'react';
import { Badge, Button, Card, Menu, notification, Slider, Switch, Typography } from 'antd';
import {
  SettingOutlined,
} from '@ant-design/icons';
import { Header } from 'antd/lib/layout/layout';
import { EditFeatureSchema, FeaturesSchema, NewFeatureSchema } from '../../constants/device';
import StandardInput from '../StandardInput/StandardInput';
import FeaturesModal from '../FeaturesModal/FeaturesModal';
import { cursorTo } from 'readline';
import { DeviceController } from '../../controllers/device.controller';

type ToSaveFeature = {
  name: string,
  topic: string,
  feat_type: string[],
  value: string,
  isEdit: boolean,
  id?: number,
}

type Props = {
  deviceTitle: string;
  features?: FeaturesSchema[];
  colour: string;
  deviceId: number;
  loadCards: () => void;
}

export default function StandardCard({ deviceTitle, features, colour, deviceId, loadCards}: Props) {

  const [showEditModal, setShowEditModal] = useState(false)
  const [spinSettings, setSpin] = useState(false);


  function handleEditModal() {
    setShowEditModal(!showEditModal);
  }

  async function handleSave(val:ToSaveFeature ) {
    console.log(val)

    if(val.isEdit){
      const [feat_type] = val.feat_type

      const formatFeature: EditFeatureSchema = {
        name: val.name,
        topic: val.topic,
        feat_type: Number(feat_type),
        value: val.value,
        feature_id: val.id,
      }

      const res = await DeviceController.editFeature(formatFeature);

      if(res){
        notification.open({
          message: "Feature criada com sucesso!!",
          description: "",
          style:{backgroundColor: "#006700"},
        })
  
        loadCards();
      }
      else{
        notification.open({
          message: "Falha ao criar feature!",
          description: "Por favor, tente novamente.",
          style:{backgroundColor: "#670000"},
        })
      }
    } 
    else {

      const [feat_type] = val.feat_type
  
      const formatNewFeature: NewFeatureSchema = {
        name: val.name,
        topic: val.topic,
        feat_type: Number(feat_type),
        value: val.value,
        device_id: deviceId,
      }
  
      const res = await DeviceController.saveFeature(formatNewFeature);
  
      if(res){
        notification.open({
          message: "Feature criada com sucesso!!",
          description: "",
          style:{backgroundColor: "#006700"},
        })
  
        loadCards();
      }
      else{
        notification.open({
          message: "Falha ao criar feature!",
          description: "Por favor, tente novamente.",
          style:{backgroundColor: "#670000"},
        })
      }
    }

  }

  async function handleDelete(val: FeaturesSchema){
    const res = await DeviceController.deleteFeature(val.id);
    if(res){
      notification.open({
        message: "Feature deletada com sucesso!!",
        description: "",
        style:{backgroundColor: "#006700"},
      })

      loadCards();
    }
    else{
      notification.open({
        message: "Falha ao deletar feature!",
        description: "Por favor, tente novamente.",
        style:{backgroundColor: "#670000"},
      })
    }
  }

  function handleCreateFeatures() {
    const toAddFeats = features?.map(feat => {
      switch (feat.type) {
        case 1:
          return <Button>{feat.name}</Button>
          break;
        case 2:
          return <Switch />
          break;
        case 3:
          return <Slider />
          break;
        case 4:
          return <StandardInput label={feat.name} />
        default:
          return;

      }
    })
    return toAddFeats;
  }

  return (
    <div style={{
      marginLeft: 5,
      flexGrow: 1,
      maxWidth: 350,
      minWidth: 350,
      flexShrink: 0,
      marginTop: 10,
    }}>

      <Card style={{
        borderRadius: 10,
        background: `linear-gradient(182deg, ${colour} 65px, #1f1f1f 66px)`,

      }} >

        <Header style={{
          flexDirection: 'row',
          display: 'flex',
          padding: 0,
          backgroundColor: "transparent",
          marginTop: -27,
          marginBottom: 20,
        }}>

          <Typography style={{
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap",
            fontWeight: 600,
            fontSize: "1.2rem",
            width: "calc(100% - 30px)",

          }}>{deviceTitle}</Typography>

          <span style={{
            // marginTop: "25px",
            marginLeft: "12px",
            fontSize: "20px",
            cursor: "pointer",
          }}>
            <SettingOutlined
              onClick={handleEditModal}
              spin={spinSettings}
              onMouseEnter={() => setSpin(!spinSettings)}
              onMouseLeave={() => setSpin(!spinSettings)}
            />
          </span>


        </Header>

        <div style={{ marginTop: 10 }}>
          {handleCreateFeatures()}
        </div>
      </Card>

      <FeaturesModal
        handleClose={handleEditModal}
        handleDelete={handleDelete}
        visible={showEditModal}
        handleSave={handleSave}
        features={features}
      />
    </div>
  );
};