import env from 'dotenv';
env.config()

import axios from 'axios'

interface Data {
    Id: string,
    data: string,
}


export const getCoordinates_usecase = (dependencies: any) => {
    const MAPBOX_API_KEY = "pk.eyJ1IjoiYW5hcy1uYSIsImEiOiJjbHJocnlwcmMwMm4wMmltbDhmOWFieXI1In0.-HhwhnfkjKGXxpVSxyXWQg"
    const { repository: { tripRepository } } = dependencies;
    if (!tripRepository) throw new Error("No tripRepository found");
    const execute = async (data: Data) => {
            const result = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${data.data}.json?access_token=${MAPBOX_API_KEY}`);
            return result.data.features[0].center;    
    }

    return {
        execute
    }
}