import { NextFunction, Request, Response } from "express"

export default (dependencies: any) => {
    const blockDriverById_controller = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { useCases: { blockDriverById_usecase } } = dependencies
            console.log("reqBody==>" , req.body);
            const response = await blockDriverById_usecase(dependencies).execute(req.body);
            console.log("Response ==>", response)
            res.status(200).json(response);
        } catch (err) {
            console.log(err);
            next(err);
        }
    }
    return blockDriverById_controller
}