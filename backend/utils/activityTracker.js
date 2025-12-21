import dayjs from "dayjs";
import UserState from "../models/UserStates.js";
import User from "../models/UserSchema.js";

export const trackActivityAndStreak = async (userId, updates = {}) => {
  const today = dayjs().startOf("day");

  let userState = await UserState.findOne({ user: userId });

  // Create state once
  if (!userState) {
    userState = await UserState.create({
      user: userId,
      streak: 1,
      highestStreak: 1,
      lastActive: today.toDate(),
      ...updates,
    });

    await User.findByIdAndUpdate(userId, { userState: userState._id });
    return userState;
  }

  const lastActive = dayjs(userState.lastActive).startOf("day");
  const diff = today.diff(lastActive, "day");

  // SAME DAY → do NOT touch streak
  if (diff === 0) {
    Object.entries(updates).forEach(([key, value]) => {
      userState[key] = (userState[key] || 0) + value;
    });

    await userState.save();
    return userState;
  }

  //  NEXT DAY
  if (diff === 1) {
    userState.streak += 1;
  } 
  // ❌ BROKEN STREAK
  else {
    userState.streak = 1;
  }

  // 🔥 Highest streak update
  userState.highestStreak = Math.max(
    userState.highestStreak || 0,
    userState.streak
  );

  userState.lastActive = today.toDate();

  Object.entries(updates).forEach(([key, value]) => {
    userState[key] = (userState[key] || 0) + value;
  });

  await userState.save();
  return userState;
};
