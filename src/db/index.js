import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGO_URI}/${process.env.DB_NAME}`
    );
    console.log(
      `MongoDB connection Successfully : ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("MONGO DB Connection Failed", error);
    process.exit(1);
  }
};

export default connectDB;
