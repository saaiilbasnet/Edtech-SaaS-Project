
import express from 'express'
import isLoggedIn from '../../../middlewares/middleware'
import asyncErrorHandler from '../../../services/asyncErrorHandler'
import { createCategory, deleteCategory, getCategory } from '../../../controllers/institute/category/category.controller'
const router = express.Router()

router.route("/").get(isLoggedIn,asyncErrorHandler(getCategory)).post(isLoggedIn, asyncErrorHandler(createCategory));
router.route("/:id").delete(isLoggedIn,asyncErrorHandler(deleteCategory));

export default router