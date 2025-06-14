import express from 'express'
import InstituteController from '../../controllers/institute/institute.controller'
import isLoggedIn from '../../middlewares/middleware';
const router = express.Router()

router.route("/").post(isLoggedIn,InstituteController.createInstitute);

export default router