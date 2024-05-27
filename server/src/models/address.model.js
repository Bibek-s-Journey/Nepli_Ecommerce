import mongoose, {Schema} from "mongoose"

const addressSchema = new Schema({
    city: {
        type: String,
        required: true,
    },
    postalCode: Number,
    country: String,
    streetName: String,
    state: String,
    contact: String,
});

export const Address = mongoose.model("Address", addressSchema);