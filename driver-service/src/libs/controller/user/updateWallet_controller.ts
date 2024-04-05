import {Request,Response,NextFunction} from 'express';

export default(dependencies:any)=>{
    const updateWallet_controller = async(req: Request,res: Response,next:NextFunction)=>{
        try{
            console.log(req.body);
            const {useCases:{updateWallet_usecase}} = dependencies;
            const response = await updateWallet_usecase(dependencies).execute(req.body);
            console.log("Response in updatewallet",response)
            res.status(200).json(response)
        }catch(err){
            console.log("Something went wrong" ,err)
            next(err)
        }
    }

    return updateWallet_controller;

}