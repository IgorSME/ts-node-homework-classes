import { MailDataRequired } from "@sendgrid/helpers/classes/mail";

import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";

dotenv.config();

const { SENDGRID_API_KEY } = process.env;

if (typeof SENDGRID_API_KEY !== 'string') {
  throw new Error('SENDGRID_API_KEY is not set or is not a string');
}

class SendEmail{
  private apiKey:string;

  constructor(apiKey: string){
    this.apiKey = apiKey;
    sgMail.setApiKey(this.apiKey)
  }

  public async sendEmailHandler(data:MailDataRequired): Promise<boolean>{ const email = { ...data, from: "igor_vs@ukr.net" };
  await sgMail.send(email);
  return true;}
}

const sendEmail = new SendEmail(SENDGRID_API_KEY).sendEmailHandler;

export default sendEmail;
