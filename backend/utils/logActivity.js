import User from "../models/UserSchema.js";

export async function logActivity(userId, type, refId, description ) {
  try {
    await User.findByIdAndUpdate(userId, {
      $push: { recentActivity: { type, refId, description } }
    });
    console.log("✅ Activity logged:");
  } catch (err) {
    console.error("Failed to log activity:", err.message);
  }
}
