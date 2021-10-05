import { DevicesSchema } from "./device"

export type UserSchema = {
  id: number,
  name: string, 
  email: string,
  passw: string,
  colour: string,
}

export type UserFetched = DevicesSchema & { 
  login_status: number;
}