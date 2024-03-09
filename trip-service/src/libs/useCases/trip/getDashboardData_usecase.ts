import env from 'dotenv';
env.config()

import axios from 'axios'
export const getDashboardData_usecase = (dependencies: any) => {
    const { repository: { tripRepository } } = dependencies;
    if (!tripRepository) throw new Error("No tripRepository found");
    const execute = async (data: {driverId: string}) => {
        const driverId = data.driverId
        const tripDetails = await tripRepository.getTripDetailsByDriverId(driverId);
        return{
            totalTrips:tripDetails.length
        }
    }

    return {
        execute
    }
}