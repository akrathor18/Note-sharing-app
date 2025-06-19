import express from "express";
const router = express.Router();
import Quiz from '../model/quizSchema.js';

router.post("/createQuiz", async (req, res) => {
    try {
        const quizData = req.body;

        const newQuiz = new Quiz(quizData)
        const resp = await newQuiz.save()
        res.status(201).json(resp)
    } catch (error) {
        console.log(error)
        res.status(500).json("Internal server error")
    }
});

router.get("/getQuiz", async (req, res) => {
    try {
        const quiz = await Quiz.find()
        res.status(200).json(quiz)

    } catch (error) {
        console.log(error)
        res.status(500).json("Internal server error")

    }
})

// Search Quizzes
router.get('/search', async (req, res) => {
    const { search } = req.query;

    const query = search
        ? {
            $or: [
                { title: { $regex: search, $options: 'i' } },
                { category: { $regex: search, $options: 'i' } }
            ]
        }
        : {};

    try {
        const quizzes = await Quiz.find(query);
        res.status(200).json(quizzes);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch quizzes' });
    }
});


export default router;