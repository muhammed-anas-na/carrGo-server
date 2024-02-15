import { Request,Response,NextFunction } from "express";

export default (dependencies: any)=>{
    const  sendOtp =async(req: Request,res: Response,next: NextFunction)=>{
        try{
            const {useCases:{sendOtp_usecase}} = dependencies;
            const response = await sendOtp_usecase(dependencies).execute(req.body);
            console.log(response);
            req.session.otp = response.otp;
            res.status(200).json(response.emailResult)

        }catch(err){
            console.log("Something went wrong on sendotp controller",err)
            next(err);
        }
    }
    return sendOtp;
}