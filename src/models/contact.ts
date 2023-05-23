
import { Schema, model } from 'mongoose';
import Joi,{ Schema as JoiSchema} from 'joi';
import { IContactSchema } from '../types/appTypes';

class ContactSchema extends Schema<IContactSchema>{
  constructor(){
    super(
      {
        name: {
          type: String,
          required: [true, "Set name for contact"],
        },
        email: {
          type: String,
        },
        phone: {
          type: String,
        },
        favorite: {
          type: Boolean,
          default: false,
        },
        owner: {
          type: Schema.Types.ObjectId,
          ref: "user",
          required: true,
        },
      },
      { versionKey: false, timestamps: true }
    )
  }
}

export const joiSchemaContact:JoiSchema<IContactSchema> = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
    })
    .required(),
  phone: Joi.string()
    .length(10)
    .pattern(/^[0-9]+$/)
    .required(),
  favorite: Joi.boolean(),
});

export const statusJoiSchemaContact: JoiSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

export const Contact = model<IContactSchema>("contact", new ContactSchema());


