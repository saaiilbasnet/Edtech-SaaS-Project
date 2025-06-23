
import express from 'express'
import isLoggedIn from '../../../middlewares/middleware'
import asyncErrorHandler from '../../../services/asyncErrorHandler'
import { createTeacher, deleteTeacher, getTeacher } from '../../../controllers/institute/teacher/teacher.controller'
import upload from '../../../middlewares/multerUpload'
const router = express.Router()

router.route("/").post(isLoggedIn, upload.single('teacherPhoto'),asyncErrorHandler(createTeacher)).get(isLoggedIn, asyncErrorHandler(getTeacher));
router.route("/:id").delete(isLoggedIn, asyncErrorHandler(deleteTeacher));


export default router