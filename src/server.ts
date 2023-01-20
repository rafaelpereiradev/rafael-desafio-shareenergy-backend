import 'express-async-errors'
import express, { NextFunction, Request, Response } from 'express'
import cors from 'cors'
import router from './routes';
import dotenv from 'dotenv'
import { connectDatabase } from './database/database';
import { ApiError } from './helpers/api-errors';

const app = express();
 app.use(cors());
app.use((req, res, next) => {
	console.log('passou no middleware cors')
	//Qual site tem permissão de realizar a conexão, no exemplo abaixo está o "*" indicando que qualquer site pode fazer a conexão
    res.header("Access-Control-Allow-Origin", "*");
	//Quais são os métodos que a conexão pode realizar na API
    

    res.header("Access-Control-Allow-Headers", "Origin, X-Request-Width, Content-Type, Accept");
	if(req.mathod === 'OPTIONS){
	   res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
	return res.status(200).send({})
	   }
   
    next();
});
console.log('passou no middleware cors')
dotenv.config();
const port = process.env.PORT || 3333;

app.use(express.json());
app.use(router);


connectDatabase();

app.use((error:Error & Partial<ApiError>,req:Request,res:Response,next:NextFunction)=>{
    const statusCode = error.statusCode ?? 500
    const message = error.statusCode ? error.message : 'Internal Server Error'


    return res.status(statusCode).json({ message:message })
    })
app.listen(port, () => console.log(`Server runnig on port:${port}`));

