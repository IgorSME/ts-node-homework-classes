import { Router } from "express";
import {
  validation,
  ctrlWrapper,
  isValidId,
  authToken,
} from "../../middlewares";

import { joiSchemaContact, statusJoiSchemaContact } from "../../models/contact";
import { contacts as ctrlContacts } from "../../controllers";

class ContactsRouter{
  private routerContacts:Router;

  constructor(){
    this.routerContacts = Router();
    this.setupRouter();
  }

private setupRouter():void{
  this.routerContacts.get("/", authToken, ctrlWrapper(ctrlContacts.getAll));

this.routerContacts.get("/:contactId", authToken, isValidId, ctrlWrapper(ctrlContacts.getById));

this.routerContacts.post("/", authToken, validation(joiSchemaContact), ctrlWrapper(ctrlContacts.add));

this.routerContacts.delete(
  "/:contactId",
  authToken,
  ctrlWrapper(ctrlContacts.removeById)
);

this.routerContacts.put("/:contactId", isValidId, ctrlWrapper(ctrlContacts.updateById));
this.routerContacts.patch(
  "/:contactId/favorite",
  authToken,
  validation(statusJoiSchemaContact),
  ctrlWrapper(ctrlContacts.updateStatusContact)
);

}
getRouter():Router{
  return this.routerContacts
}

}


export default ContactsRouter;