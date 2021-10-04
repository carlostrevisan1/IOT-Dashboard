export type DeviceSchema = {
  broker: {
    ip: string, 
    port: string,
  },
  device: {
    name: string, 
    description: string, 
    color: string,
  }
}