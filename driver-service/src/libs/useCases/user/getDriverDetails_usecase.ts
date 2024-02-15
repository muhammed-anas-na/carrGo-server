export const getDriverDetails_usecase = (dependencies:any)=>{
    const {repository:{driverRepository}} = dependencies;
    if(!driverRepository) throw new Error("No userRepository found");
    const execute = async(Id: string)=>{
        const result = await driverRepository.findDriverById(Id);
        return result;
    }

    return {
        execute
    }
}