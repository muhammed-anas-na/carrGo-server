export default (dependencies:any)=>{
    const calculateTripDetails_controller =  async(data: object)=>{ 
        try{
            const {useCases:{calculateTripDetails_usecase}} = dependencies;
            const response = await calculateTripDetails_usecase(dependencies).execute(data)
            return response;
        }catch(err){
            console.log("Error catched at trip controller =>" , err)
            return err;
        }  
    }
    return calculateTripDetails_controller; 
}