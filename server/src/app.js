import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"



const app = express();
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}))
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(express.static("public"))

app.use(cookieParser());



import productRouter from "./routes/product.routes.js"
import userRouter from "./routes/user.routes.js"
import categoryRouter from "./routes/category.routes.js"
import addressRouter from "./routes/address.routes.js"
import paymentRouter from "./routes/payment.routes.js"
import ApiResponse from "./utils/apiResponse.js";

app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/address", addressRouter);
app.use("/api/v1/payment", paymentRouter);



app.use((err, req, res, next) => {
    return res.status(err.statusCode || 401).json(new ApiResponse(err.statusCode, {
    }, err.message));
})









export { app };