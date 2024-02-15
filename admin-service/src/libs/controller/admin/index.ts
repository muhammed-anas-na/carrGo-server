import login_controller from "./login_controller";
import getDriverRequest_controller from "./getDriverRequest_controller";
import acceptDriverRequest_controller from "./acceptDriverRequest_controller";

export default (dependencies:any)=>{
    return {
        login_controller:login_controller(dependencies),
        getDriverRequest_controller:getDriverRequest_controller(dependencies),
        acceptDriverRequest_controller:acceptDriverRequest_controller(dependencies),
    }
}