import login_controller from "./login_controller";
import signup_controller from "./signup_controller";
import googleAuth_controller from './googleAuth_controller'
import sendOtp_controler from "./sendOtp_controler";
import sendSms_controller from "./sendSms_controller";
import searchLocationController from "./searchLocationController";
import getUserDetails_controller from "./getUserDetails_controller";
import getAllUsers_controller from "./getAllUsers_controller";

export default (dependencies:any)=>{
    return {
        login_controller:login_controller(dependencies),
        signup_controller:signup_controller(dependencies),
        googleAuth_controller:googleAuth_controller(dependencies),
        sendOtp_controller:sendOtp_controler(dependencies),
        searchLocationController:searchLocationController(dependencies),
        sendSms_controller:sendSms_controller(dependencies),
        getUserDetails_controller:getUserDetails_controller(dependencies),
        getAllUsers_controller:getAllUsers_controller(dependencies),
    }
}