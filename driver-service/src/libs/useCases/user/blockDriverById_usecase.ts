
export const blockDriverById_usecase = (dependencies:any)=>{
    const {repository:{driverRepository}} = dependencies;
    if(!driverRepository) throw new Error("No userRepository found");
    const execute = async(data: any)=>{
        const result = await driverRepository.blockDriverById(data);
        return result;
    }
    return {
        execute
    }
}