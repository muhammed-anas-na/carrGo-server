import express  from "express"
import {userController} from '../../libs/controller'
import authMiddlewawre from "../../libs/middleware/authMiddleware"
import axios from 'axios';

export default (dependencies:any)=>{
    const router = express.Router();
    const {
        login_controller,
        signup_controller,
        googleAuth_controller,
        sendOtp_controller,
        searchLocationController,
        sendSms_controller,
        getUserDetails_controller,
        getAllUsers_controller,
    } = userController(dependencies)

    router.post('/login' ,login_controller)
    router.post('/send-otp' , sendOtp_controller)
    router.post('/signup' , signup_controller)
    router.post('/google/auth' , googleAuth_controller)
    router.post('/send-sms' , sendSms_controller)
    router.post('/get-user-details', getUserDetails_controller)

    router.post('/search-location' , searchLocationController)
    router.get('/get-all-users' , getAllUsers_controller)

    return router
}