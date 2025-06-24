import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const url = process.env.MONGO_URI;

if (!url) {
    console.error('MONGO_URI is not defined in .env file');
    process.exit(1);
}

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

console.log('🟢 Connecting to MongoDB');
const db = mongoose.connection;

db.on('connected', () => {
    console.log('🟢 Connected to MongoDB successfully!');
});

db.on('error', (error) => {
    console.log('🔴 An error occurred:', error);
});

db.on('disconnected', () => {
    console.log('🔴 Database disconnected!');
});

export default db;
