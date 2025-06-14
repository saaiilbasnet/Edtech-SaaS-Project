import {Request} from 'express'

export interface IExtendedRequest extends Request{
        user ?:{
            email : string,
            role : string,
            username : string | null
        }
    }