import { NextFunction, Request, Response } from "express"

export default (dependencies: any) => {
    const checkOtp = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { useCases: { checkotp_usecase } } = dependencies
            const response = await checkotp_usecase(dependencies).execute(req.body);
            console.log("Response ==>", response)
            if (req.session.otp != response.otp) {
                throw new Error("Invalid otp")
            }
            res.status(200).json({})
        } catch (err) {
            console.log(err);
            next(err);
        }
    }
    return checkOtp
}