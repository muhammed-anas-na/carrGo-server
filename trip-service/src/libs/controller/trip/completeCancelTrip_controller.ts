import { Request , Response , NextFunction } from "express";

export default (dependencies:any)=>{
    const completeCancelTrip_controller =  async(req:Request , res:Response, next:NextFunction)=>{ 
        try{
            const {useCases:{completeCancelTrip_usecase}} = dependencies;
            console.log("Reqbodyy===>",req.body);
            const response = await completeCancelTrip_usecase(dependencies).execute(req.body)
            res.status(200).json(response);
        }catch(err){
            console.log("Error catched at trip controller =>" , err)
            return err;
        }  
    }
    return completeCancelTrip_controller; 
}