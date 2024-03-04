import { NextFunction, Request , Response } from "express";
export default (dependencies:any)=>{
    const refreshToken_controller =  async(req: Request,res: Response,next: NextFunction)=>{
        try{
            const {useCases:{refreshToken_usecase}} = dependencies
            console.log("In refreshtoken controller" , req.session.refreshToken);
            const response = await refreshToken_usecase(dependencies).execute(req.session.refreshToken);
            console.log("Response ==>",response)
            res.status(200).json(response);
        }catch(err){
            console.log("Something went wrong." , err)
            next(err)
        }

    }
    return refreshToken_controller
}