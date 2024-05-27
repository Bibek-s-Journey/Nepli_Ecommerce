import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asycnHandler.js";
import axios from "axios"

const checkoutProducts = asyncHandler(async (req, res) => {
    const { cartTotal, cartProducts } = req.body;
    const formData = {
        return_url: "http://localhost:5173/api/khalti/callback",
        website_url: "http://localhost:5173",
        amount: cartTotal * 100,
        purchase_order_id: req.user._id,
        purchase_order_name: "test",
    };
    await callKhalti(formData, res);
})

const callKhalti = async (formData, res) => {
    try {
        console.log(process.env.KHALTI_SECRET_KEY);
        const headers = {
            Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`,
            "Content-Type": "application/json",
          };
        const response = await axios.post(
            "https://a.khalti.com/api/v2/epayment/initiate/",
            JSON.stringify(formData),
            {
                headers,
            }
        )
        return res.status(201).json(new ApiResponse(201, response.data, "Khalti success"));
    } catch (error) {
        return res.status(401).json(new ApiResponse(401, {}, error?.message))
    }
}

const handleKhaltiCallback = asyncHandler(async (req, res, next) => {
    const { txnId, pidx, amount, purchase_order_id, transaction_id, message } = req.query;
    if (message) {
        throw new ApiError(400, message || "Error Processing Khalti");
    }
    const headers = {
        Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`,
        "Content-Type": "application/json",
    };
    const response = await axios.post("https://a.khalti.com/api/v2/epayment/lookup/", { pidx }, { headers });

    if (response.data.status !== "Completed") {
        throw new ApiError(400, "Payment not completed");
    }

    req.transaction_uuid = purchase_order_id;
    req.transaction_code = pidx;
    next();
})
export {
    handleKhaltiCallback,
    checkoutProducts
}