export const getTripDetailsById_usecase = (dependencies: any) => {
    const { repository: { tripRepository } } = dependencies;
    if (!tripRepository) throw new Error("No tripRepository found");
    const execute = async (data: any) => {
        const result = await tripRepository.getTripDetailsById(data);
        return result;
    }
    return {
        execute 
    }
}