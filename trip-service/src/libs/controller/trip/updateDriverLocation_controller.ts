export default (dependencies:any)=>{
    const updateDriverLocation_controller =  async(data: object)=>{ 
        try{
            const {useCases:{updateDriverLocation_usecase}} = dependencies;
            const response = await updateDriverLocation_usecase(dependencies).execute(data);
            return response;
        }catch(err){
            console.log("Error catched at trip controller =>" , err)
            return err; 
        }  
    } 
    return updateDriverLocation_controller 
}