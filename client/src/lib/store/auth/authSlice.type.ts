import { Status } from "@/lib/types/type"


export interface IUserData{
    username : string, 
    password : string
}
export interface IUserRegisterData extends IUserData{
  email : string
}

export interface IUserLoginData {
  email : string
  password : string
}

export interface IInitialState{
  user : IUserData, 
  status : Status
}