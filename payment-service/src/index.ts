import {app} from './app'
import {dbConenct} from './config/db'

const start = async()=>{
    try{
        await dbConenct()
    }catch(err){
        console.log("Error while connecting to db")
    }
}

app.listen(8004,()=>{
    console.log("Payment service started at port 8004")
})

start();