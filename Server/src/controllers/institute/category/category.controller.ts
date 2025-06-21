import { Response } from "express";
import { IExtendedRequest } from "../../../middlewares/type";
import sequelize from "../../../database/connection";
import { QueryTypes } from "sequelize";

const createCategory = async (req: IExtendedRequest, res: Response)=>{
    const instituteNumber = req.user?.currentInstituteNumber
    const {categoryName, categoryDescription} = req.body

    if(!categoryName || !categoryDescription){
        res.status(400).json({
            message : "Please provide Category Name and Category Description!"
        })

        return
    }

    await sequelize.query(`INSERT INTO category_${instituteNumber}(
      categoryName, categoryDescription
    ) VALUES(?,?)`,{
        replacements : [categoryName, categoryDescription],
        type : QueryTypes.INSERT
    })

    res.status(200).json({
        message : "Category added successfully!"
    })
}

const getCategory = async (req: IExtendedRequest, res: Response)=>{

    const instituteNumber = req.user?.currentInstituteNumber
    const categories = await sequelize.query(`SELECT *FROM category_${instituteNumber}`,{
        type : QueryTypes.SELECT
    })

    res.status(200).json({
        message : "Categories fetched successfully!",
        categories : categories
    })

}

const deleteCategory = async (req: IExtendedRequest, res: Response)=>{

    const instituteNumber = req.user?.currentInstituteNumber
    const {id} = req.params

    await sequelize.query(`DELETE FROM category_${instituteNumber} WHERE id = ?`,{
        replacements : [id],
        type : QueryTypes.DELETE
    })

    res.status(200).json({
        message : "Successfully deleted"
    })

}


export {createCategory, getCategory, deleteCategory}