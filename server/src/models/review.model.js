import mongoose,{Schema} from "mongoose";

const reviewSchema = new Schema({
    reviewBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    reviewMessage: {
        type: String,
    },
    reviewImages: [
        {
            type: String,
        }
    ],
    reviewStar: {
        type: Number,
        default: 1,
        max: 5,
        min:1,
    },
},{timestamps:true})

export const Review = mongoose.model("Review", reviewSchema);