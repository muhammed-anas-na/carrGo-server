export const getAllTrips_usecase = (dependencies: any) => {
    const { repository: { tripRepository } } = dependencies;
    if (!tripRepository) throw new Error("No tripRepository found");
    const execute = async () => {
        const result = await tripRepository.getAllTrips();
        return result;
    }

    return {
        execute
    }
}