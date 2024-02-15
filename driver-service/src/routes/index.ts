import express from "express";
import driverRoute from  "./driverRoutes/driver.route";

export const routes = (dependencies:any)=>{
    const routes = express.Router();
    routes.use('/' , driverRoute(dependencies))
    return routes;
}