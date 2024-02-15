import env from 'dotenv';
env.config()

import axios from 'axios'

interface findCabData {
    name: string,
    number: string,
    pickup_location: string,
    dropoff_location: string,
    pickup_id: string,
    dropoff_id: string,
}


export const findcab_usecase = (dependencies: any) => {
    const MAPBOX_API_KEY = "pk.eyJ1IjoiYW5hcy1uYSIsImEiOiJjbHJocnlwcmMwMm4wMmltbDhmOWFieXI1In0.-HhwhnfkjKGXxpVSxyXWQg"
    const { repository: { tripRepository } } = dependencies;
    if (!tripRepository) throw new Error("No tripRepository found");
    const execute = async (data: findCabData) => {
        // Create promises for the two API requests
        const pickupPromise = axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${data.pickup_location}.json?access_token=${MAPBOX_API_KEY}`);
        const dropoffPromise = axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${data.dropoff_location}.json?access_token=${MAPBOX_API_KEY}`);
        const [pickupResponse, dropoffResponse] = await Promise.all([pickupPromise, dropoffPromise]);
        const pickupCoordinates = pickupResponse.data.features[0].geometry.coordinates
        const dropoffCoordinates = dropoffResponse.data.features[0].geometry.coordinates
        const response = await axios.get(`https://api.mapbox.com/directions/v5/mapbox/driving/${pickupCoordinates[0]},${pickupCoordinates[1]};${dropoffCoordinates[0]},${dropoffCoordinates[1]}?access_token=pk.eyJ1IjoiYW5hcy1uYSIsImEiOiJjbHJocnlwcmMwMm4wMmltbDhmOWFieXI1In0.-HhwhnfkjKGXxpVSxyXWQg`)
        return {
            ...response
        }

    }

    return {
        execute
    }
}