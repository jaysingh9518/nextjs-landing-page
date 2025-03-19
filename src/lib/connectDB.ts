import mongoose from 'mongoose';

export const connectDB = async () => {
    const MONGODB_URI = process.env.MONGODB_URI; // Access here

    if (!MONGODB_URI) {
        console.error('MongoDB URI is missing from .env.local');
        throw new Error('MONGODB_URI is not defined');
    }

    try {
        const { connection } = await mongoose.connect(MONGODB_URI);
        if (connection.readyState === 1) {
            console.log('✅ MongoDB connected successfully');
            return Promise.resolve(true);
        }
    } catch (error) {
        console.error('❌ MongoDB connection error:', error);
        return Promise.reject(error);
    }
};
