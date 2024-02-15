export default (dependencies:any)=>{
    const updateDriverLocation_controller =  async(data: object)=>{ 
        try{
            const {useCases:{updateLiveStatus_usecase}} = dependencies;
            const response = await updateLiveStatus_usecase(dependencies).execute(data);
            return response;
        }catch(err){
            console.log("Error catched at trip controller =>" , err)
            return err; 
        }  
    } 
    return updateDriverLocation_controller 
}