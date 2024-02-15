import express from "express";
import bodyParser from "body-parser";
import cors from 'cors';
import cookieParser from 'cookie-parser'
import dependencies from './config/dependencies'
import { routes } from "./routes";
import errorMiddleware from './libs/middleware/errormiddleware'
import session from 'express-session';


// type CustomeSessionData = {
//     otp: string,
//   };
  
  // Augment express-session with a custom SessionData object
  declare module "express-session" {
    interface SessionData {
      otp: string;
    }
  }

const app = express()
app.use(cookieParser())

app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: false,
  },
}));



app.use(express.json({limit:"1000mb"}));
app.use(express.urlencoded());

app.use(bodyParser.json())

app.use(
    cors({
      origin: 'http://localhost:5173',
      credentials: true,
    })
)

app.use('/' , routes(dependencies))
app.use(errorMiddleware)

export {app}