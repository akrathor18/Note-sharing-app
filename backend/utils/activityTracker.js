import UserState from '../models/UserStates.js';
import dayjs from 'dayjs';

export const trackActivityAndStreak = async (userId, updates = {}) => {
    const today = dayjs().startOf('day');

    let userState = await UserState.findOne({ user: userId });

    if (!userState) {
        userState = new UserState({
            user: userId,
            streak: 1,
            lastActive: today.toDate(),
            ...updates
        });
        return await userState.save();
    }

    const lastActive = dayjs(userState.lastActive).startOf('day');
    const diff = today.diff(lastActive, 'day');

    if (diff === 1) {
        userState.streak += 1;
    } else if (diff > 1) {
        userState.streak = 1;
    }
    if (userState.streak > (userState.highestStreak || 0)) {
        userState.highestStreak = userState.streak;
    }

    userState.lastActive = today.toDate();

    Object.entries(updates).forEach(([key, value]) => {
        userState[key] = (userState[key] || 0) + value;
    });

    await userState.save();
};
