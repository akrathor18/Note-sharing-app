import express from "express";
const router = express.Router();
import Quiz from '../module/quizSchema.js';
import jwt from 'jsonwebtoken'

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

export default router;