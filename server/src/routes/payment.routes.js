import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { checkoutProducts } from "../controllers/payment.controller.js";

const router = Router();

router.route("/checkout-products").post(verifyJWT, checkoutProducts);

export default router;