import { User } from "../models/user.model.js"
import { Product } from "../models/product.model.js"
import ApiError from "../utils/apiError.js"
import ApiResponse from "../utils/apiResponse.js"
import { asyncHandler } from "../utils/asycnHandler.js"

const generateAccessAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();

        const refreshToken = user.generateRefreshToken();
        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return { refreshToken, accessToken };

    } catch (error) {
        throw new ApiError(500, "Error while generating access and refresh token");
    }
}

const registerUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!(email && password)) {
        throw new ApiError(401, "All fields required")
    }

    const existedUser = await User.findOne({ email });
    if (existedUser) {
        throw new ApiError(401, "User already exists");
    }
    const user = await User.create({
        email,
        password,
    });

    const createdUser = await User.findById(user._id).select("-password -refreshToken");
    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering user");
    }

    return res.status(201).json(new ApiResponse(200, createdUser, "User registered successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // TODO: Handle another language request i.e Nepali, etc.
    if (!(email && password)) {
        throw new ApiError(401, "All fields required");
    }
    const user = await User.findOne({ email });

    if (!user) {
        throw new ApiError(401, "User doesn't exists");
    }
    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid user credentials");
    } 
    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id);
    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")
    const options = {
        secure: true,
        httpOnly: true
    }
    return res
        .status(201)
        .cookie("accessToken", accessToken, options)
        .json(new ApiResponse(201, loggedInUser, "user logged in successfully"))

});

const logOutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                refreshToken: undefined,
            }
        }, {
        new: true,
    }
    )
    const options = {
        httpOnly: true,
        secure: true,
    }

    return res.status(201)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "user Logged out"))
})

const changePassword = asyncHandler(async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    if (currentPassword === newPassword) {
        throw new ApiError(401, "Same Password");
    }
    const currentUser = await User.findById(req.user._id);
    
    const isPasswordCorrect = await currentUser.isPasswordCorrect(currentPassword);
    console.log("hello");
    if (!isPasswordCorrect) {
        throw new ApiError(401, "Invalid Password");
    }
    currentUser.password = newPassword;
    await currentUser.save({ validateBeforeSave: false });

    return res.status(201).json(new ApiResponse(201,{},"Password changed successfully"));
})

const updateCartItem = asyncHandler(async (req, res) => {
    const { productId, newQuantity } = req.body;
    const { _id } = req.user
    const user = await User.findById(_id);
    const cartItemIndex = user.cartItem.findIndex(item => String(item.id) === productId);
    if (cartItemIndex === -1) {
        throw new ApiError(401, "Cart is Empty");
    }
    if (newQuantity === 0) {
        user.cartItem.splice(cartItemIndex, 1);
    } else {
        user.cartItem[cartItemIndex].quantity = newQuantity;
    }
    await user.save({validateBeforeSave:false});
    console.log(user.cartItem);
    return res.status(201).json(new ApiResponse(201, {}, "Cart updated"));
})

const addCartItem = asyncHandler(async (req, res) => {
    const { productId, quantity } = req.body;

    const newCartItem = { id: productId, quantity: quantity };
    const { _id } = req.user;
    const user = await User.findById(_id);
    const cartExists = user.cartItem.findIndex(item => String(item.id) === productId);
    console.log(cartExists);

    if (cartExists === -1) {
        user.cartItem.push(newCartItem);
    } else {
        user.cartItem[cartExists].quantity += 1;
    }
    await user.save({ validateBeforeSave: false });
    console.log(user.cartItem);
    return res.status(201).json(new ApiResponse(201, {}, "Item added"));

})
const getCartItem = asyncHandler(async (req, res) => {
    const { _id } = req.user;

    // const user = await User.findById(_id);

    // const productIds = user.cartItem.map(item => item.id);

    // const cartProducts = await Product.find({ _id: { $in: productIds } });

    // const mergedCartProducts = user.cartItem.map(item => {
    //     const product = cartProducts.find(p => p._id.equals(item.id));
    //     return {
    //         product,
    //         quantity: item.quantity,
    //     };
    // });

    const cartProducts = await User.aggregate([
        { $match: { _id } },
        { $unwind: "$cartItem" },
        {
            $lookup: {
                from: "products",
                localField: "cartItem.id",
                foreignField: "_id",
                as: "product"
            }
        },
        { $unwind: "$product" },
        {
            $project: {
                product: {
                    _id: "$product._id",
                    productName: "$product.productName",
                    description: "$product.description",
                    price: "$product.price",
                    productImage: "$product.productImage",
                    category: "$product.category",
                },
                quantity: "$cartItem.quantity",
            }
        }
    ]);

    // const cartProducts = await User.aggregate([
    //     { $match: { _id } },
    //     { 
    //         $lookup: {
    //             from: "products",
    //             let: { cartItemId: "$cartItem.id", quantity: "$cartItem.quantity" },
    //             pipeline: [
    //                 { 
    //                     $match: {
    //                         $expr: {
    //                             $eq: ["$_id", "$$cartItemId"]
    //                         }
    //                     }
    //                 },
    //                 { $project: { _id: 1, name: 1, description: 1, price: 1, quantity: "$$quantity" } }
    //             ],
    //             as: "cartItems"
    //         }
    //     },
    //     { $unwind: "$cartItems" }, // Unwind the array if necessary
    //     { $replaceRoot: { newRoot: "$cartItems" } } // Replace the root document with the merged result
    // ])


    return res.status(201).json(new ApiResponse(201, cartProducts))

})

const becomeSeller = asyncHandler(async (req, res) => {
    const { _id } = req.user;

    const user = await User.findById(_id);
    user.role = "SELLER";
    await user.save({ validateBeforeSave: false });
    return res.status(201).json(new ApiResponse(201, {}));
})


const getCurrentUser = asyncHandler(async(req, res) => {
    return res.status(201).json(new ApiResponse(201, req.user, "Current user fetched"));
})

const updateOrderAfterPayment = asyncHandler(async (req, res) => {
    
})

export {
    getCurrentUser,
    becomeSeller,
    getCartItem,
    addCartItem,
    updateCartItem,
    changePassword,
    registerUser,
    loginUser,
    logOutUser
}