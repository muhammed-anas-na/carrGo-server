import { Server } from 'socket.io';
import { adminController } from '../libs/controller';

export default function SocketIo(server: any , dependencies: any){
    const {
    updateDriverLocation_controller, 
    matchDriver_controller,
    calculateTripDetails_controller,
    updateLiveStatus_controller,
  } = adminController(dependencies)
    const io = new Server(server, {
        cors: {origin:"http://localhost:5173", methods: ["GET", "POST"]},
    });
    
    io.on("connection", (socket) => {
        console.log(`A user connected ${socket.id}`); 
        const Id = socket.id

        //From driver client
        //@desc To update the driver location in server;
        socket.on("updateLocation", (data) => {
          console.log("Recieved message" , data);
          let response = updateDriverLocation_controller({...data , Id});
          socket.broadcast.emit('getDriverLocation' , data)
        });

        //From Driver client
        //desc To Send a request ot the driver
        socket.on('matchDriver' ,async (data)=>{
          console.log(Id)
          const response  = await matchDriver_controller({...data  , Id});
          if(response == null){
            socket.emit('Nomatch-driver');
            return;
          }
          console.log("Response in socket =>", response)
          const DriverId = response._id;

          //Send a socket request to the nearest driver
          console.log("Sending request to the driver with SOCKETID =>" , response.socketId);
          socket.broadcast.to(response.socketId).emit('reqestToDriver' , {...data , Id , DriverId })

        })
        //Reciving Success message from Driver
        socket.on('successRide' ,async (data)=>{
          console.log("Data from driver ==> ",data)
          if(data.message == 'reject'){
            socket.broadcast.to(data.request[0].Id).emit('ride-rejec')
            return;
          }
          const response  = await calculateTripDetails_controller(data)
          const tripData = response[0]
          console.log("Trip Data ==>",tripData);
          //Sending driver details and otp to to the user and the tripId and trip details.
          //Consumed by user
          socket.broadcast.to(data.request[0].Id).emit('successResponseFromDriver' , {tripData , Id});
          
          
          //Consumed by driver.
          let userSocketId = data.request[0].Id
          socket.emit('tripCreated' , {tripData , userSocketId});
        })

        socket.on('DriverLiveLocation' , (data)=>{
          console.log("DRIVER LOCATION SOCKET ==>" , data);
          socket.broadcast.to(data.userSocketId).emit('LiveLocationFromDriver' , data);
        })

        //Sending trip updates to user. ===========================================

        //Driver has started his trip to pickup location.
        socket.on('driver-started' , (data)=>{
          socket.broadcast.to(data.userSocketId).emit('driver-started');
        })
        
        //Driver has reached the pickup location
        socket.on('reached-pickup' , (data)=>{
          socket.broadcast.to(data.userSocketId).emit('reached-pickup')
        })
        
        //Driver has pickedup the rider
        socket.on('pickedup' , (data)=>{
          const pickup_time = Date.now();
          socket.broadcast.to(data.userSocketId).emit('pickedup' ,{pickup_time});
        })

        //Trip has finished,Destination reached
        socket.on('destination-reached' , (data)=>{
          const dropoff_time = Date.now();
          socket.broadcast.to(data.userSocketId).emit('desitination-reached' , {dropoff_time})
        })
        
        //Updating the driver isLive status
        socket.on('update-live-status' , async(data)=>{
          const response = await updateLiveStatus_controller(data);
        })

        socket.on('payment-success' ,(data)=>{
          console.log("DRIVER SOCKET ID HERe ====================>",data);
          socket.broadcast.to(data.driverSocketId).emit('payment-success')
        })

        socket.on('send-message' , (data)=>{
          console.log("Messageee ==>" , data)
          socket.broadcast.to(data.driverSocketId).emit('recieve-message' , data);
        })

        // Handle disconnection
        socket.on('disconnect', () => {
          console.log(`A user disconnected${socket.id}`);
         });
      });
}
  