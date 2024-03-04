export const completeCancelTrip_usecase = (dependencies: any) => {
    const { repository: { tripRepository } } = dependencies;
    if (!tripRepository) throw new Error("No tripRepository found");
    const execute = async (data: any) => {
        return tripRepository.completeCancelTrip(data)
    }
    return {
        execute 
    }
}