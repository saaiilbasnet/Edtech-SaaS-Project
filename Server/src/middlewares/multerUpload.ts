import multer from 'multer'
import {cloudinary, storage} from '../services/cloudinaryConfig'
import { Request } from 'express';

const upload = multer({ storage : storage,
    fileFilter : (req: Request, file:Express.Multer.File, cb:any)=>{
        const allowedFileTypes = ['image/png','image/jpg','image/jpeg'];

        if(allowedFileTypes.includes(file.mimetype)){
            cb(null,true)
        }else{
            cb(new Error("Not supported type!"))
        }
    },limits : {
        fieldSize : 4 * 1024 * 1024 //2 MB
    }
})

export default upload