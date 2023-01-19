import 'express-async-errors'
import express, { NextFunction, Request, Response } from 'express'
import router from './routes';
import cors from 'cors'
import dotenv from 'dotenv'
import { connectDatabase } from './database/database';
import { ApiError } from './helpers/api-errors';

dotenv.config();
const port = process.env.PORT || 3333;
const app = express();
app.use(cors());
app.use(express.json());
app.use(router);


connectDatabase();

app.use((error:Error & Partial<ApiError>,req:Request,res:Response,next:NextFunction)=>{
    const statusCode = error.statusCode ?? 500
    const message = error.statusCode ? error.message : 'Internal Server Error'

    return res.status(statusCode).json({ message:message })
    })
app.listen(port, () => console.log(`Server runnig on port:${port}`));

