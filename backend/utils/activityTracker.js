import dayjs from "dayjs";
import UserState from "../models/UserStates.js";
import User from "../models/UserSchema.js";

export const trackActivityAndStreak = async (userId, updates = {}) => {
  const today = dayjs().startOf("day");

  // find the user and its state
  let userState = await UserState.findOne({ user: userId });

  if (!userState) {
    // if no userState exists, create it
    userState = new UserState({
      user: userId,
      streak: 1,
      lastActive: today.toDate(),
      ...updates,
    });
    await userState.save();

    // link the state back to the User
    await User.findByIdAndUpdate(userId, { userState: userState._id });

    return userState;
  }

  // calculate streak difference
  const lastActive = dayjs(userState.lastActive).startOf("day");
  const diff = today.diff(lastActive, "day");

  if (diff === 1) {
    userState.streak += 1;
  } else if (diff > 1) {
    userState.streak = 1;
  }

  // update highest streak if needed
  if (userState.streak > (userState.highestStreak || 0)) {
    userState.highestStreak = userState.streak;
  }

  // update last active date
  userState.lastActive = today.toDate();

  // apply extra updates (like totalQuizzesTaken, etc.)
  Object.entries(updates).forEach(([key, value]) => {
    userState[key] = (userState[key] || 0) + value;
  });

  await userState.save();
  return userState;
};
