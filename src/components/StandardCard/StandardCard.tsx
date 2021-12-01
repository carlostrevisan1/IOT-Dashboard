import React, { useEffect, useState } from 'react';
import { Alert, Badge, Button, Card, Menu, notification, Slider, Switch, Typography } from 'antd';
import {
  SettingOutlined,
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { Header } from 'antd/lib/layout/layout';
import { DeviceItemsSchema, EditFeatureSchema, FeaturesSchema, NewFeatureSchema } from '../../constants/device';
import StandardInput from '../StandardInput/StandardInput';
import FeaturesModal from '../FeaturesModal/FeaturesModal';
import { cursorTo } from 'readline';
import { DeviceController } from '../../controllers/device.controller';
import hexToRgb from '../../utils/hexToRGB';
import switchMessage from '../../utils/switchMessage';
import setupSlider from '../../utils/setupSlider';
import sliderMessage from '../../utils/sliderMessage';
import { connect, MqttClient } from 'mqtt';
import DeviceEditModal from '../DeviceEditModal/DeviceEditModal';

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
  brokerIp: string;
  brokerPort: string;
  device: DeviceItemsSchema;
}

export default function StandardCard({ deviceTitle, features, colour, deviceId, loadCards, brokerIp, brokerPort, device}: Props) {

  const [showEditModal, setShowEditModal] = useState(false);
  const [editDeviceModal, setEditDeviceModal] = useState(false);
  const [spinSettings, setSpin] = useState(false);
  const [inputText, setInputText] = useState("");

  const mqttClient = connect(`tcp://${brokerIp}`, {protocol: 'tcp',port: Number(brokerPort)});

// preciouschicken.com is the MQTT topic
  

  useEffect(() => {

    mqttClient.on('connect', () => {
      alert('Conectado!')
      
    })
    
  }, [])

  function handleEditModal() {
    setShowEditModal(!showEditModal);
  }

  function mqttPublish(topic:string, message:string){
    mqttClient.publish(topic, message);
    const alertMsg = "Mesagem: '" + message + "' enviada";
    const rgbColour = hexToRgb(colour)
    let bgColour:string = ""
    if (rgbColour[0] + rgbColour[1] + rgbColour[2] > 500){
      bgColour = "#1c1c1c";
    }
    else{
      bgColour = colour;
    }
    notification.open({
      message: alertMsg,
      description: "",
      style:{backgroundColor: bgColour},
    })}

  function handleEditDevice(val: DeviceItemsSchema){
    console.log(val);
    setEditDeviceModal(false);
  }

  function handleDeleteDevice(){
    console.log('delete')
  }

  async function handleSave(val: ToSaveFeature ) {

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
          message: "Feature editada com sucesso!!",
          description: "",
          style:{backgroundColor: "#006700"},
        })
  
        loadCards();
      }
      else{
        notification.open({
          message: "Falha ao editar feature!",
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

  // useEffect(()=>{console.log(refSwitch.current?.ariaPressed)},[refSwitch.current?.ariaPressed])

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
      const rgb = hexToRgb(colour);
      switch (feat.type) {
        case 1:
          let textColour:string = ""
          if (rgb[0] + rgb[1] + rgb[2] > 765/2){
            textColour = "#000";
          }
          else{
            textColour = "#FFF";
          }
          return (<>
                    <Button key={feat.id} 
                            onClick={()=>{mqttPublish(feat.topic, feat.value)}}
                            style={{
                            backgroundColor: colour, 
                            color: textColour, 
                            margin: 10, 
                            fontWeight: "bold", 
                            borderRadius: 15, 
                            fontSize: 15}}>

                      {feat.name}

                    </Button>
                  </>)
          break;
        case 2:
          return <Switch key={feat.id} 
                        onChange={val => {mqttPublish(feat.topic, switchMessage(feat.value, val))}} 
                        style={{backgroundColor: colour, margin: 10}}/>
          break;
        case 3:
          const range = setupSlider(feat.value);
          const middle = Math.round((Number(range[0]) + Number(range[1]))/2);
          
          return <Slider  key={feat.id} 
                          min={Number(range[0])}
                          max={Number(range[1])} 
                          defaultValue={middle}
                          onAfterChange={(val: number) => {mqttPublish(feat.topic, sliderMessage(feat.value, val))}} 
                          style={{margin: 10}}/>
          break;
        case 4:
          let buttonTextColour:string = ""
          let inputTextColour:string = ""
          if (rgb[0] + rgb[1] + rgb[2] > 765/2){
            inputTextColour = colour;
            buttonTextColour = "#000";
          }
          else if (rgb[0] + rgb[1] + rgb[2] > 100){
            inputTextColour = colour;
            buttonTextColour = "#FFF"
          }
          else{
            inputTextColour = "#FFF";
            buttonTextColour = "#FFF"
          }
          return (<div style={{ display: "flex", flexDirection:"row", margin: 10}}>
                    <div style={{flex: 1}}>
                      <StandardInput key={feat.id} label={feat.name} onChange={setInputText} colour={inputTextColour} withoutLabel/>
                    </div>
                      <Button key={feat.id} 
                              onClick={()=>{mqttPublish(feat.topic, inputText)}}
                              style={{
                                      backgroundColor: colour, 
                                      color: buttonTextColour, 
                                      borderRadius: 4, 
                                      }}>{feat.name}
                      </Button>
                    </div>)
        default:
          return;

      }
    })
    return toAddFeats;
  }

  const rgb = hexToRgb(colour)
  let textColour:string = ""
  if (rgb[0] + rgb[1] + rgb[2] > 500){
    textColour = "#000";
  }
  else{
    textColour = "#FFF";
  }
  
  return (
    <div style={{
      marginLeft: 5,
      flexGrow: 1,
      maxWidth: 350,
      minWidth: 350,
      flexShrink: 0,
      marginTop: 10,
    }}
      key={deviceId}
    >

      <Card style={{
        borderRadius: 10,
        background: `linear-gradient(182deg, ${colour} 65px, #1f1f1f 66px)`,

      }} 
      key={deviceId}
      >

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
            width: "calc(100% - 68px)",
            color: textColour

          }}>{deviceTitle}</Typography>

          <span style={{
            // marginTop: "25px",
            fontSize: "18px",
          }}>

            <EditOutlined 
              onClick={() => setEditDeviceModal(true)}
              style={{ marginRight: 5, color: textColour }} 
            />


            <SettingOutlined
              onClick={handleEditModal}
              spin={spinSettings}
              onMouseEnter={() => setSpin(!spinSettings)}
              onMouseLeave={() => setSpin(!spinSettings)}
              style={{color: textColour}}
            />

            <DeleteOutlined onClick={() => {handleDeleteDevice()}} style={{ marginLeft: 5, color: textColour }}/>
          </span>


        </Header>

        <div style={{ marginTop: 10, color: textColour }}>
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

      <DeviceEditModal
        device={device}
        handleClose={() => { setEditDeviceModal(false)}}
        handleSave={handleEditDevice}
        visible={editDeviceModal}
      />
    </div>
  );
};