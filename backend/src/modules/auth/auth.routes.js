import { Router } from "express";
import validate from "../../shared/validators/validate.js";
import authMiddleware from "./auth.middleware.js";
import { registerController, loginController, refreshController, logoutController } from "./auth.controller.js";
import { registerSchema, loginSchema, refreshSchema } from "./auth.schemas.js";


const router = Router();

router.post("/register", validate({body: registerSchema}), registerController);
router.post("/login", validate({body: loginSchema}), loginController);
router.post("/refresh", validate({ body: refreshSchema }), refreshController);
router.post("/logout", authMiddleware, logoutController);

export default router;