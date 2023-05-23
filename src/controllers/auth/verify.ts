import {  Response } from "express";
import { User } from "../../models";
import { RequestError } from "../../middlewares";
import { sendEmail } from "../../helpers";
import { IUser, IEmail, IUserAuthRequest } from "../../types/appTypes";


class Verify{
  verifyHandler = async (req:IUserAuthRequest, res:Response):Promise<void> => {
    const { email } = req.body;
    const user:IUser|null = await User.findOne({ email });
  
    if (!user) {
      throw new RequestError(400, "missing required field email");
    }
    if (user.verify) {
      throw new RequestError(400, "Verification has already been passed");
    }
    const mail: IEmail = {
      from: "igor_vs@ukr.net",
      to: email,
      subject: "Email verification",
      html: `<a target ="_blank" href="http://localhost:3000/api/users/verify/${user.verificationToken}"> Verify email </a>`,
    };
    await sendEmail(mail);
    res.json({
      message: "Verification email sent",
    });
  };
}
const verify = new Verify().verifyHandler;

export default  verify;
