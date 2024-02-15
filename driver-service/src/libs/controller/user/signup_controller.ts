import {Request,Response,NextFunction} from 'express';

export default(dependencies:any)=>{
    const signup = async(req: Request,res: Response,next:NextFunction)=>{
        try{
            console.log(req.body);
            const {useCases:{signup_usecase}} = dependencies;
            const {full_name,email,phone,password, ...vehicle_details} = req.body;
            console.log("Vehicle details ==> ",vehicle_details);
            const response = await signup_usecase(dependencies).execute(full_name,email,phone,password , vehicle_details);
            console.log(response)
            res.status(200).json(response)
        }catch(err){
            console.log("Something went wrong" ,err)
            next(err)
        }
    }

    return signup

}