import { Link } from 'react-router-dom';
import { X, BrainCircuit } from 'lucide-react';

export default function CreateQuizHeader() {
    return (
        <div className="flex items-center justify-between p-6 border-b border-[#F5F5F5]/10">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#FF007F]/10 flex items-center justify-center">
                    <BrainCircuit size={20} className="text-[#FF007F]" />
                </div>
                <h2 className="text-xl font-bold">Create New Quiz</h2>
            </div>
            <Link to={'/quizzes'}>
                <button className="p-2 rounded-full hover:bg-[#F5F5F5]/10">
                    <X size={20} />
                </button>
            </Link>
        </div>
    );
}
