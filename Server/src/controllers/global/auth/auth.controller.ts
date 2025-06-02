
import {Request, Response} from 'express'
import User from '../../../database/models/user.model';

class AuthController{
    static async registerUser(req:Request,res:Response){
        const {username, password, email} = req.body;
        
        if(!username || !password || !email){
            res.status(400).json({
                message : "Please Provide username, password, email."
            })
        }
        else{
            await User.create({
                username : username,
                password : password,
                email : email
            })
            res.status(200).json({
                message : "User Register Successfully!"
            })
        }
    }
}

export default AuthController
