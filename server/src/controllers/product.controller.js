import { Product } from "../models/product.model.js";
import { asyncHandler } from "../utils/asycnHandler.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import {Category} from "../models/category.model.js"
import { uploadOnCloudinary } from "../utils/fileUpload.cloudinary.js";
import {Review} from "../models/review.model.js"

const uploadProduct = asyncHandler(async (req, res) => {
    const { productName, category, description, price } = req.body;
    if (!(productName && category && description && price)) {
        throw new ApiError(400, "All fields required");
    }
    const hasCategory = await Category.findOne({ category: category.toLowerCase() });
    if (!hasCategory) {
        throw new ApiError(401, "Category not available");
    }
    const productImagePath = req.file?.path;
    if (!productImagePath) {
        throw new ApiError(400, "Product file is required");
    }
    const productImage = await uploadOnCloudinary(productImagePath);
    if (!productImage.url) {
        throw new ApiError(400,"Could not upload on cloudinary")
    }

    const product = await Product.create({
        productImage: productImage.url,
        productName: productName.toLowerCase(),
        description,
        category:hasCategory.category,
        owner: req.user._id,
        price,
    });
    return res.status(201).json(new ApiResponse(201, product, "product listed successfully"));
    

})

const updateProduct = asyncHandler(async (req, res) => {
    const { productId,productName, category, description,price } = req.body;
    if (!productId) {
        throw new ApiError(401, "product Id required");
    }
    const product = await Product.findByIdAndUpdate(
        productId,
        {
            $set: {
                productName,
                category,
                description,
                price,
            }
        },
        {
            new: true,
        }
    )

    return res.status(201).json(new ApiResponse(201, product, "Product details updated successfully"));
})

const updateProductImage = asyncHandler(async (req, res) => {
    
});

const deleteProduct = asyncHandler(async (req, res) => {
    const { productId } = req.body;

    if (!productId) {
        throw new ApiError(401, "Product Id required");
    }

    const product = await Product.findByIdAndDelete(productId);

    if (!product) {
        throw new ApiError(401,"something went wrong while deleting product")
    }

    return res.status(201).send("Product delete successfully");
})

const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find();
    if (!products) {
        throw new ApiError(401, "failed to fetch products");
    }
    return res.status(201).json(new ApiResponse(201, products));
})

const getProduct = asyncHandler(async (req, res) => {
    const { productId } = req.params;
    const product = await Product.findById(productId);
    if (!product) {
        throw new ApiError(401, "Product doesn't exists");
    }
    return res.status(201).json(new ApiResponse(201, product));
})

const reviewProduct = asyncHandler(async (req, res) => {
    const { productId, reviewStar, reviewMessage } = req.body;
    const review = await Review.create({
        reviewBy: req.user?._id,
        reviewMessage,
        reviewStar,
    });

    const product = await Product.findById(productId);

    product.reviews.push(review._id);
    await product.save({ validateBeforeSave: false });

    return res.status(201).json(new ApiResponse(201, {}));
    
})

const getSellerProduct = asyncHandler(async (req, res) => {
    const product = await Product.find({ owner: req.user._id });
    if (!product || product.length === 0) {
        throw new ApiError(401, "No product available");
    }
    return res.status(201).json(new ApiResponse(201, product));
})

const getProductsName = asyncHandler(async (req, res) => {
    const productsName = await Product.find().select("productName -_id");
    if (!productsName) {
        throw new ApiError(401, "something went wrong!");
    }
    return res.status(201).json(new ApiResponse(201, productsName));
})

export {
    getProductsName,
    getSellerProduct,
    reviewProduct,
    getProduct,
    uploadProduct,
    updateProduct,
    updateProductImage,
    deleteProduct,
    getProducts
}