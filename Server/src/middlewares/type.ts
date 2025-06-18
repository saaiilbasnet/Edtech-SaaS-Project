import {Request} from 'express'

export interface IExtendedRequest extends Request{
        user ?:{
            id : string,
            email : string,
            role : string,
            username : string | null,
            currentInstituteNumber : number | string
        },
        instituteNumber ?: number | string
    }