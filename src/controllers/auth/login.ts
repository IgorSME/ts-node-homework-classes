import { Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../../models";
import { Secret } from "jsonwebtoken";
import { IUser, IUserAuthRequest } from "../../types/appTypes";
import { RequestError } from "../../middlewares";
import dotenv from 'dotenv';
dotenv.config();




const { SECRET_KEY } = process.env;

class Login{
   loginHandler = async (req:IUserAuthRequest, res:Response):Promise<void> => {
    const { email, password, subscription = "starter" } = req.body;
  
    const user:IUser | null = await User.findOne({ email });
    console.log(user);
    console.log(SECRET_KEY);
    
    if (!user ||  !user.comparePassword(password)) {
      throw new RequestError(401,"Email or password is wrong");
    }
  
    const passwordCompared = await bcrypt.compare(password, user.password);
  
    if (!passwordCompared) {
      throw new RequestError(401,"Email or password is wrong");
    }
    if (!SECRET_KEY) {
      throw new Error("Secret key is not defined");
    }
    const payload:object = {
      id: user._id,
    };
  
    const token:string = jwt.sign(payload, SECRET_KEY as Secret, { expiresIn: "1h" });
  
    await User.findByIdAndUpdate(user._id, { token });
    res.json({
      status: "success",
      code: 200,
      data: {
        token,
  
        user: {
          email,
          subscription,
        },
      },
    });
  }
}
const login = new Login().loginHandler;

export default  login;
