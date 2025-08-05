import mongoose from "mongoose"

const DB_CONNECTION_URI = process.env.DB_CONNECTION_URI;
const connectDb = async () => {
    try {
        await mongoose.connect(DB_CONNECTION_URI)
    } catch (error) {
        throw error
    }
}

export default connectDb