import mongoose,{Schema} from "mongoose";

const orderSchema = new Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required:true,
    },
    status: {
        type: String,
        enum: ["PENDING", "CANCELLED", "DELIVERED"],
        default: "PENDING",
    },
    quantity: {
        type: Number,
        required: true,
        min: 1,
    }
}, { timestamps: true })


export const Order = mongoose.model("Order", orderSchema);