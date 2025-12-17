import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import QuizGrid from '../components/quiz/QuizGrid';
import Skeleton from '../common/components/Skeleton';
import ErrorState from '../common/components/ErrorState';
import SearchAndFilter from '../common/components/SearchAndFilter';
import SubjectTabs from '../common/components/SubjectTabs';
import { useQuizStore } from '../store/quizStore';
import Header from '../common/components/Header';

export default function Quiz() {
    const navigate = useNavigate();

    const [activeSubject, setActiveSubject] = useState('All Subjects');
    const [searchTerm, setSearchTerm] = useState('');
    const { QuizzesList, fetchQuizzes, isLoading, error } = useQuizStore();

    useEffect(() => {
        fetchQuizzes();
    }, [fetchQuizzes]);

    if (isLoading) return <Skeleton />;
    if (error) return <ErrorState title="Unable to load quizzes"
        message={error} />;


    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };
    const handleAddQuizClick = () => {
        navigate('./createquiz');
    }

const filteredQuiz = QuizzesList
        .filter((quiz) => {return activeSubject === 'All Subjects' || quiz.category.toLowerCase() === activeSubject.toLowerCase()})
        .filter(
            (quiz) =>
                searchTerm === '' ||
                quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                quiz.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (quiz.description &&
                    quiz.description.toLowerCase().includes(searchTerm.toLowerCase())),
        );
    // Quiz List View
    return (
        <div className="space-y-4 md:space-y-6">
            <Header onAddClick={handleAddQuizClick} title={"Quizzes"} description={"Test your knowledge with interactive quizzes"} />
            <SearchAndFilter searchTerm={searchTerm} onSearchChange={handleSearchChange} />
            <SubjectTabs activeSubject={activeSubject} onSubjectClick={setActiveSubject} />
            {/* Quiz Cards */}
            <QuizGrid quiz={filteredQuiz} searchTerm={searchTerm} />
        </div>
    );
}

