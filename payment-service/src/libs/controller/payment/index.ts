import login_controller from "./login_controller";
import stripe_controller from "./stripe_controller";

export default (dependencies:any)=>{
    return {
        login_controller:login_controller(dependencies),
        stripe_controller:stripe_controller(dependencies),
    }
}