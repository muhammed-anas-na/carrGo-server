import env from 'dotenv';
env.config()

import axios from 'axios'
export const getCurrentLocation_usecase = (dependencies: any) => {
    const MAPBOX_API_KEY = "pk.eyJ1IjoiYW5hcy1uYSIsImEiOiJjbHJocnlwcmMwMm4wMmltbDhmOWFieXI1In0.-HhwhnfkjKGXxpVSxyXWQg"
    const { repository: { tripRepository } } = dependencies;
    if (!tripRepository) throw new Error("No tripRepository found");
    const execute = async ({longitude , latitude} : {longitude: string , latitude: string}) => {
        let result = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${MAPBOX_API_KEY}`);
        return result.data;
    }

    return {
        execute
    }
}