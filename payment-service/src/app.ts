import express from "express";
import bodyParser from "body-parser";
import cors from 'cors';
import cookieParser from 'cookie-parser'
import dependencies from './config/dependencies'
import { routes } from "./routes";
import errorMiddleware from './libs/middleware/errormiddleware'
import { consumerConfig } from "./util/Kafka/Consumer";

const app = express()
const router = express.Router();
app.use(express.json({limit:"1000mb"}));
app.use(express.urlencoded());
app.use(bodyParser.json())
app.use(cookieParser())
app.use(
    cors({
      origin:["https://muhammedanas.online" , "http://localhost:8080"],
      credentials: true,
    })
)
// consumerConfig(dependencies)
app.use('/api/payment' , routes(dependencies))
app.use(errorMiddleware)

export {app}