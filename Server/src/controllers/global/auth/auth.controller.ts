
import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import User from '../../../database/models/user.model';

class AuthController {
    static async registerUser(req: Request, res: Response) {

                    if(req.body == undefined){
        res.status(400).json({
            message  : "No data was sent!!"
        })
        return
    }

        const { username, password, email } = req.body;


        if (!username || !password || !email) {
            res.status(400).json({
                message: "Please Provide username, password, email."
            })
        }
        else {
            await User.create({
                username: username,
                password: bcrypt.hashSync(password,12),
                email: email
            })
            res.status(201).json({
                message: "User Register Successfully!"
            })
        }
    }
}

export default AuthController
