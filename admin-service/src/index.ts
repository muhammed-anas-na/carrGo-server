import {app} from './app'
import {dbConenct} from './config/db'

const start = async()=>{
    try{
        await dbConenct()
    }catch(err){
        console.log("Error while connecting to db")
    }
}

app.listen(8002,()=>{
    console.log("Starting...")
    console.log("Admin service started at port 8002")
})

start();