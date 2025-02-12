import mongoose from 'mongoose'

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB connected...');
    } catch (error) {
        console.log("Error in connection of MONGODB: ",error.message);
        process.exit(1);
    }
}

export default connectDB