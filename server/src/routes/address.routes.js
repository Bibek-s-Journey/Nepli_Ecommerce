import {Router} from "express"
import {verifyJWT} from "../middlewares/auth.middleware.js"
import { addAddress } from "../controllers/address.controller.js";

const router = Router();

router.route("/new-address").post(verifyJWT, addAddress);

export default router;