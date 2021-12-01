export type NewDeviceSchema = {
  name: string, 
  desc: string, 
  colour: string,
  user_id: number,
  ip_address: string, 
  port: string,
}

export type NewFeatureSchema = {
  name: string,
  topic: string,
  feat_type: number,
  value: string,
  device_id: number,
}

export type EditFeatureSchema = {
  name: string,
  topic: string,
  feat_type: number,
  value: string,
  feature_id?: number,
}


export type FeaturesSchema = {
  id: number,
  name: string,
  topic: string,
  type: number,
  value: string,
  device_id: number,
}

export type EditDeviceSchema = {
  device_id: number;
  name: string;
  desc: string;
  ip: string;
  port: string;
  colour: string;
}

export type DeviceItemsSchema = {
  id: number,
  name: string, 
  desc: string, 
  colour: string,
  user_id: number,
  ip_address: string, 
  port: string,
  features?: FeaturesSchema[],
}


export type DevicesSchema = {
  devices: DeviceItemsSchema[],
}