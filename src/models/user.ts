import { Schema, model } from "mongoose";
import Joi, { Schema as JoiSchema } from "joi";
import { IUser } from "../types/appTypes";
import bcrypt from "bcryptjs";


const UserSchema = new Schema<IUser>(
  {
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      default: null,
    },
    avatarURL: {
      type: String,
      required: true,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, "Verify token is required"],
    },
  },
  { versionKey: false, timestamps: true }
);

UserSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};


export const joiSchema:JoiSchema<IUser> = Joi.object({
  password: Joi.string().min(8).required(),
  email: Joi.string().required(),
  subscription: Joi.string(),
  token: Joi.string(),
});
export const joiSchemaSubscription:JoiSchema = Joi.object({
  subscription: Joi.string().required(),
});

export const User = model<IUser>("user",  UserSchema);


