import { Response } from "express";
import { IUserAuthRequest } from "../../types/appTypes";
import { User } from "../../models";
import { NotFound } from "http-errors"
import { IUser } from "../../types/appTypes";


class UpdateSubscription{
  updateSubscriptionHandler = async (req:IUserAuthRequest, res:Response):Promise<void> => {
    const { _id } = req.user;
    const { subscription } = req.body;
    const result:IUser|null = await User.findByIdAndUpdate(
      _id,
      { subscription },
      {
        new: true,
        runValidators: true,
      }
    );
    if (!result) {
      throw new NotFound(`User with id=${_id} not found`);
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
const updateSubscription = new UpdateSubscription().updateSubscriptionHandler;


export default  updateSubscription;
