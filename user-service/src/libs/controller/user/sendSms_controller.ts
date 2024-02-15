import { NextFunction, Request , Response } from "express";


export default (dependencies:any)=>{
    const login =  async(req: Request,res: Response,next: NextFunction)=>{
        try{
            
            const {useCases:{sendSms_usecase}} = dependencies
            const response = await sendSms_usecase(dependencies).execute(req.body);
            req.session.otp = response.otp;
            console.log(response)
            console.log(req.session)
            res.status(200).json(response.response)
        }catch(err){
            console.log("Something went wrong." , err)
            next(err)
        }

    }
    return login
}