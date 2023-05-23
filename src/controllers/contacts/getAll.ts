import { Response } from "express";
import { IUserAuthRequest } from "../../types/appTypes";
import { Contact } from "../../models";
import { IContact } from "../../types/appTypes";

class GetAll{
  public getAllHandler = async (req:IUserAuthRequest, res:Response):Promise<void> => {
    const { _id } = req.user;
    const { page = '1', limit = '20', favorite } = req.query;
    const skip:number = (parseInt(page as string, 10) - 1) * parseInt(limit as string, 10);
    if (favorite) {
      const contacts = await Contact.find({ owner: _id, favorite }, "", {
        skip,
        limit: Number(limit),
      }).populate("owner", "_id email");
      res.status(200).json({
        status: "success",
        code: 200,
        data: { contacts },
      });
    } else {
      const contacts:IContact[] = await Contact.find({ owner: _id }, "", {
        skip,
        limit: Number(limit),
      }).populate("owner", "_id email");
      res.status(200).json({
        status: "success",
        code: 200,
        data: { contacts },
      });
    }
  };
}
const getAll = new GetAll().getAllHandler;

export default getAll;
