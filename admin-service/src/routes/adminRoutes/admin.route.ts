import express  from "express"
import {adminController} from '../../libs/controller'

import axios from 'axios'
export default (dependencies:any)=>{
    const router = express.Router();
    const {
        login_controller,
        getDriverRequest_controller,
        acceptDriverRequest_controller,
        
    } = adminController(dependencies)
    router.post('/login' , login_controller)
    router.get('/get-driver-request' , getDriverRequest_controller)
    router.post('/accept-driver-request' , acceptDriverRequest_controller)

    return router
}