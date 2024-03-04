import { driver } from '../database/models/driverModel'
import { trip } from '../database/models/tripModel'
interface DriverLoctionData { 
    _id: string,
    Id: string,
    latitude: string,
    longitude: string,
    vehicle_details:{
        vehicle_category: string,
    }
}

interface TripData {
    request: {
      userId: string;
      DriverId: string;
      from: string; 
      to: string; 
      total_price:string;
    }[];
    ETA: number,
  }

export default {
    updateDriverLocation: async (data: DriverLoctionData) => {
        const userExist = await driver.findById(data._id)
        if (userExist) {
            const newDriver = await driver.updateOne(
                { _id: data._id },
                {
                    $set: { socketId: data.Id , isLive:true },
                    $push: {
                        "location.coordinates": {
                            $each: [data.longitude , data.latitude],
                            $position: 0, // Add to the beginning of the array
                            $slice: 2, // Keep only the first 2 elements in the array
                        },
                    },
                }
            );
           return newDriver;
        } else {
            // User does not exist, insert a new user
            const newDriver = await driver.insertMany({
                _id: data._id,
                socketId: data.Id,
                isLive:true,
                category:data.vehicle_details.vehicle_category,
                location: {
                    type:"Point",
                    coordinates:[data.longitude,data.latitude]
                },
            });
            return newDriver;
        }
    },

    matchDriver:async(data: [Number , Number])=>{
        const queryResponse  = await driver.findOne({location:{$near:{$geometry:{type: 'Point' , coordinates:[data[0] , data[1]]}}}})
        return queryResponse;
    },

    createTrip:async(data:TripData)=>{
        console.log("Data in repository ==> ", data);
        const otp = Math.floor(Math.random() * 9000) + 1000;
        const newTrip = await trip.insertMany({
            customerId: data.request[0].userId,
            driverId: data.request[0].DriverId,
            pickup_location: data.request[0].from,
            dropoff_location: data.request[0].to,
            fare: data.request[0].total_price,
            status:'driver-accepted',  
            otp,
            ETA: data.ETA,
        })
        return newTrip;
    },

    findDriverById:async(Id: string)=>{
        return driver.findById(Id);
    },

    updateLiveStatus:async(data: {_id: string , status: boolean})=>{
        let result = await driver.findByIdAndUpdate(data._id , {isLive : data.status}  , {new:true})
        console.log(result);
        
    },
    findLiveDrivers:async()=>{
        const liveDrivers = await driver.find({isLive:true})
        return liveDrivers.some((driver: any)=>driver.category == 'hashback')
    },
    updateTripDetails:async(data: any)=>{
        console.log(data);
        let result = await trip.findByIdAndUpdate(data.tripData._id ,{
            review: data.review,
            status:data.status,
            pickup_time:data.pickup_time,
            dropoff_time:data.dropoff_time,
            rating:data.rating,
        } )
        return result;
    },
    completeCancelTrip:async(data:any)=>{
        let result = await trip.findByIdAndUpdate(data.tripData._id , {
            status:data.status,
            cancelReason:data.cancelReason,
            selectedOption:data.selectedOption,
        },{new:true})
        return result;
    },
    GetAllTripsByUserId:(data: {Id: string})=>{
        return trip.find({customerId : data.Id})
    },
    getOnlineDrivers:()=>{
        return driver.find({isLive:true});
    },

    getAllTrips:()=>{
        return trip.find({});
    },
    getTripDetailsById:(data:{tripId:string})=>{
        const tripId = data.tripId;
        return trip.findById(tripId);
    },
    getTripDetailsByDriverId:(data:{driverId: string})=>{
        const driverId = data.driverId;
        return trip.find({driverId:driverId})
    },
    getTripDetailsByUserId:(data:{userId: string})=>{
        const userId = data.userId;
        return trip.find({customerId:userId});
    }
}