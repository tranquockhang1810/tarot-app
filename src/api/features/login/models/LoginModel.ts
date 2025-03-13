import { UserModel } from "./UserModel"

export interface LoginResponseModel {
  accessToken?: string
  user?: UserModel
  registerInfo?: {
    id?: string,
    name?: string
  }
}