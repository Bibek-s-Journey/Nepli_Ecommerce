import { Router } from "express";
import upload from "../middlewares/multer.middleware.js";
import {verifyJWT} from "../middlewares/auth.middleware.js"
import {
    uploadProduct,
    getProducts,
    getProduct, 
    reviewProduct,
    getSellerProduct,
    updateProduct,
    getProductsName
} from "../controllers/product.controller.js";

const router = Router();

router.route("/upload-product").post(verifyJWT, upload.single("productImage"),
    uploadProduct)
router.route("/get-products").get(getProducts);
router.route("/getSellerProducts").get(verifyJWT,getSellerProduct)
router.route("/update-product").post(verifyJWT, updateProduct);

router.route("/getProductsName").get(getProductsName);
router.route("/:productId").get(getProduct);

router.route("/review").post(verifyJWT, reviewProduct);


export default router;