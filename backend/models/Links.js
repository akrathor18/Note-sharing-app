import mongoose from "mongoose";

const linkSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  label: { type: String, required: true }, // e.g. "GitHub", "Portfolio"
  url: { type: String, required: true },   // actual link
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Link", linkSchema);
