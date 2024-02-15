import env from 'dotenv';
env.config()
import axios from 'axios';

export const matchDriver_usecase = (dependencies: any) => {
    const { repository: { tripRepository } } = dependencies;
    if (!tripRepository) throw new Error("No tripRepository found");
    const execute = async (data: any) => {
        const MAPBOX_API_KEY = "pk.eyJ1IjoiYW5hcy1uYSIsImEiOiJjbHJocnlwcmMwMm4wMmltbDhmOWFieXI1In0.-HhwhnfkjKGXxpVSxyXWQg"
        const pickupResponse = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${data.from}.json?access_token=${MAPBOX_API_KEY}`);
        const pickupCoordinates = pickupResponse.data.features[0].geometry.coordinates
        const response = await tripRepository.matchDriver(pickupCoordinates);
        return response;
    
    }
    return {
        execute 
    }
}