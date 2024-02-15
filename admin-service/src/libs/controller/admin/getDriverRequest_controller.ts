import { NextFunction, Request , Response } from "express"

export default (dependencies:any)=>{
    const getDriverRequest_controller =  async(req: Request,res: Response,next: NextFunction)=>{
        try{
            const {useCases:{getDriverRequest_usecase}} = dependencies
            const response = await getDriverRequest_usecase(dependencies).execute();
            console.log("Response ==>" , response);
            res.status(200).json(response);
        }catch(err){
            console.log("Something went wrong." , err)
            next(err)
        }

    }
    return getDriverRequest_controller;
}