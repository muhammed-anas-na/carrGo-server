import { 
    loginDriver_usecase,
    signup_usecase ,
    sendOtp_usecase ,
    checkotp_usecase ,
    sendSms_usecase ,
    getDriverDetails_usecase,
    getAllDrivers_usecase,
    adminAcceptedDriverRequest_usecase,
} from "../libs/useCases";
import driverRepository from "../app/repository/driver.repository";

const useCases:any = {
    loginDriver_usecase,
    signup_usecase,
    sendOtp_usecase,
    checkotp_usecase,
    sendSms_usecase,
    getDriverDetails_usecase,
    getAllDrivers_usecase,
    adminAcceptedDriverRequest_usecase,
}

const repository:any = {
    driverRepository
}

export default {useCases , repository}

