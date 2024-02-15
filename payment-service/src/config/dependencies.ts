import {
    loginAdmin_usecase,

} from "../libs/useCases";
import adminRepository from "../app/repository/payment.repository";

const useCases:any = {
    loginAdmin_usecase,
}

const repository:any = {
    adminRepository
}

export default {useCases , repository}

