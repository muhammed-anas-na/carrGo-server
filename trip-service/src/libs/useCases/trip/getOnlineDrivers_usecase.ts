import env from 'dotenv';
env.config()


export const getOnlineDrivers_usecase = (dependencies: any) => {
    const { repository: { tripRepository } } = dependencies;
    if (!tripRepository) throw new Error("No tripRepository found");
    const execute = async () => {
        const response = await tripRepository.getOnlineDrivers();
        return response;
    }

    return {
        execute
    }
}