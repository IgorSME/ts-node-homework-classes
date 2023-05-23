import { Request,Response } from "express";
import { User } from "../../models";
import { NotFound } from 'http-errors';
import { IUser } from "../../types/appTypes";


class VerifyEmail{
  verifyEmailHandler = async (req: Request, res: Response):Promise<void> => {
    const { verificationToken } = req.params;
    const user:IUser|null = await User.findOne({ verificationToken });
    if (!user) {
      throw NotFound();
    }
    await User.findOneAndUpdate({_id: user._id}, {
      verify: true,
      verificationToken: "",
    });
    res.json({
      message: "Verification successful",
    });
  };
}
const verifyEmail = new VerifyEmail().verifyEmailHandler

export default  verifyEmail;
