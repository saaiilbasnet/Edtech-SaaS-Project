import express from 'express'
import asyncErrorHandler from '../../../services/asyncErrorHandler'
import { createCourse, deleteCourse, getAllCourse, getSingleCourse } from '../../../controllers/institute/course/course.controller'
import isLoggedIn from '../../../middlewares/middleware';
const router = express.Router()

router.route("/").get(isLoggedIn,asyncErrorHandler(getAllCourse)).post(asyncErrorHandler(createCourse));
router.route("/:id").delete(isLoggedIn,asyncErrorHandler(deleteCourse)).get(asyncErrorHandler(getSingleCourse))


export default router