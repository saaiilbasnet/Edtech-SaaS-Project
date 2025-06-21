import { NextFunction, Request, Response } from "express";
import sequelize from "../../database/connection";
import generateRandomInsituteNumber from "../../services/generateRandomInstituteNumber";
import { IExtendedRequest } from "../../middlewares/type";
import User from "../../database/models/user.model";
import categories from "../../seed";

class InstituteController{
    static async createInstitute(req : IExtendedRequest, res: Response, next: NextFunction){

        const {instituteName, instituteEmail, institutePhoneNumber, instituteAddress} = req.body;

        const {instituteVatNo} = req.body || null
        const {institutePanNo} = req.body || null

        if(!instituteName || !instituteEmail || !institutePhoneNumber || !instituteAddress){
            res.status(400).json({
                message : "Please provide all details!"
            })
            return
        }
        const instituteNumber = generateRandomInsituteNumber()
        await sequelize.query(`CREATE TABLE IF NOT EXISTS institute_${instituteNumber}(
            id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
            instituteName VARCHAR(255) NOT NULL UNIQUE,
            instituteEmail VARCHAR(255) NOT NULL UNIQUE,
            institutePhoneNumber VARCHAR(255) NOT NULL UNIQUE,
            instituteAddress VARCHAR(255) NOT NULL,
            institutePanNo VARCHAR(255) NOT NULL,
             instituteVatNo VARCHAR(255) NOT NULL,
             createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
             updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP

            )`)

            await sequelize.query(`INSERT INTO institute_${instituteNumber}(instituteName, instituteEmail, institutePhoneNumber, instituteAddress, institutePanNo, instituteVatNo) VALUES(?,?,?,?,?,?)`,{
                replacements : [instituteName, instituteEmail, institutePhoneNumber, instituteAddress, institutePanNo, instituteVatNo]
            })

            //tracking user history

            await sequelize.query(`CREATE TABLE IF NOT EXISTS user_institution(
                id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
                userId VARCHAR(255) REFERENCES users(id),
                instituteNumber INT UNIQUE
                )`)

                if(req.user){
                    // console.log("Triggered"); 
                    await sequelize.query(`INSERT INTO user_institution(userId, instituteNumber) VALUES(?,?)`,{
                        replacements : [req.user.id, instituteNumber]
                    })
                }

            //updating the database

            await User.update({
                currentInstituteNumber : instituteNumber,
                role : 'institute'
            },{
                where : {
                    id : req.user?.id
                }
            })

            req.instituteNumber = instituteNumber
        next()     
    }

static async createTeacherTable(req: IExtendedRequest, res: Response, next : NextFunction){

    const instituteNumber = req.instituteNumber

     await sequelize.query(`CREATE TABLE IF NOT EXISTS teacher_${instituteNumber}(
            id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()), 
            teacherName VARCHAR(255) NOT NULL, 
            teacherEmail VARCHAR(255) NOT NULL UNIQUE, 
            teacherPhoneNumber VARCHAR(255) NOT NULL UNIQUE,
            teacherExperties VArCHAR(255) NOT NULL,
            joinedDate DATE NOT NULL,
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
             updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )`)
            next()

}

static async createStudentTable(req: IExtendedRequest, res: Response, next: NextFunction){

    const instituteNumber = req.instituteNumber
     await sequelize.query(`CREATE TABLE IF NOT EXISTS student_${instituteNumber}(
        id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()), 
        studentName VARCHAR(255) NOT NULL, 
        studentPhoneNo VARCHAR(255) NOT NULL UNIQUE,
        studentAddress TEXT NOT NULL,
        enrolledDate DATE NOT NULL,
        studentImage VARCHAR(255),
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
         updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )`)
    next()

}

static async createCourseTable(req: IExtendedRequest, res : Response)
{

    const instituteNumber = req.instituteNumber
    await sequelize.query(`CREATE TABLE IF NOT EXISTS course_${instituteNumber}(
        id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
        courseName VARCHAR(255) NOT NULL UNIQUE,
        coursePrice VARCHAR(255) NOT NULL,
        courseDuration VARCHAR(100) NOT NULL,
        courseLevel ENUM('beginner','intermediate','advance') NOT NULL,
        courseThumbnail VARCHAR(255) NOT NULL,
        courseDescription TEXT NOT NULL,
        categoryId VARCHAR(36) NOT NULL REFERENCES category_${instituteNumber} (id),
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )`)

        res.status(201).json({
            message : "Institute Created!",
            instituteNumber : instituteNumber
        })
}

static async createCategory(req: IExtendedRequest, res:Response, next: NextFunction){

    const instituteNumber = req.instituteNumber
    
    sequelize.query(`CREATE TABLE category_${instituteNumber}(
        id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
        categoryName VARCHAR(255) NOT NULL,
        categoryDescription TEXT,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )`)

    categories.forEach(async (category)=>{
        await sequelize.query(`INSERT INTO category_${instituteNumber}(
            categoryName, categoryDescription
            ) VALUES (?,?)`,{
                replacements : [category.categoryName, category.categoryDescription]
            })
    })
    next()
}

}

export default InstituteController