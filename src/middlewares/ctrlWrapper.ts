import { Request, Response, NextFunction } from 'express';
import { ICtrlWrapper } from '../types/appTypes';
import { IUserAuthRequest } from '../types/appTypes';

class CtrlWrapper{
  public ctrlWrapperHandler = (ctrl:ICtrlWrapper) => {
    return async (req:Request, res:Response, next:NextFunction):Promise<void> => {
      try {
        await ctrl(req as IUserAuthRequest, res,next);
      } catch (error) {
        next(error);
      }
    };
  };
}
const ctrlWrapper = new CtrlWrapper().ctrlWrapperHandler;

export default ctrlWrapper;
