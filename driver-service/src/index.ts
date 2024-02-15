import {app} from './app'
import {dbConenct} from './config/db'

const start = async()=>{
    try{
        await dbConenct()
    }catch(err){
        console.log("Error while connecting to db")
    }
}

app.listen(8001,()=>{
    console.log("Driver service started at port 8001")
})

start();