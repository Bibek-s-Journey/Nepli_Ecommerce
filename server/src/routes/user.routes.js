import {Router} from "express"
import {
    registerUser,
    loginUser,
    logOutUser,
    updateCartItem,
    addCartItem,
    getCartItem,
    becomeSeller,
    getCurrentUser,
    changePassword,
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(verifyJWT, logOutUser);
router.route("/changePassword").post(verifyJWT, changePassword);
router.route("/add-cart").post(verifyJWT, addCartItem);
router.route("/update-cartItems").post(verifyJWT, updateCartItem);
router.route("/get-cartItem").get(verifyJWT, getCartItem);
router.route("/become-seller-terms").post(verifyJWT, becomeSeller);

router.route("/get-Current-user").get(verifyJWT, getCurrentUser);

export default router;
