import { Router } from "express";
import { getProfile, login, register } from "../controllers/auth.controller.js";
import { authenticate, authorize } from "../middlewares/auth.middleware.js";

const allUsers = ["admin", "carrier", "shipper", "driver"]

const router = Router();

router.route("/signup").post(register);
router.route("/login").post(login);
router.route("/profile").get(authenticate, authorize(allUsers), getProfile);

export default router;