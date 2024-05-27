import mongoose from "mongoose"
import { DB_NAME } from "../constant.js"
import { User } from "../models/user.model.js";
const updateSchema =  async () => {
    try {
        const result = await User.updateMany({}, {
            $set: {
                birthday: "",
                fullName: "",
                contactNumber: "",
            }
        })
        console.log(result);
    } catch (error) {
        console.log(error);
    }
}
const connectDB = async () => {
    try {
        const connection = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
        // updateSchema();
        // return connection.connection;
    } catch (error) {
        console.log("MongoDb connection error", error.message);
        process.exit(1);
    }

}

export default connectDB;