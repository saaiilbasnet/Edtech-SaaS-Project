import multer from 'multer'
import { IExtendedRequest } from './type'

const storage = multer.diskStorage({

    //location to store incomming files

    destination : (req: IExtendedRequest, file: Express.Multer.File, cb : any)=>{
        cb (null, './src/storage')
    },
    filename : (req: IExtendedRequest, file: Express.Multer.File, cb : any)=>{
        
        cb(null, file.originalname + "_" + Date.now());
    }
})

export {multer, storage}