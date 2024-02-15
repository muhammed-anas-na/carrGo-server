import env from 'dotenv';
env.config()


export const getLiveDrivers_usecase = (dependencies: any) => {
    const { repository: { tripRepository } } = dependencies;
    if (!tripRepository) throw new Error("No tripRepository found");
    const execute = async () => {
        const response = await tripRepository.findLiveDrivers();
        return {
            response
        }
    }

    return {
        execute
    }
}