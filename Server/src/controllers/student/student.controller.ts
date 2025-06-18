import { Response } from "express";
import { IExtendedRequest } from "../../middlewares/type";
import sequelize from "../../database/connection";

const getStudent = async (req : IExtendedRequest, res: Response)=>{
   const instituteNumber = req.user?.currentInstituteNumber

   const students = await sequelize.query(`SELECT *FROM student_${instituteNumber}`)

   res.status(200).json({
    message : "Students Details Fetched!",
    data : students
   })
}

export {getStudent}