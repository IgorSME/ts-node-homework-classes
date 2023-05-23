import { Request, Response } from "express";
import { Contact } from "../../models"; 
import { NotFound } from "http-errors"
import { IContact } from "../../types/appTypes";

class UpdateStatusContact{
  public updateStatusContactHandler = async (req:Request, res:Response):Promise<void> => {
    const { contactId } = req.params;
    const { favorite } = req.body;
    const result:IContact | null = await Contact.findByIdAndUpdate(
      contactId,
      { favorite },
      {
        new: true,
      }
    );
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
const updateStatusContact = new UpdateStatusContact().updateStatusContactHandler;

export default updateStatusContact;
