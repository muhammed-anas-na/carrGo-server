import env from 'dotenv';
env.config()


export const getAllTripsOfUser_usecase = (dependencies: any) => {
    const { repository: { tripRepository } } = dependencies;
    if (!tripRepository) throw new Error("No tripRepository found");
    const execute = async (data: object) => {
        const result = await tripRepository.GetAllTripsByUserId(data);
        return result;
    }
    return {
        execute
    }
}