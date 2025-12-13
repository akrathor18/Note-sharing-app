import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';


const activitySchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['quiz_created', 'note_upload', 'quiz_attempt', 'streak_milestone'],
    required: true,
  },
  refId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: 'type',
  },
  refTitle: { type: String }, 
  description: { type: String },

  // fields for quiz activity
  score: { type: Number },             
  percentageScore: { type: Number },    
  totalQuestions: { type: Number },    

  // field for note activity
  subject: { type: String },
  

  timestamp: { type: Date, default: Date.now },
}, { _id: false });

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  bio: { type: String, default: '' }, // User's bio section
  profilePic: { type: String, default: '' }, // URL to user's profile picture
  profilePicId: { type: String, default: '' },// save Cloudinary public ID for profile picture
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Role',
    required: true
  },

  links: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Link'
  }],
  userstate: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserState'
  }],

  recentActivity: [activitySchema],
  notes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Note'
  }],
  quizzes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quiz'
  }],
  createdAt: { type: Date, default: Date.now },
});

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;
