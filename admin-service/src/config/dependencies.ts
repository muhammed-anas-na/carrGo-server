import {
    loginAdmin_usecase,
    newDriverCreated_usecase,
    getDriverRequest_usecase,
    acceptDriverRequest_usecase,
} from "../libs/useCases";
import adminRepository from "../app/repository/admin.repository";

const useCases:any = {
    loginAdmin_usecase,
    newDriverCreated_usecase,
    getDriverRequest_usecase,
    acceptDriverRequest_usecase,
}

const repository:any = {
    adminRepository
}

export default {useCases , repository}

