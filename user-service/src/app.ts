import express from "express";
import bodyParser from "body-parser";
import cors from 'cors';
import cookieParser from 'cookie-parser'
import dependencies from './config/dependencies'
import { routes } from "./routes";
import errorMiddleware from './libs/middleware/errormiddleware'
import session from 'express-session';
  declare module "express-session" {
    interface SessionData {
      otp: string;
      refreshToken: string,
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
      origin:["https://muhammedanas.online" , "http://localhost:8080"],
      credentials: true,
    })
)

app.use('/api/user' , routes(dependencies))
app.use(errorMiddleware)

export {app}