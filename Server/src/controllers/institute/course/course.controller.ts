import { Response } from "express";
import { IExtendedRequest } from "../../../middlewares/type";
import sequelize from "../../../database/connection";
import { QueryTypes } from "sequelize";

const createCourse = async (req: IExtendedRequest, res: Response)=>{
    const {coursePrice, courseName, courseDescription, courseDuration, courseLevel, categoryId} = req.body;

    //validation

    if(!coursePrice || !courseName || !courseDescription || !courseDuration || !courseLevel || !categoryId){
        return res.status(400).json({
            message : "Please provide all details"
        })
    }

    const instituteNumber = req.user?.currentInstituteNumber
    const courseThumbnail = req.body ? req.file?.path : null;
    const returnedData = await sequelize.query(`INSERT INTO course_${instituteNumber}(
        coursePrice,courseName,courseDescription,courseDuration,courseLevel,courseThumbnail, categoryId
        ) VALUES(?,?,?,?,?,?,?)`,{
            replacements : [coursePrice, courseName, courseDescription, courseDuration, courseLevel, courseThumbnail, categoryId],
            type : QueryTypes.INSERT
        })

        console.log(returnedData);
        res.status(200).json({
            message : "Course Created Successfully"
        })
        
}

const deleteCourse = async (req: IExtendedRequest, res : Response)=>{
    const instituteNumber = req.user?.currentInstituteNumber;
    const courseId = req.params.id;

    const [courseData] = await sequelize.query(`SELECT *FROM course_${instituteNumber} WHERE id=?`,{
        replacements : [courseId]
    })

    if(courseData.length == 0){
        return res.status(404).json({
            message : "No Course with that id found."
        })
    }

    await sequelize.query(`DELETE FROM course_${instituteNumber} WHERE id=?`,{
        replacements : [courseId],
        type : QueryTypes.DELETE
    })

    res.status(200).json({
        message : "Course Deleted!"
    })
}

const getAllCourse = async(req: IExtendedRequest, res: Response)=>{
   const instituteNumber = req.user?.currentInstituteNumber
   const courses = await sequelize.query(`SELECT *FROM course_${instituteNumber} LEFT JOIN category_${instituteNumber} ON course_${instituteNumber}.categoryId = category_${instituteNumber}.id`,{
    type : QueryTypes.SELECT
   })
   res.status(200).json({
    message : "Course Fetched!",
    data : courses
   })
}

const getSingleCourse = async (req : IExtendedRequest, res : Response)=>{
        const {courseId} = req.params;
      const instituteNumber = req.user?.currentInstituteNumber
    const course = await sequelize.query(`SELECT *FROM course_${instituteNumber} WHERE id = ?`,{
        replacements : [courseId],
        type : QueryTypes.SELECT
    })
    res.status(200).json({
        message : "Single Course Fetched!",
        data : course
    })
}

export {createCourse, getAllCourse, getSingleCourse, deleteCourse}