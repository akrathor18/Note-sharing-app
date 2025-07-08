import React from 'react';

function QuizCard({ quiz }) {
    return (
        <div className="bg-[#1A1A1A] rounded-xl p-4 border border-[#F5F5F5]/5">
            <div className="flex items-center justify-between mb-2">
                <span className="text-xs bg-[#00E5FF]/10 text-[#00E5FF] px-2 py-1 rounded-full">
                    {quiz.subject}
                </span>
                <span className="text-xs text-[#F5F5F5]/60">{quiz.date}</span>
            </div>
            <h3 className="font-medium mb-3">{quiz.title}</h3>
            <div className="flex items-center text-xs">
                <span className="text-green-500">Score: {quiz.score}</span>
            </div>
        </div>
    );
}

function QuizzesList({ userQuizzes }) {
    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="text-lg font-bold">My Quizzes</h2>
                <button className="text-[#00E5FF] text-sm hover:underline">View All</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {userQuizzes.map((quiz) => (
                    <QuizCard key={quiz.id} quiz={quiz} />
                ))}
            </div>
        </div>
    );
}

export default QuizzesList; 