import { Response } from "express";
import { IExtendedRequest } from "../../../middlewares/type";
import generateRandomPassword from "../../../services/generateRandomPassword";
import sequelize from "../../../database/connection";
import { QueryTypes } from "sequelize";
import sendMail from "../../../services/sendMail";

const createTeacher = async (req: IExtendedRequest, res: Response)=>{
    const instituteNumber = req.user?.currentInstituteNumber
    const {teacherName, teacherEmail, teacherPhoneNumber, teacherExperties, teacherSalary, teacherJoinedDate, courseId} =req.body;
    const teacherPhoto = req.file?req.file.path : "https://images.app.goo.gl/fupd5frM7yaRhu1v5"

    if(!teacherName || !teacherEmail || !teacherPhoneNumber || !teacherExperties || !teacherSalary || !teacherJoinedDate){
        return res.status(400).json({
            message : "Enter all details!"
        })
    }

    const data = generateRandomPassword(teacherName);

    const insertedData = await sequelize.query(`INSERT INTO teacher_${instituteNumber}(
        teacherName, teacherEmail, teacherPhoneNumber, teacherExperties, joinedDate, salary, teacherPhoto, teacherPassword
        ) VALUES(?,?,?,?,?,?,?,?)`,{            
            type : QueryTypes.INSERT,
            replacements : [teacherName, teacherEmail, teacherPhoneNumber, teacherExperties, teacherJoinedDate, teacherSalary, teacherPhoto, data.hashedVersion]
        })

         const teacherData : {id:string}[]= await sequelize.query(`SELECT id FROM teacher_${instituteNumber} WHERE teacherEmail=?`,{
        type : QueryTypes.SELECT, 
        replacements : [teacherEmail]
    })

            await sequelize.query(`UPDATE course_${instituteNumber} SET teacherId=? WHERE id=?`,{
        type : QueryTypes.UPDATE,
        replacements : [teacherData[0].id,courseId]
    })

        // send email function

        const mailInformation = {
            to : teacherEmail,
            subject : " Welcome to EdTech Project",
            text : `Welcome Mr/Mrs. ${teacherName},
            Your Email : ${teacherEmail}
            Your Password : ${data.plainVersion}
            Institute Number : ${instituteNumber}
            `
        }

        await sendMail(mailInformation);

        res.status(200).json({
            message : "Successfully created teacher!"
        })
}

const getTeacher = async (req: IExtendedRequest, res: Response)=>{
   const instituteNumber = req.user?.currentInstituteNumber

   const data = await sequelize.query(`SELECT *FROM teacher_${instituteNumber}`,{
    type : QueryTypes.SELECT
   })

   res.status(200).json({
    message : "Successfully fetched teachers!",
    data : data
   })
   
}

const deleteTeacher =  async (req: IExtendedRequest, res: Response)=>{

    const instituteNumber = req.user?.currentInstituteNumber
    const {id} = req.params

    await sequelize.query(`DELETE FROM teacher_${instituteNumber} WHERE id = ?`,{
        type : QueryTypes.DELETE,
        replacements : [id]
    })

    res.status(200).json({
        message : "Sucessfully deleted teacher!"
    })

}

export {createTeacher, getTeacher, deleteTeacher}