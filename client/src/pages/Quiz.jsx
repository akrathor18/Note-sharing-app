import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import QuizCard from '../components/quiz/QuizCard';
import API from '../config/axios';

export default function Quiz() {
    const [activeView, setActiveView] = useState('list');

    const navigate = useNavigate();

    const [quizzes, setQuizzes] = useState([]);

    const getQuizzes = async () => {
        try {
            const response = await API.get('quiz/getQuiz');
            setQuizzes(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getQuizzes();
    }, []);


    // Quiz List View
    if (activeView === 'list') {
        return (
            <div className="space-y-4 md:space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4"></div>
                <div>
                    <h1 className="text-xl md:text-2xl font-bold mb-1">Quizzes</h1>
                    <p className="text-[#F5F5F5]/60">
                        Test your knowledge with interactive quizzes
                    </p>
                </div>
                <Link to={'/createquiz'}>
                    <button className="flex items-center justify-center gap-2 bg-[#FF007F] hover:bg-[#FF007F]/90 text-white px-4 py-2 rounded-lg transition-colors  sm:w-auto">
                        <Plus size={18} />
                        <span>Create your own Quiz</span>
                    </button>
                </Link>

                {/* Quiz Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {quizzes.map((quiz) => (
                        <QuizCard key={quiz._id} quizData={quiz} />
                    ))}
                </div>
            </div>
        );
    }

    return null;
}
