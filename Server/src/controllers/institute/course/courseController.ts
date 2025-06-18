import { Response } from "express";
import { IExtendedRequest } from "../../../middlewares/type";
import sequelize from "../../../database/connection";

exports.createCourse = async (req: IExtendedRequest, res: Response)=>{
    const {coursePrice, courseName, courseDescription, courseDuration, courseLevel} = req.body;

    //validation

    if(!coursePrice || !courseName || !courseDescription || !courseDuration || !courseLevel){
        return res.status(400).json({
            message : "Please provide all details"
        })
    }

    const instituteNumber = req.user?.currentInstituteNumber
    const courseThumbnail = null
    const returnedData = await sequelize.query(`INSERT INTO course_${instituteNumber}(
        coursePrice,courseName,courseDescription,courseDuration,courseLevel
        )`,{
            replacements : [coursePrice, courseName, courseDescription, courseDuration, courseLevel]
        })

        console.log(returnedData);
        res.status(200).json({
            message : "Course Created Successfully"
        })
        
}

exports.deleteCourse = async (req: IExtendedRequest, res : Response)=>{
    const instituteNumber = req.user?.currentInstituteNumber;
    const courseId = req.params.id;

    const [courseData] = await sequelize.query(`SELECT *FROM course_${instituteNumber} WHERE id=?`,{
        replacements : [courseId]
    })
}