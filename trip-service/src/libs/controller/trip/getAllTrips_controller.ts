import {Request, Response, NextFunction } from "express";
export default (dependencies:any)=>{
    const getAllTrips_controller = async(req: Request,res: Response,next: NextFunction)=>{ 
        try{
            const {useCases:{getAllTrips_usecase}} = dependencies;
            const response = await getAllTrips_usecase(dependencies).execute();
            res.status(200).json(response)
        }catch(err){
            console.log("Error catched at trip controller =>" , err)
            next(err);
        }  
    }
    return getAllTrips_controller;
}