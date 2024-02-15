export default (dependencies:any)=>{
    const getLiveDrivers_controller =  async()=>{ 
        try{
            const {useCases:{getLiveDrivers_usecase}} = dependencies;
            const response = await getLiveDrivers_usecase(dependencies).execute()
            console.log("Get live drivers resposne ==> " , response)
        }catch(err){
            console.log("Error catched at trip controller =>" , err)
            return err;
        }  
    }
    return getLiveDrivers_controller; 
} 