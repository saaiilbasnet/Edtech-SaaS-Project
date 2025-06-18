import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'
import User from "../database/models/user.model";
import { IExtendedRequest } from "./type";

    //creating a interface

    // interface IExtendedRequest extends Request{
    //     user ?:{
    //         email : string,
    //         role : string,
    //         username : string | null
    //     }
    // }


    const isLoggedIn = async (req: IExtendedRequest, res: Response, next:NextFunction)=>{

        //check if login
        //token accept
        const token = req.headers.authorization;

        if(!token){
            res.status(401).json({
                message : "Please provide token!"
            })
            return 
        }

        //verify token
        jwt.verify(token, 'thisIsSecret', async (error, result: any)=>{
            if(error){
                res.status(403).json({
                    message : "Token Invalid"
                })
            }
            else{
                console.log(result);
                const userData = await User.findByPk(result.id,{
                    attributes : ['id','currentInstituteNumber']
                })

                if(!userData){
                    res.status(403).json({
                        message : "No user Matched!"
                    })
                }else{
                    req.user = userData
                    next()
                }

            }
        })

    }
    export default isLoggedIn 
