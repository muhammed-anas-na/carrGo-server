import express  from "express"
import {userController} from '../../libs/controller'

export default (dependencies:any)=>{
    const router = express.Router();
    const {
        login_controller ,
        signup_controller ,
        sendotp_controller ,
        checkotp_controller ,
        sendSms_controller ,
        getDriverDetails_controller,
        getAllDrivers_controller,
        blockDriverById_controller,
        updateWallet_controller,
    
    } = userController(dependencies)
    router.post('/login' , login_controller)
    router.post('/signup' , signup_controller)
    router.post('/send-otp' , sendotp_controller)
    router.post('/send-sms' , sendSms_controller)
    router.post('/check-otp' , checkotp_controller)
    router.post('/get-driver-details' , getDriverDetails_controller)
    router.post('/block-driver' , blockDriverById_controller)

    router.get('/get-all-drivers' , getAllDrivers_controller)

    router.put('/update-wallet' , updateWallet_controller)

    return router
}