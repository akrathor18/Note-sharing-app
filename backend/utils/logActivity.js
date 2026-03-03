import User from "../models/UserSchema.js";

export async function logActivity(userId, type, refId, description, extra = {}) {
  try {
    await User.findByIdAndUpdate(userId, {
      $push: {
        recentActivity: {
          $each: [{ type, refId, description, ...extra, timestamp: new Date() }],
          $slice: -50,  // keep only the 50 most recent entries
        },
      },
    });
  } catch (err) {
    console.error("Failed to log activity:", err.message);
  }
}
