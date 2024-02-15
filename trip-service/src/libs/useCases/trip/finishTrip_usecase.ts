import env from 'dotenv';
env.config()


export const finishTrip_usecase = (dependencies: any) => {
    const { repository: { tripRepository } } = dependencies;
    if (!tripRepository) throw new Error("No tripRepository found");
    const execute = async (data: object) => {
        const result = tripRepository.updateTripDetails(data);
        return result;
    }
    return {
        execute
    }
}