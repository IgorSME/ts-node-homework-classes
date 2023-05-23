import express, { Request, Response,Express } from 'express';
import { IError } from './types/appTypes';
import logger from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import ContactsRouter from './routes/api/contacts';
import AuthRouter from './routes/api/auth';

dotenv.config();

class App{
  private app:Express;

  constructor(){
    this.app = express();
    this.setupMiddleware();
    this.setupRoutes();
    this.setupErrorHandlers();
  }

  private setupMiddleware():void{
    this.app.use(logger('dev'));
    this.app.use(express.json());
    this.app.use(cors());
  }

  private setupRoutes():void{
    this.app.use('/api/auth', new AuthRouter().getRouter());
    this.app.use("/api/contacts", new ContactsRouter().getRouter());
  }

private setupErrorHandlers():void{
  this.app.use((_req:Request, res:Response)=>res.status(404).json({message:"Not Found"}));
  this.app.use((err:IError,_req:Request,res:Response)=>{
    const{status = 500} = err;
    res.status(status).json({message: err.message})
  })
}

getApp():Express{
  return this.app
}

}
export default App;
