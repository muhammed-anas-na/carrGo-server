import { NextFunction, Request , Response } from "express";


export default (dependencies:any)=>{
    const getAllUsers_controller =  async(req: Request,res: Response,next: NextFunction)=>{
        try{
            const {useCases:{getAllUser_usecase}} = dependencies
            const response = await getAllUser_usecase(dependencies).execute();
            console.log("response ==>" ,response);
            res.status(200).json(response);
        }catch(err){
            console.log("Something went wrong." , err)
            next(err)
        }

    }
    return getAllUsers_controller;
}