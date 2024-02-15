import express  from "express"
import {adminController} from '../../libs/controller'

export default (dependencies:any)=>{
    const router = express.Router();
    const {
        findcab_controller  , 
        getCoordinates_controller,
        getLiveDrivers_controller,
        stripe_controller,
        finishTrip_controller,
        getAllTripsOfUser_controller,
        getCurrentLocation_controller,
        getOnlineDrivers_controller,
        
    } = adminController(dependencies)
    
    router.post('/find-cab' , findcab_controller)
    router.post('/get-coordinates' , getCoordinates_controller);
    router.post('/get-live-drivers' , getLiveDrivers_controller)
    router.post('/create-stripe-session', stripe_controller)
    router.post('/finish-trip' , finishTrip_controller)
    router.post('/get-all-trips-of-user' , getAllTripsOfUser_controller)
    router.post('/get-current-location' , getCurrentLocation_controller)

    router.get('/get-online-drivers' , getOnlineDrivers_controller)
    return router
}