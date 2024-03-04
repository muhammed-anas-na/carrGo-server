import { Request,Response,NextFunction } from "express";
export default (dependencies:any)=>{
    const getTripDetailsByDriverId_controller =  async(req:Request,res:Response,next:NextFunction)=>{ 
        try{
            const {useCases:{getTripDetailsByDriverId_usecase}} = dependencies;
            const response = await getTripDetailsByDriverId_usecase(dependencies).execute(req.body);
            console.log("Trip details by driver Id ==>" , response);
            res.status(200).json(response);
        }catch(err){
            console.log("Error catched at trip controller =>" , err)
            next(err);
        }  
    }
    return getTripDetailsByDriverId_controller; 
}