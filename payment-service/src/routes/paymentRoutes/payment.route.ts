import express  from "express"
import {adminController} from '../../libs/controller'

export default (dependencies:any)=>{
    const router = express.Router();
    const {stripe_controller} = adminController(dependencies)
    router.post('/create-stripe-session', stripe_controller)
    return router
}