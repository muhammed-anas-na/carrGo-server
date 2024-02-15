import express from "express";
import userRoute from "./userRoutes/user.route";

export const routes = (dependencies:any)=>{
    const routes = express.Router();
    routes.use('/' , userRoute(dependencies))
    return routes;
}