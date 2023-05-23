import { Response } from "express";
import { IUserAuthRequest } from "../../types/appTypes";


class GetCurrent{
  getCurrentHandler = async (req:IUserAuthRequest, res:Response):Promise<void> => {
    const { email, subscription } = req.user;
    res.json({
      status: "success",
      code: 200,
      data: {
        user: {
          email,
          subscription,
        },
      },
    });
  };
}
const getCurrent = new GetCurrent().getCurrentHandler;

export default getCurrent;
