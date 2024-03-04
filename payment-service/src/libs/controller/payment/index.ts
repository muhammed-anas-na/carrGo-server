import stripe_controller from "./stripe_controller";

export default (dependencies:any)=>{
    return {
        stripe_controller:stripe_controller(dependencies),
    }
}