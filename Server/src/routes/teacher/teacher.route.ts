import express from 'express'
import asyncErrorHandler from '../../services/asyncErrorHandler'
import { teacherLogin } from '../../controllers/teacher/teacher.controller'
const router = express()

router.route("/").post(asyncErrorHandler(teacherLogin));

export default router