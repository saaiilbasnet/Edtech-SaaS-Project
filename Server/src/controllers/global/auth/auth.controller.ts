
import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import User from '../../../database/models/user.model'
import jwt from 'jsonwebtoken'

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

    static async loginUser(req: Request, res: Response){

        const {username, password} = req.body;

        if(!username || !password){
            res.status(400).json({
                message : "Please enter username and password"
            })
            return;
        }
           const data = await User.findAll({
                where : {
                    username : username
                }
            })

            //check if the username exits
            if(data.length == 0){
                res.status(404).json({
                    message : "Not Registered!"
                })
            }else{
                //check if the password verify by comparing hash

                const isPasswordMatch = bcrypt.compareSync(password, data[0].password);

                if(isPasswordMatch){
                    //login success --> will get a token
                    const token = jwt.sign({
                        id : data[0].id
                    },'thisIsSecret',{
                         expiresIn : '30d'
                    })
                    res.json({
                        token : token
                    })

                }else{
                    res.status(403).json({
                        message : "Invalid Email or Password!"
                    })
                }

            }

        }

    }


export default AuthController
