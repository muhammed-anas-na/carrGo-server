import { NextFunction, Request , Response } from "express"

export default (dependencies:any)=>{
    const acceptDriverRequest_controller =  async(req: Request,res: Response,next: NextFunction)=>{
        try{
            const {useCases:{acceptDriverRequest_usecase}} = dependencies
            const response = await acceptDriverRequest_usecase(dependencies).execute(req.body);
            console.log("Response ==>" , response);
            res.status(200).json(response);
        }catch(err){
            console.log("Something went wrong." , err)
            next(err)
        }

    }
    return acceptDriverRequest_controller;
}