import login_controller from "./login_controller";
import signup_controller from "./signup_controller";
import googleAuth_controller from './googleAuth_controller'
import sendotp_controller from "./sendotp_controller";
import checkotp_controller from "./checkotp_controller";
import sendSms_controller from "./sendSms_controller";
import getDriverDetails_controller from "./getDriverDetails_controller";
import getAllDrivers_controller from "./getAllDrivers_controller";

export default (dependencies:any)=>{
    return {
        login_controller:login_controller(dependencies),
        signup_controller:signup_controller(dependencies),
        googleAuth_controller:googleAuth_controller(dependencies),
        sendotp_controller:sendotp_controller(dependencies),
        checkotp_controller:checkotp_controller(dependencies),
        sendSms_controller:sendSms_controller(dependencies),
        getDriverDetails_controller:getDriverDetails_controller(dependencies),
        getAllDrivers_controller:getAllDrivers_controller(dependencies),
    }
} 