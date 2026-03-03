import UserState from '../models/UserStates.js';

export const updateUserAverage = async (userId, percentageScore) => {
  console.log('Updating average for userId:', userId, 'with new score:', percentageScore);
  const userState = await UserState.findOne({ user: userId }).lean();
  console.log('Current UserState:', userState);

  if (!userState) {
    console.error('UserState not found for userId:', userId);
    return;
  }
  const newTotal = userState.totalAttempts + 1;

  const newAverage =
    ((userState.averagePercentage * userState.totalAttempts) + percentageScore)
    / newTotal;

  return UserState.findOneAndUpdate({ user: userId }, {
    totalAttempts: newTotal,
    averagePercentage: Number(newAverage.toFixed(2)),
  });
};