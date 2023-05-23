import {Router} from 'express';
import {
  validation,
  ctrlWrapper,
  upload,
  authToken,
} from "../../middlewares";

import { auth as ctrl } from "../../controllers";
import { joiSchema, joiSchemaSubscription } from "../../models/user";

class AuthRouter{
  private router:Router;

  constructor(){
    this.router = Router();
    this.setupRoutes();
  }

  private setupRoutes():void{
    this.router.post("/register", validation(joiSchema), ctrlWrapper(ctrl.register));
this.router.post("/login", validation(joiSchema), ctrlWrapper(ctrl.login));
this.router.get("/current", authToken, ctrlWrapper(ctrl.getCurrent));
this.router.post("/logout", authToken, ctrlWrapper(ctrl.logout));
this.router.patch(
  "/",
  authToken,
  validation(joiSchemaSubscription),
  ctrlWrapper(ctrl.updateSubscription)
);
this.router.patch(
  "/avatars",
  authToken,
  upload.single("avatar"),
  ctrlWrapper(ctrl.updateAvatar)
);
this.router.get("/verify/:verificationToken", ctrlWrapper(ctrl.verifyEmail));
this.router.post("/verify", ctrlWrapper(ctrl.verify));
  }


  getRouter():Router{
    return this.router
  }
}



export default AuthRouter;