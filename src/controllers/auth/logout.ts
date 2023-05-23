import { Response } from "express";
import { IUserAuthRequest } from "../../types/appTypes";
import { User } from "../../models";

class Logout{
  logoutHandler = async (req:IUserAuthRequest, res:Response):Promise<void> => {
    const { _id } = req.user;
    console.log(_id);
    await User.findByIdAndUpdate(_id, { token: null });
    res.status(204).json();
  };
}
const logout = new Logout().logoutHandler;

export default  logout;
