export type NewDeviceSchema = {
  name: string, 
  desc: string, 
  colour: string,
  user_id: number,
  ip_address: string, 
  port: string,
}

export type FeaturesSchema = {
  id: number,
  name: string,
  topic: string,
  type: number,
  value: string,
  device_id: number,
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