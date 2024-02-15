import { Request,Response,NextFunction } from "express";
export default (dependencies:any)=>{
    const getOnlineDrivers_controller =  async(req:Request,res:Response,next:NextFunction)=>{ 
        try{
            const {useCases:{getOnlineDrivers_usecase}} = dependencies;
            const response = await getOnlineDrivers_usecase(dependencies).execute(req.body);
            console.log("response ==>" , response);
            res.status(200).json(response);
        }catch(err){
            console.log("Error catched at trip controller =>" , err)
            next(err);
        }  
    }
    return getOnlineDrivers_controller; 
} 