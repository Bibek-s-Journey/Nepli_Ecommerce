import mongoose, { Schema } from "mongoose"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const cartSchema = new Schema({
    id: {
        type: Schema.Types.ObjectId,
        ref:"Product",
        required: true,
    },
    quantity: {
        type: Number,
        min: 1,
        required: true,
    },
})

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["CUSTOMER", "ADMIN", "SELLER"],
        default: "CUSTOMER",
    },
    address: {
        type: Schema.Types.ObjectId,
        ref: "Address"
    },
    cartItem: [
        cartSchema,
    ],
    fullName: String,
    contactNumber: String,
    gender: {
        type: String,
        enum: ["Male", "Female"],
        default: "",
    },
    birthday: String,
    myOrder: [
        {
            type: Schema.Types.ObjectId,
            ref: "Order",
        }
    ],
    refreshToken: String,
}, { timestamps: true });

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 8);
    next();
})

userSchema.methods.isPasswordCorrect = async function (password) {
    console.log(password)
    return await bcrypt.compare(password, this.password);
    
}

userSchema.methods.generateRefreshToken = function () {
    return jwt.sign({
        _id: this._id,
    },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
        }
    )

}

userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
        }
    )

}

export const User = mongoose.model("User", userSchema);