import { Router } from "express";
import { roles } from "../config/config.js";
import { authenticate, authorize } from "../middlewares/auth.middleware.js";
import { createShipment, getShipments } from "../controllers/shipment.controller.js";

const router = Router();

router.route("/").post(authenticate, authorize(roles.carrierAndShipper), createShipment);
router.route("/").get(authenticate, authorize(roles.carrierAndShipper), getShipments);

export default router;