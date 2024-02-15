import { NextFunction, Request , Response } from "express";


export default (dependencies:any)=>{
    const getUserDetails_controller =  async(req: Request,res: Response,next: NextFunction)=>{
        try{
            const {useCases:{getUserDetails_usecase}} = dependencies
            const {Id} = req.body;
            const response = await getUserDetails_usecase(dependencies).execute(Id);
            console.log("response ==>" ,response);
            res.status(200).json(response);
        }catch(err){
            console.log("Something went wrong." , err)
            next(err)
        }

    }
    return getUserDetails_controller
}