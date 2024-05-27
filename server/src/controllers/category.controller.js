import { Category } from "../models/category.model.js";
import {Product} from "../models/product.model.js"
import { asyncHandler } from "../utils/asycnHandler.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js"

const uploadCategory = asyncHandler(async (req, res) => {
    const { category } = req.body;
    if (!category) {
        throw new ApiError(401, "Category required");
    }
    const existCategory = await Category.findOne({ category });
    if (existCategory) {
        throw new ApiError(401, "category already exists");
    }
    const createdCategory = await Category.create({
        category,
    })
    if (!createdCategory) {
        throw new ApiError(501, "please try again");
    }

    return res.status(201)
        .json(new ApiResponse(201, createdCategory, "category created successfully"));
        
});

const getCategories = asyncHandler(async (req, res) => {
    const categories = await Category.find();
    if (!categories) {
        throw new ApiError(401, "failed to fetch categories");
    }
    return res.status(201).json(new ApiResponse(201, categories));
});
const searchCategory = asyncHandler(async (req, res) => {
    const searchQuery = req.query.category;
    const product = await Product.find({
        category: searchQuery.toLowerCase(),
    })
    return res.status(201).json(new ApiResponse(201, product));
})
export {
    searchCategory,
    uploadCategory,
    getCategories
}