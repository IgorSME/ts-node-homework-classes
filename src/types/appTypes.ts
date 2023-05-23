
import { Request, Response,NextFunction } from "express";
import { Schema, Document } from "mongoose";
import { JwtPayload } from "jsonwebtoken";
// import { ParamsDictionary } from "express-serve-static-core";
// import { ParsedQs } from "qs";

export interface IUserAuthRequest extends Request {
  user: {
    _id: string,
      email: string,
    subscription:string
  };
}
export interface IError extends Error {
  status?: number;
  
}


export type ICtrlWrapper = (req: IUserAuthRequest, res: Response, next: NextFunction) => Promise<void>;



export type ICallBack = (error: Error | null, destination: string) => void;


export interface IUser extends Document{
    _id:string,
  email: string;
  password: string;
    subscription: string,
    token: string,
    avatarURL: string,
    verify: boolean,
  verificationToken: string,
  comparePassword(password: string): Promise<boolean>;
  
}
export interface IEmail{
  from: string,
    to: string,
    subject: string,
    html: string,
}
export interface IContact extends Document{
    _id:string,
  name: string,
    email: string,
    phone: string,
    favorite: boolean,
    owner: Schema.Types.ObjectId,
  
}
export interface IContactSchema extends Document {
  name: string;
  email: string;
  phone: string;
  favorite: boolean;
  owner: Schema.Types.ObjectId,
  // owner: IUser["_id"];
}

export interface IJwtPayload extends JwtPayload {
  id: string;
}
export type TRequestErrorMessage = {
  [key: number]: string;
};
export interface IRequestError extends Error {
  status: number;
}