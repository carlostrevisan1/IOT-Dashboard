import { DevicesSchema } from "./device"

export type NewUserSchema = { 
  user: UserSchema;
}

export type UserSchema = {
  name: string, 
  email: string,
  passw: string,
  colour: string,
}

export type UserFetched = DevicesSchema & { 
  login_status: number;
}