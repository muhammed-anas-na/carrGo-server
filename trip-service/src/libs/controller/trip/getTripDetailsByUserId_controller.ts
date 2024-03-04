import { NextFunction, Request , Response } from "express";
export default (dependencies:any)=>{
    const getTripDetailsByUserId_controller =  async(req: Request,res: Response,next: NextFunction)=>{
        try{
            const {useCases:{getTripDetailsByUserId_usecase}} = dependencies
            console.log("Reqbody =>" , req.body);
            const response = await getTripDetailsByUserId_usecase(dependencies).execute(req.body);
            console.log("response ==>" ,response);
            res.status(200).json(response);
        }catch(err){
            console.log("Something went wrong." , err)
            next(err)
        }

    }
    return getTripDetailsByUserId_controller
}