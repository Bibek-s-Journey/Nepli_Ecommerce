import dotenv from "dotenv"
import connectDB from "./db/index.js";
import {app} from "./app.js"
dotenv.config({
    path: "./.env"
});

connectDB()
    .then(() => {
        const PORT = process.env.PORT || 8000
        app.listen(PORT, () => {
            console.log(`Application is running at ${PORT}`);
        })
    })
    .catch((err) => {
        console.log(`MONGODB CONNECTION ERROR :` ,err.message);
    })