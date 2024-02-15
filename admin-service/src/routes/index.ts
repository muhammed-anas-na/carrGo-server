import express from "express";
import adminRoute from  "./adminRoutes/admin.route";

export const routes = (dependencies:any)=>{
    const routes = express.Router();
    routes.use('/' , adminRoute(dependencies))
    return routes;
}