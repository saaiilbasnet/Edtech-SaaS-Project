
import express from 'express'
import asyncErrorHandler from '../../services/asyncErrorHandler'
import { getStudent } from '../../controllers/student/student.controller'
const router = express.Router()

router.route("/").get(asyncErrorHandler(getStudent));


export default router