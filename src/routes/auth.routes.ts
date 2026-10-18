import {Router} from "express";

import { AuthController } from "../controller/auth.controller";
// import { authMiddleware } from "../middleware/auth.middleware";

const authController = new AuthController();

const router = Router();

router.post("/register", authController.register );
router.post("/login", authController.login);

export default router;