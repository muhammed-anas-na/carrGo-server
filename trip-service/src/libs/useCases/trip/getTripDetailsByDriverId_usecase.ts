export const getTripDetailsByDriverId_usecase = (dependencies: any) => {
    const { repository: { tripRepository } } = dependencies;
    if (!tripRepository) throw new Error("No tripRepository found");
    const execute = async (data: any) => {
        const result = await tripRepository.getTripDetailsByDriverId(data);
        return result;
    }
    return {
        execute 
    }
}