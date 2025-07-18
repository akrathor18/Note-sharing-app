import mongoose from 'mongoose';

const linkSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    label: String,
    url: String,
});

export default mongoose.model('Links', linkSchema);
