export type DeviceItemsSchema = {
  id: number,
  name: string, 
  description: string, 
  color: string,
  user_id: number,
}

export type BrokerItemsSchema = { 
  ip: string, 
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

export type DeviceSchema = {
  broker: BrokerItemsSchema,
  device: DeviceItemsSchema,
  features?: FeaturesSchema[],
}