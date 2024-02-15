
import tripRepository from "../app/repository/trip.repository";
import { 
    findcab_usecase,
    updateDriverLocation_usecase  ,
    matchDriver_usecase ,
    calculateTripDetails_usecase ,
    getCoordinates_usecase,
    updateLiveStatus_usecase,
    getLiveDrivers_usecase,
    finishTrip_usecase,
    getAllTripsOfUser_usecase,
    getCurrentLocation_usecase,
    getOnlineDrivers_usecase,
    
} from "../libs/useCases";




const useCases:any = {
    findcab_usecase,
    updateDriverLocation_usecase,
    matchDriver_usecase,
    calculateTripDetails_usecase,
    getCoordinates_usecase,
    updateLiveStatus_usecase,
    getLiveDrivers_usecase,
    finishTrip_usecase,
    getAllTripsOfUser_usecase,
    getCurrentLocation_usecase,
    getOnlineDrivers_usecase,
}

const repository:any = {
    tripRepository
}

export default {useCases , repository}

