import { Response } from "express";
import { IExtendedRequest } from "../../middlewares/type";
import sequelize from "../../database/connection";
import { QueryTypes } from "sequelize";
import bcrypt from 'bcrypt'
import generateJwtToken from "../../services/generateJwtToken";


interface ITeacherInterface{
    teacherPassword : string,
    id : string
}

const teacherLogin = async (req: IExtendedRequest, res: Response)=>{
const {teacherEmail, teacherPassword, teacherInstitute} = req.body;

if(!teacherEmail || !teacherPassword || !teacherInstitute)

    return res.status(400).json({
        message : "Please enter all the details!"
    })

    const teacherData : ITeacherInterface[] = await sequelize.query(`SELECT *FROM teacher_${teacherInstitute} WHERE teacherEmail = ?`,{
        type : QueryTypes.SELECT,
        replacements : [teacherEmail]
    })

    if((await teacherData).length === 0){
        return res.status(400).json({
            message : "Invalid crediantials"
        })
    }

    const isPasswordMatched = bcrypt.compareSync(teacherPassword, teacherData[0].teacherPassword);

    if(!isPasswordMatched){
        res.status(400).json({
            message : "Inavlid crediantials!"
        })
    }
    else{
        // generate jwt tokens

       const token =  generateJwtToken({id : teacherData[0].id,instituteNumber: teacherInstitute})

       res.status(200).json({
        message : "Teacher Logged In Successfully!",
        token : token
       })

    }

}

export{teacherLogin}