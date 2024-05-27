import {Router} from "express"
import { uploadCategory,getCategories,searchCategory} from "../controllers/category.controller.js";
import {verifyJWT} from "../middlewares/auth.middleware.js"
const router = Router()

router.route("/upload-category").post(uploadCategory);
router.route("/get-categories").get(getCategories);
router.route("/").get(searchCategory);

export default router;