import express from "express";
import bodyParser from "body-parser";
import cors from 'cors';
import cookieParser from 'cookie-parser'
import dependencies from './config/dependencies'
import { routes } from "./routes";
import errorMiddleware from './libs/middleware/errormiddleware'


const app = express()


app.use(express.json({limit:"1000mb"}));
app.use(express.urlencoded());

app.use(bodyParser.json())
app.use(cookieParser())
app.use(
    cors({
      origin: 'http://localhost:8080',
      credentials: true,

    })
)




app.use('/trip' , routes(dependencies))
app.use(errorMiddleware)

export {app}