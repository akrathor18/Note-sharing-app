import mongoose from 'mongoose';
import Quiz from '../models/quizSchema.js';
import UserState from '../models/UserStates.js';
import User from '../models/UserSchema.js';
import QuizAttempt from '../models/QuizAttempt.js';
import { trackActivityAndStreak } from '../utils/activityTracker.js';
import { logActivity } from '../utils/logActivity.js';
import { updateUserAverage } from '../utils/updateUserAverage.js';
export const createQuiz = async ({ body, userId }) => {
  const newQuiz = new Quiz({ ...body, createdBy: userId });
  const saved = await newQuiz.save();

  await User.findByIdAndUpdate(userId, { $push: { quizzes: saved._id } });
  await trackActivityAndStreak(userId, { totalQuizzesCreated: 1 });

  await logActivity(userId, 'quiz_created', saved._id, 'Created a quiz', {
    refTitle: saved.title,
    subject: saved.category,
  });

  return saved;
};

export const getAllQuizzes = async () => {
  return await Quiz.find()
    .populate('createdBy', 'name email')
    .limit(20)
    .sort({ createdAt: -1 });
};

export const getMyQuizzes = async (userId) => {
  return await Quiz.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(userId) } },
    {
      $project: {
        title: 1,
        description: 1,
        createdAt: 1,
        category: 1,
        difficulty: 1,
        questionCount: { $size: '$questions' },
      },
    },
  ]);
};

export const getMyAttempts = async (userId) => {
  return await QuizAttempt.aggregate([
    {
      $match: {
        user: new mongoose.Types.ObjectId(userId),
      },
    },

    // Join Quiz collection
    {
      $lookup: {
        from: "quizzes", // ⚠️ collection name (usually plural + lowercase)
        localField: "quiz",
        foreignField: "_id",
        as: "quiz",
      },
    },

    // quiz will be an array, convert to object
    {
      $unwind: "$quiz",
    },

    // Add computed fields
    {
      $addFields: {
        totalQuestions: { $size: "$answers" },
        correctQuestions: {
          $size: {
            $filter: {
              input: "$answers",
              as: "a",
              cond: { $eq: ["$$a.isCorrect", true] },
            },
          },
        },
      },
    },

    // Pick only needed quiz fields (like populate select)
    {
      $project: {
        quiz: {
          title: 1,
          category: 1,
          difficulty: 1,
        },
        score: 1,
        percentageScore: 1,
        attemptedAt: 1,
        totalQuestions: 1,
        correctQuestions: 1,
      },
    },

    { $sort: { attemptedAt: -1 } },
    { $limit: 10 },
  ]);
};


export const searchQuizzes = async (query) => {
  return await Quiz.find({
    $or: [
      { title: { $regex: query, $options: 'i' } },
      { category: { $regex: query, $options: 'i' } },
    ],
  }).limit(20);
};

export const getQuizById = async (id) => {
  return await Quiz.findById(id).select('-questions.correctAnswer');
};

export const deleteQuiz = async ({ id, userId }) => {
  const quiz = await Quiz.findById(id);

  if (!quiz) return { notFound: true };
  if (quiz.createdBy.toString() !== userId.toString()) return { forbidden: true };

  await quiz.deleteOne();
  await UserState.findByIdAndUpdate(userId, { $inc: { totalQuizCreated: -1 } });
  await logActivity(userId, 'quiz_deleted', quiz._id, 'Deleted a quiz', {
    refTitle: quiz.title,
    subject: quiz.category,
  });
  return { success: true };
};

export const attemptQuiz = async ({ quizId, userId, answers }) => {
const quiz = await Quiz.findById(quizId)
  .select("questions title category")
  .lean()

  if (!quiz) return { notFound: true };

 let score = 0;
let unansweredFound = false;

const results = quiz.questions.map((q) => {
  const userAnswer = answers[q._id.toString()];

  if (!userAnswer) unansweredFound = true;

  const isCorrect = q.correctAnswer === userAnswer;
  if (isCorrect) score++;

  return {
    questionId: q._id,
    selectedAnswer: userAnswer ?? null,
    isCorrect,
  };
});

if (unansweredFound) return { unanswered: true };

  const totalQuestions = quiz.questions.length;
  const percentageScore = (score / totalQuestions) * 100;

  const attempt = new QuizAttempt({
    user: userId,
    quiz: quiz._id,
    score,
    percentageScore,
    answers: results.map(r => ({
      questionId: r.questionId,
      selectedAnswer: r.userAnswer ?? null,
      isCorrect: r.isCorrect,
    })),
  });

 await Promise.all([
  User.findByIdAndUpdate(userId, {
    $addToSet: { quizzesTaken: quiz._id },
  }),

  updateUserAverage(userId, percentageScore),

  trackActivityAndStreak(userId, {
    totalQuizzesTaken: 1,
  }),

  logActivity(userId, "quiz_attempt", quizId, "Attempted a quiz", {
    score,
    totalQuestions,
    percentageScore,
    refTitle: quiz.title,
    subject: quiz.category,
  }),
]);

  return {
    data: { score, total: totalQuestions, results, percentageScore },
  };
};

export const updateQuiz = async ({ quizId, userId, updateData }) => {
  const quiz = await Quiz.findById(quizId);

  if (!quiz) return { notFound: true };
  if (quiz.createdBy.toString() !== userId.toString()) return { forbidden: true };

  const updated = await Quiz.findByIdAndUpdate(quizId, updateData, { new: true });
  return { quiz: updated };
};