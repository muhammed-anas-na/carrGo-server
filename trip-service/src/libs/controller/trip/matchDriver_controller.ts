export default (dependencies:any)=>{
    const matchDriver_controller =  async(data: object)=>{ 
        try{
            const {useCases:{matchDriver_usecase}} = dependencies;
            const response = await matchDriver_usecase(dependencies).execute(data)
            console.log("Match driver controller ==> ",response);
            return response;
        }catch(err){
            console.log("Error catched at trip controller =>" , err)
            return err;
        }  
    }
    return matchDriver_controller; 
} 