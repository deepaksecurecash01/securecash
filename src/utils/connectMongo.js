import mongoose from "mongoose";

export const connectMongo = async () =>
{
    if (mongoose.connections[0].readyState) {
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URL, {
            dbName: "edockets",
        });
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("MongoDB connection failed:", error);
        throw error;
    }
};