import {Request, Response, NextFunction } from "express";
export default (dependencies:any)=>{
    const getAllTripsOfUser_controller = async(req: Request,res: Response,next: NextFunction)=>{ 
        try{
            const {useCases:{getAllTripsOfUser_usecase}} = dependencies;
            const response = await getAllTripsOfUser_usecase(dependencies).execute(req.body);
            console.log("Trips ==> ",response)
            res.status(200).json(response)
        }catch(err){
            console.log("Error catched at trip controller =>" , err)
            next(err);
        }
    }
    return getAllTripsOfUser_controller;
}