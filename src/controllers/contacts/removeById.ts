import { Request, Response } from "express";
import { Contact } from "../../models"; 
import { NotFound } from "http-errors"
import { IContact } from "../../types/appTypes";

class RemoveById{
  public removeByIdHandler = async (req:Request, res:Response):Promise<void> => {
    const { contactId } = req.params;
    const contacts:IContact | null = await Contact.findByIdAndRemove(contactId);
    if (!contacts) {
      throw new NotFound(`Product with id=${contactId} not found`);
    }
    res.json({
      status: "success",
      code: 200,
      message: "contact deleted",
      data: {
        contacts,
      },
    });
  };
}
const removeById = new RemoveById().removeByIdHandler;

export default removeById;
