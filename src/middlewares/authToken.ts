import { Response, NextFunction, RequestHandler } from 'express';
import { IUserAuthRequest,IUser,IJwtPayload } from '../types/appTypes';
import { Unauthorized } from "http-errors";
import jwt, { Secret } from "jsonwebtoken";
import { User } from '../models';
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import dotenv from 'dotenv';
dotenv.config();



class AuthToken{
  private SECRET_KEY:string;

constructor(){
  this.SECRET_KEY = process.env.SECRET_KEY || '';
}
authTokenHandler:RequestHandler<ParamsDictionary, IUserAuthRequest | undefined, undefined, ParsedQs> = async (req, res:Response, next:NextFunction):Promise<void> => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  try {
    if (bearer !== "Bearer") {
      throw new Unauthorized("Not authorized");
    }
    const { id } = jwt.verify(token, this.SECRET_KEY as Secret) as IJwtPayload;
    const user:IUser | null = await User.findById(id);
    if (!user || !user.token) {
      throw new Unauthorized("Not authorized");
    }
    (req as IUserAuthRequest).user = user || null;
    next();
  } catch (error:unknown) {
    if ((error as Error).message === "invalid signature") {
     (error as Error &{status?:number}).status = 401;
    }
    next(error);
  }
};
}
const authToken = new AuthToken().authTokenHandler;

export default authToken 
