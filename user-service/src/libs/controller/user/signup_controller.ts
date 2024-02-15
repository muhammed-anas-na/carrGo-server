import {Request,Response,NextFunction} from 'express';

export default(dependencies:any)=>{
    const signup = async(req: Request,res: Response,next:NextFunction)=>{
        try{
            console.log("SIGNUP CONTROLLER HEADER ==>",req.headers)
            console.log(req.session.otp , req.body.otp);
            if(req.session.otp != req.body.otp){
                throw new Error("Invalid otp");
            }
            const {useCases:{signup_usecase}} = dependencies;
            const {full_name,email,phone,password} = req.body;
            const response = await signup_usecase(dependencies).execute(full_name,email,phone,password);
            console.log(response)
            res.status(200).json(response)
        }catch(err){
            console.log("Something went wrong" ,err)
            next(err)
        }
    }
    return signup
}