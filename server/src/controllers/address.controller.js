import { Address } from "../models/address.model.js";
import { asyncHandler } from "../utils/asycnHandler.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js"

const addAddress = asyncHandler(async (req, res) => {
    const { country, state, postalCode,city,contact, streetName} = req.body;
    if (!(country && state && postalCode && city && contact && streetName)) {
        throw new ApiError(401, "All fields required");
    }
    const createdAddress = new Address.create({
        postalCode,
        city,
        contact,
        country,
        state,
        streetName,
    })
});

export {
    addAddress
}