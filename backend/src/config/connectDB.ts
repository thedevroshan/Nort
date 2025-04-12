import mongoose from "mongoose";

export const connectDB = async ():Promise<void> => {
    await mongoose.connect(process.env.MONGODB_URI as string, {
        dbName: process.env.MONGODB_DBNAME,
    })
    console.log('Connected to Database')
}