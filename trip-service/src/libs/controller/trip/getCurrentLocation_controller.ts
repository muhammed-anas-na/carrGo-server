import { Request,Response,NextFunction } from "express";
export default (dependencies:any)=>{
    const getCurrentLocation_controller =  async(req:Request,res:Response,next:NextFunction)=>{ 
        try{
            const {useCases:{getCurrentLocation_usecase}} = dependencies;
            const response = await getCurrentLocation_usecase(dependencies).execute(req.body);
            res.status(200).json(response.features[0].place_name);
        }catch(err){
            console.log("Error catched at trip controller =>" , err)
            next(err);
        }  
    }
    return getCurrentLocation_controller; 
} 