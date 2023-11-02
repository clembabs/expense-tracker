import mongoose from "mongoose";

export const dbConnect = () => {
  try {
    mongoose.Promise = Promise;

    mongoose.connect(process.env.DB_HOST);
    console.log("Database connected successfully");
  } catch (error) {
    mongoose.connection.on("error", (error: Error) => console.log(error));
  }
};
