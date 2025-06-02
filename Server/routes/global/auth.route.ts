import express from 'express'
import AuthController from '../../src/controllers/global/auth/auth.controller'
const router = express.Router()

router.route("/register").post(AuthController.registerUser);

export default router