import { Router } from "express";
import validate from "../../shared/validators/validate.js";
import authMiddleware from "./auth.middleware.js";
import { registerController, loginController, refreshController, logoutController, verifyEmailController, forgotPasswordController, resetPasswordController } from "./auth.controller.js";
import { registerSchema, loginSchema, refreshSchema, verifyEmailSchema, forgotPasswordSchema, resetPasswordSchema } from "./auth.schemas.js";


const router = Router();

router.post("/register", validate({body: registerSchema}), registerController);
router.post("/login", validate({body: loginSchema}), loginController);
router.post("/refresh", validate({ body: refreshSchema }), refreshController);
router.post("/logout", authMiddleware, logoutController);
router.post("/verify-email", validate({body: verifyEmailSchema}), verifyEmailController);
router.post("/forgot-password", validate({body: forgotPasswordSchema}), forgotPasswordController);
router.post("/reset-password", validate({body: resetPasswordSchema}), resetPasswordController);

export default router;