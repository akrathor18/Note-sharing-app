import express from 'express';
const router = express.Router();
import Quiz from '../models/quizSchema.js';
import verifyJWT from '../middlewares/verifyJWT.js';
import User from '../models/UserSchema.js';


router.post('/createQuiz', verifyJWT, async (req, res) => {
  try {
    const quizData = {
      ...req.body,
      createdBy: req.user.id // if you track it in the schema
    };

    const newQuiz = new Quiz(quizData);
    const resp = await newQuiz.save();

    // Optionally link to user
    await User.findByIdAndUpdate(req.user.id, {
      $push: { quizzesTaken: resp._id } // only if needed
    });

    res.status(201).json(resp);
  } catch (error) {
    console.log(error);
    res.status(500).json('Internal server error');
  }
});

router.get('/getQuiz', async (req, res) => {
  try {
    const quiz = await Quiz.find().populate('createdBy', 'name email'); // optional
    res.status(200).json(quiz);
  } catch (error) {
    console.log(error);
    res.status(500).json('Internal server error');
  }
});

// Search Quizzes
router.get('/search', async (req, res) => {
    const { search } = req.query;

    const query = search
        ? {
              $or: [
                  { title: { $regex: search, $options: 'i' } },
                  { category: { $regex: search, $options: 'i' } },
              ],
          }
        : {};

    try {
        const quizzes = await Quiz.find(query);
        res.status(200).json(quizzes);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch quizzes' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.id);
        if (!quiz) return res.status(404).json({ message: 'Quiz not found' });
        res.json(quiz);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;
