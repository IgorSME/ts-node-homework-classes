
import { TRequestErrorMessage, IRequestError } from "../types/appTypes";



const messages:TRequestErrorMessage = {
  400: "Bad Request",
  401: "Unauthorized",
  403: "Forbbiden",
  404: "Not found",
  409: "Conflict",
};

class RequestError extends Error implements IRequestError{
  public status: number;

  constructor(status:number, message:string = messages[status]){
    super(message);
    this.name = 'RequestError';
    this.status = status;
  }
}



export default  RequestError;
