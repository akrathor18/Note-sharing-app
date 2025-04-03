import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
  title: { type: String, required: true }, 
  category: { type: String, required: true }, 
  timeLimit: { type: Number, default: 10 }, 
  questions: [
    {
      questionText: { type: String, required: true }, 
      options: [{ type: String, required: true }],
      correctAnswer: { type: String, required: true },
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Quiz", quizSchema);
