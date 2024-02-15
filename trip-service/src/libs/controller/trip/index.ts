import findcab_controller from "./findcab_controller"
import updateDriverLocation_controller from "./updateDriverLocation_controller"
import matchDriver_controller from "./matchDriver_controller"
import calculateTripDetails_controller from "./calculateTripDetails_controller"
import getCoordinates_controller from "./getCoordinates_controller"
import updateLiveStatus_controller from "./updateLiveStatus_controller"
import getLiveDrivers_controller from "./getLiveDrivers_controller"
import stripe_controller from "./stripe_controller"
import finishTrip_controller from "./finishTrip_controller"
import getAllTripsOfUser_controller from "./getAllTripsOfUser_controller"
import getCurrentLocation_controller from "./getCurrentLocation_controller"
import getOnlineDrivers_controller from './getOnlineDrivers_controller'

export default (dependencies:any)=>{
    return {
        findcab_controller:findcab_controller(dependencies),
        updateDriverLocation_controller:updateDriverLocation_controller(dependencies),
        matchDriver_controller:matchDriver_controller(dependencies),
        calculateTripDetails_controller:calculateTripDetails_controller(dependencies),
        getCoordinates_controller:getCoordinates_controller(dependencies),
        updateLiveStatus_controller:updateLiveStatus_controller(dependencies),
        getLiveDrivers_controller:getLiveDrivers_controller(dependencies),
        stripe_controller:stripe_controller(dependencies),
        finishTrip_controller:finishTrip_controller(dependencies),
        getAllTripsOfUser_controller:getAllTripsOfUser_controller(dependencies),
        getCurrentLocation_controller:getCurrentLocation_controller(dependencies),
        getOnlineDrivers_controller:getOnlineDrivers_controller(dependencies),
    }
}