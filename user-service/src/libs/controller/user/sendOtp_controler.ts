import { NextFunction, Request, Response } from "express";



export default (dependencies: any) => {
  const sendOtp_controller = async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log("SENDOTP CONTROLLER HEADER ==>",req.headers)
      const { useCases: { sendOtp_usecase } } = dependencies;
      const response = await sendOtp_usecase(dependencies).execute(req.body);
      if (req.session) {
        req.session.otp = response.otp;
        console.log(req.session)
      } else {
        console.error('Session or custom property is undefined');
      }
      res.status(200).json(response.emailResult)
    } catch (err) {
      console.log("Error in otp controleer =>", err)
      next(err);
    }
  }

  return sendOtp_controller;
}