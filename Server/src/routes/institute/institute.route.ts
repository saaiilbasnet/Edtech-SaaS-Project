import express from 'express'
import InstituteController from '../../controllers/institute/institute.controller'
const router = express.Router()

router.route("/").post(InstituteController.createInstitute);

export default router