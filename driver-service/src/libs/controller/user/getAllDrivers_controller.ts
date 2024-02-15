import { NextFunction, Request, Response } from "express"

export default (dependencies: any) => {
    const getAllDrivers_controller = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { useCases: { getAllDrivers_usecase } } = dependencies
            const response = await getAllDrivers_usecase(dependencies).execute(req.body);
            console.log("Response ==>", response)
            res.status(200).json(response);
        } catch (err) {
            console.log(err);
            next(err);
        }
    }
    return getAllDrivers_controller
}