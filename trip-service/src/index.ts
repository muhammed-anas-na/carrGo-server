import {app} from './app'
import {dbConenct} from './config/db'
import http from 'http';
import SockerIo from './config/Socket'
import dependencies from './config/dependencies'



const server = http.createServer(app);

SockerIo(server , dependencies)

const start = async()=>{
    try{ 
        await dbConenct()

    }catch(err){
        console.log("Error while connecting to db")
    }
}

server.listen(8003,()=>{
    console.log("Trip service started at port 8003")
})

start();