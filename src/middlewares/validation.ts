import { Request, Response, NextFunction } from 'express';
import { Schema, ValidationError} from 'joi';

interface IValidationError extends ValidationError {
  status?: number;
}
type TValidation = ((req: Request, res: Response, next: NextFunction) => void)

class Validation{
  public validationHandler = (schema:Schema):TValidation => {
    return (req:Request, _res:Response, next:NextFunction) => {
      const { error } = schema.validate(req.body);
      if (error) {
        const validationError = error as IValidationError;
        validationError.status = 400;
        next(validationError);
        return;
      }
      next();
    };
  };
}
  const validation = new Validation().validationHandler;

export default  validation;
