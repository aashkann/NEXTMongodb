import mongoose, { ConnectOptions } from 'mongoose';

const connectMongoDB = async (): Promise<void> => {
  try {
    const baseUri: string = process.env.MONGODB_URI!;

    await mongoose.connect(baseUri);
    console.log("Connected to MongoDB bro.");
  } catch (error: any) {
    console.error(error);
  }
};

export default connectMongoDB;
