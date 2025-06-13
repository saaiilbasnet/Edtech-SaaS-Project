import { Request, Response } from "express";
import sequelize from "../../database/connection";
import generateRandomInsituteNumber from "../../services/generateRandomInstituteNumber";

class InstituteController{
    static async createInstitute(req : Request, res: Response){

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
            id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
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

            await sequelize.query(`CREATE TABLE IF NOT EXISTS teacher_${instituteNumber}(
            id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, 
            teacherName VARCHAR(255) NOT NULL, 
            teacherEmail VARCHAR(255) NOT NULL UNIQUE, 
            teacherPhoneNumber VARCHAR(255) NOT NULL UNIQUE
            )`)

            res.status(201).json({
                message : "Institute created!"
            })

    }
}

export default InstituteController