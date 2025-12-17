import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import API from '../config/axios';

import CreateQuizHeader from '../components/quiz/CreateQuizHeader';
import QuizMetadataForm from '../components/quiz/QuizMetadataForm';
import QuestionList from '../components/quiz/QuestionList';
import CreateQuizFooter from '../components/quiz/CreateQuizFooter';

import { useQuizStore } from '../store/quizStore';

const initialQuestionState = {
    id: 1,
    text: '',
    options: [
        { id: 'a', text: '' },
        { id: 'b', text: '' },
        { id: 'c', text: '' },
        { id: 'd', text: '' },
    ],
    correctAnswer: '',
};

const initialQuizState = {
    title: '',
    category: '',
    timeLimit: 10,
    difficulty: 'Medium',
    questions: [initialQuestionState],
};

export default function CreateQuiz() {

    const { UploadQuiz, isUploading, error } = useQuizStore()
    // Hooks
    const navigate = useNavigate();

    // State
    const [expandedQuestionId, setExpandedQuestionId] = useState(null);
    const [quizData, setQuizData] = useState(initialQuizState);
    useEffect(() => {
        if (quizData.questions.length && expandedQuestionId === null) {
            setExpandedQuestionId(quizData.questions[0].id);
        }
    }, []);

    // Handlers
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setQuizData({ ...quizData, [name]: value });
    };

    const handleQuestionChange = (questionId, field, value) => {
        setQuizData({
            ...quizData,
            questions: quizData.questions.map((q) =>
                q.id === questionId ? { ...q, [field]: value } : q,
            ),
        });
    };

    const handleOptionChange = (questionId, optionId, value) => {
        setQuizData({
            ...quizData,
            questions: quizData.questions.map((q) =>
                q.id === questionId
                    ? {
                        ...q,
                        options: q.options.map((opt) =>
                            opt.id === optionId ? { ...opt, text: value } : opt,
                        ),
                    }
                    : q,
            ),
        });
    };

    const handleCorrectAnswerChange = (questionId, correctAnswer) => {
        setQuizData({
            ...quizData,
            questions: quizData.questions.map((q) =>
                q.id === questionId ? { ...q, correctAnswer } : q,
            ),
        });
    };

    const addQuestion = () => {
        const newQuestion = {
            id: Date.now(),
            text: '',
            options: [
                { id: 'a', text: '' },
                { id: 'b', text: '' },
                { id: 'c', text: '' },
                { id: 'd', text: '' },
            ],
            correctAnswer: '',
        };
        setQuizData({
            ...quizData,
            questions: [...quizData.questions, newQuestion],
        });
        setExpandedQuestionId(newQuestion.id);
    };

    const removeQuestion = (questionId) => {
        if (quizData.questions.length > 1) {
            setQuizData({
                ...quizData,
                questions: quizData.questions.filter((q) => q.id !== questionId),
            });
        }
    };

    const handleCancel = () => {
        navigate('/quizzes');
    };

    const validateQuiz = () => {
        if (!quizData.title.trim()) {
            toast.warn('Please enter a quiz title');
            return false;
        }
        if (!quizData.category.trim()) {
            toast.warn('Please select a subject for the quiz');
            return false;
        }
        for (const question of quizData.questions) {
            if (!question.text.trim()) {
                toast.warn(
                    `Please fill in the question text for Question ${quizData.questions.indexOf(question) + 1}`,
                );
                return false;
            }
            if (question.options.some((opt) => !opt.text.trim())) {
                toast.warn(
                    `Please fill in all answer options for Question ${quizData.questions.indexOf(question) + 1}`,
                );
                return false;
            }
            if (!question.correctAnswer) {
                toast.warn(
                    `Please select a correct answer for Question ${quizData.questions.indexOf(question) + 1}`,
                );
                return false;
            }
        }
        return true;
    };

    const handleSaveQuiz = async () => {
        if (!validateQuiz()) return;
        console.log(quizData)

        UploadQuiz(quizData);
    };
    if (error) toast.error(error);

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div className="bg-[#1A1A1A] rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                <CreateQuizHeader />

                <div className="sm:p-6 p-3 space-y-6">
                    <QuizMetadataForm quizData={quizData} onInputChange={handleInputChange} />

                    <QuestionList
                        questions={quizData.questions}
                        expandedQuestionId={expandedQuestionId}
                        setExpandedQuestionId={setExpandedQuestionId}
                        onAddQuestion={addQuestion}
                        onRemoveQuestion={removeQuestion}
                        onQuestionChange={handleQuestionChange}
                        onOptionChange={handleOptionChange}
                        onCorrectAnswerChange={handleCorrectAnswerChange}
                    />

                </div>

                <CreateQuizFooter
                    onCancel={handleCancel}
                    onSave={handleSaveQuiz}
                    isUploading={isUploading}
                />
            </div>
        </div>
    );
}
