import { Request,Response,NextFunction } from "express";
export default (dependencies:any)=>{
    const getTripDetailsById_controller =  async(req:Request,res:Response,next:NextFunction)=>{ 
        try{
            const {useCases:{getTripDetailsById_usecase}} = dependencies;
            const response = await getTripDetailsById_usecase(dependencies).execute(req.body);
            console.log("Trip details by Id ==>" , response);
            res.status(200).json(response);
        }catch(err){
            console.log("Error catched at trip controller =>" , err)
            next(err);
        }  
    }
    return getTripDetailsById_controller; 
}