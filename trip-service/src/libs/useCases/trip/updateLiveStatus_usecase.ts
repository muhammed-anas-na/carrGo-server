import env from 'dotenv';
env.config()

export const updateLiveStatus_usecase = (dependencies: any) => {
    const { repository: { tripRepository } } = dependencies;
    if (!tripRepository) throw new Error("No tripRepository found");
    const execute = async (data: object) => {
        const response = await tripRepository.updateLiveStatus(data);
        return {
            response
        }
    }

    return {
        execute
    }
}