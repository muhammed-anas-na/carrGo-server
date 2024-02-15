import env from 'dotenv';
env.config()
import axios from 'axios';

export const calculateTripDetails_usecase = (dependencies: any) => {
    const MAPBOX_API_KEY = "pk.eyJ1IjoiYW5hcy1uYSIsImEiOiJjbHJocnlwcmMwMm4wMmltbDhmOWFieXI1In0.-HhwhnfkjKGXxpVSxyXWQg"

    const { repository: { tripRepository } } = dependencies;
    if (!tripRepository) throw new Error("No tripRepository found");
    const execute = async (data: any) => {
        const DriverLocation = await tripRepository.findDriverById(data.request[0].DriverId);
        //console.log("Current location of the accepted driver =>",DriverLocation);
        
        const pickup_coordinates = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${data.request[0].from}.json?access_token=${MAPBOX_API_KEY}`);
        console.log("Pickup Location =>" , pickup_coordinates.data.features[0].center);
        console.log("Driver locaiton ==>" , DriverLocation.location.coordinates);
        
        const pickup_coordinates_values = pickup_coordinates.data.features[0].center;
        const driver_coordinates_values = DriverLocation.location.coordinates;
        // Mapbox Directions API endpoint
        const directionsApiUrl = `https://api.mapbox.com/directions/v5/mapbox/driving/${pickup_coordinates_values[0]},${pickup_coordinates_values[1]};${driver_coordinates_values[0]},${driver_coordinates_values[1]}?access_token=${MAPBOX_API_KEY}`;
        
        const directionResult = await axios.get(directionsApiUrl);
        console.log("Direction result ==>" , {...directionResult.data});
        const ETA = Math.ceil(directionResult.data.routes[0].duration/60);
        console.log(`Estimate time of arrival is ${ETA} minutes`);
        const result = await tripRepository.createTrip({...data , ETA});
        return result;
    }
    return {
        execute 
    }
}