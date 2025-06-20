import express, { Request } from 'express'
import asyncErrorHandler from '../../../services/asyncErrorHandler'
import { createCourse, deleteCourse, getAllCourse, getSingleCourse } from '../../../controllers/institute/course/course.controller'
import isLoggedIn from '../../../middlewares/middleware';
import multer from 'multer';
import { storage } from '../../../services/cloudinaryConfig';

const router = express.Router()

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

router.route("/").get(isLoggedIn,asyncErrorHandler(getAllCourse)).post(isLoggedIn,upload.single('courseThumbnail'),asyncErrorHandler(createCourse));
router.route("/:id").delete(isLoggedIn,asyncErrorHandler(deleteCourse)).get(asyncErrorHandler(getSingleCourse))


export default router