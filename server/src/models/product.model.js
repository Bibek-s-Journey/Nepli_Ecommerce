import mongoose, {Schema} from "mongoose"



const productSchema = new Schema({
    productName: {
        type: String,
        required: true,
        lowercase: true,
    },
    productImage: [
        {
            type: String,
            required: true,
            min: 1,
        }
    ],
    description: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        max: 5,
        min: 1,
        default: 5
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required:true,
    },
    category: {
        type: String,
        required: true,
        lowercase: true,
    },
    price: {
        type: Number,
        required: true,
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        }
    ],
},{timestamps: true});

export const Product = mongoose.model("Product", productSchema);