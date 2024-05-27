import mongoose, {Schema} from "mongoose"

const categorySchema = new Schema({
    category: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
    },
});

export const Category = mongoose.model("Category", categorySchema);