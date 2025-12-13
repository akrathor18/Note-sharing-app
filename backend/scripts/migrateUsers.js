import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../../models/User.js'; // adjust the path as needed

dotenv.config(); // load your .env file

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('✅ Connected to MongoDB');
        return runMigration();
    })
    .catch((err) => console.error('❌ DB Connection Error:', err));

// Migration logic
async function runMigration() {
    try {
        const result = await User.updateMany({}, {
            $set: {
                bio: '',
                achievements: [],
            },
            $unset: {
               
                totalStudyTime: 0, // optional: remove fields if needed
            }
        });

        console.log(`✅ Migration completed. Modified ${result.modifiedCount} users.`);
        process.exit(0);
    } catch (err) {
        console.error('❌ Migration failed:', err);
        process.exit(1);
    }
}
