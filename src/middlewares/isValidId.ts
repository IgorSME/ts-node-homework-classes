
import { isValidObjectId } from "mongoose";
import { Request,Response, NextFunction } from "express"

import  RequestError  from "./RequestError";

class IsValidId{
  public isValidIdHandler = (req:Request, res:Response, next:NextFunction):void => {
    const { contactId } = req.params;
    console.log(contactId);
    
    const result:boolean = isValidObjectId(contactId);
    if (!result) {
      next(new RequestError(400, "Invalid id format"));
    }
    next();
  };
}
const isValidId = new IsValidId().isValidIdHandler;

export default isValidId;
