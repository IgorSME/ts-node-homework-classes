import { Request, Response } from "express";
import { Contact } from "../../models"; 
import { NotFound } from "http-errors"
import { IContact } from "../../types/appTypes";

class UpdateById{
  public updateByIdHandler = async (req:Request, res:Response):Promise<void> => {
    const { contactId } = req.params;
    const result:IContact | null = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
    });
    if (!result) {
      throw new NotFound(`Contact with id=${contactId} not found`);
    }
    res.json({
      status: "success",
      code: 200,
      data: {
        result,
      },
    });
  };
}
const updateById = new UpdateById().updateByIdHandler;

export default updateById;
