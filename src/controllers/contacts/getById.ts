import { Request, Response } from "express";
import { Contact } from "../../models"; 
import { NotFound } from "http-errors"
import { IContact } from "../../types/appTypes";


class GetById{
  public getByIdHandler = async (req:Request, res:Response):Promise<void> => {
    const { contactId } = req.params;
    const contacts:IContact|null = await Contact.findById(contactId);
    if (!contacts) {
      throw new NotFound(`Contact with id=${contactId} not found`);
    }
    res.json({
      status: "success",
      code: 200,
      data: {
        contacts,
      },
    });
  };
}
const getById = new GetById().getByIdHandler;

export default getById;
