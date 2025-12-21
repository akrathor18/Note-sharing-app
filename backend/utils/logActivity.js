import User from "../models/UserSchema.js";

export async function logActivity(userId, type, refId, description, extra = {}) {
  try {
    await User.findByIdAndUpdate(userId, {
      $push: {
        recentActivity: {
          type,
          refId,
          description,
          ...extra,
          timestamp: new Date(),
        },
      },
    });
  } catch (err) {
    console.error("Failed to log activity:", err.message);
  }
}
