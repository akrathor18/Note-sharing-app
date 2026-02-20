import { useEffect, useState } from 'react';
import { Trash2, HelpCircle, PlayCircle, BarChart2 } from 'lucide-react';
import { useQuizStore } from '../../store/quizStore';
import { formatDate } from '../../utils/formatDate';
import ErrorState from '../../common/components/ErrorState';
import CardSkeleton from '../../common/components/CardSkeleton';
import EmptyState from '../../common/components/EmptyState';
import { useNavigate } from 'react-router-dom';
/* ── Difficulty config (static Tailwind) ── */
const DIFF_STYLES = {
    easy: { label: 'Easy', dot: 'bg-green-400', text: 'text-green-400', badge: 'bg-green-400/10 text-green-400 border-green-400/20' },
    medium: { label: 'Medium', dot: 'bg-yellow-400', text: 'text-yellow-400', badge: 'bg-yellow-400/10 text-yellow-400 border-yellow-400/20' },
    hard: { label: 'Hard', dot: 'bg-red-400', text: 'text-red-400', badge: 'bg-red-400/10 text-red-400 border-red-400/20' },
};
const DIFF_DEFAULT = { label: 'Quiz', dot: 'bg-[#00E5FF]', text: 'text-[#00E5FF]', badge: 'bg-[#00E5FF]/10 text-[#00E5FF] border-[#00E5FF]/20' };


//    QuizCard
function QuizCard({ quiz, index }) {
    const navigate = useNavigate();

    const { deleteQuiz, deleteQuizId } = useQuizStore();
    const [confirm, setConfirm] = useState(false);

    const isDeleting = deleteQuizId === quiz._id;
    const diff = DIFF_STYLES[quiz.difficulty?.toLowerCase()] ?? DIFF_DEFAULT;
    const initials = (quiz.createdBy?.name ?? quiz.category ?? '?').slice(0, 2).toUpperCase();


    const handleDelete = () => {
        if (confirm) {
            deleteQuiz(quiz._id);
            setConfirm(false);
        } else {
            setConfirm(true);
        }
    };

    return (
        <div
            className="group relative rounded-2xl bg-[#0f0f0f] border border-white/[0.07] overflow-hidden
                 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#00E5FF]/30
                 hover:shadow-[0_0_0_1px_rgba(0,229,255,0.12),0_20px_50px_rgba(0,0,0,0.5)]"
            style={{ animationDelay: `${index * 65}ms` }}
        >
            {/* ── Top strip ── */}
            <div className="relative z-10 flex items-center justify-between px-4 py-3 border-b border-white/[0.06] bg-gradient-to-r from-[#00E5FF]/10 to-transparent">

                {/* Category dot + label */}
                <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full shrink-0 bg-[#00E5FF] shadow-[0_0_6px_#00E5FF]" />
                    <span className="text-[10px] font-semibold tracking-widest uppercase text-[#00E5FF]">
                        {quiz.category}
                    </span>
                </div>

                {/* Difficulty badge */}
                <div className="flex items-center gap-2">
                    {quiz.difficulty && (
                        <span className={`text-[10px] font-bold tracking-wide px-2 py-0.5 rounded border ${diff.badge}`}>
                            {quiz.difficulty}
                        </span>
                    )}
                </div>
            </div>

            {/* ── Body ── */}
            <div className="relative z-10 p-4 flex flex-col gap-4">

                {/* Title + description */}
                <div>
                    <h3 className="text-[15px] font-bold text-[#f0f0f0] leading-snug tracking-tight">
                        {quiz.title}
                    </h3>
                    {quiz.description && (
                        <p className="mt-1.5 text-[13px] text-white/40 leading-relaxed line-clamp-2">
                            {quiz.description}
                        </p>
                    )}
                </div>

                {/* Divider */}
                <div className="h-px bg-white/[0.05]" />

                {/* Footer: author + question count */}
                <div className="flex items-center justify-between gap-2">
                    {/* Author / date */}
                    <div className="flex items-center gap-2 min-w-0">
                        <div className="w-7 h-7 rounded-lg shrink-0 flex items-center justify-center
                            text-[10px] font-extrabold text-[#00E5FF]
                            bg-[#00E5FF]/10 border border-[#00E5FF]/20">
                            {initials}
                        </div>
                        <div className="min-w-0">
                            {quiz.createdBy?.name && (
                                <p className="text-xs font-semibold text-white/70 truncate leading-none">
                                    {quiz.createdBy.name}
                                </p>
                            )}
                            <p className={`text-[10px] text-white/30 leading-none ${quiz.createdBy?.name ? 'mt-0.5' : ''}`}>
                                {formatDate(quiz.createdAt)}
                            </p>
                        </div>
                    </div>

                    {/* Question count + visibility */}
                    <div className="flex items-center gap-2 shrink-0">
                        <span className="flex items-center gap-1 text-[11px] font-semibold text-green-400">
                            <HelpCircle size={11} /> {quiz.questionCount ?? 0} Qs
                        </span>
                        {quiz.visibility && (
                            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md border
                ${quiz.visibility === 'public'
                                    ? 'text-green-400 bg-green-400/[0.07] border-green-400/20'
                                    : 'text-white/30 bg-white/[0.04] border-white/[0.07]'
                                }`}>
                                {quiz.visibility}
                            </span>
                        )}
                    </div>
                </div>

                {/* ── Action bar ── */}
                <div className="flex items-center gap-2 pt-0.5">
                    {/* Start quiz */}
                    <button
                        onClick={() => navigate(`/quizzes/${quiz._id}`)}
                        className="flex-1 flex items-center justify-center gap-1.5 text-xs font-semibold
                       text-[#00E5FF] bg-[#00E5FF]/10 border border-[#00E5FF]/25
                       rounded-[9px] py-2.5 transition-all duration-200
                       hover:bg-[#00E5FF]/20 hover:border-[#00E5FF]/50"
                    >
                        <PlayCircle size={13} /> Start quiz
                    </button>

                    {/* Delete button */}
                    <button
                        onClick={handleDelete}
                        disabled={isDeleting}
                        className={`flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2.5 rounded-[9px]
                        border transition-all duration-200
                        ${isDeleting
                                ? 'text-red-500/35 border-red-500/10 cursor-not-allowed animate-pulse'
                                : confirm
                                    ? 'text-white bg-red-500 border-red-500 shadow-[0_0_16px_rgba(239,68,68,0.28)]'
                                    : 'text-red-500/55 border-red-500/20 hover:text-red-400 hover:bg-red-500/10 hover:border-red-500/40'
                            }`}
                    >
                        <Trash2 size={13} />
                        {isDeleting ? 'Deleting…' : confirm ? 'Sure?' : 'Delete'}
                    </button>

                    {/* Cancel */}
                    {confirm && !isDeleting && (
                        <button
                            onClick={() => setConfirm(false)}
                            className="text-[11px] font-semibold text-white/30 border border-white/[0.08] rounded-[9px]
                         px-3 py-2.5 transition-all duration-150 hover:text-white/70 hover:border-white/20"
                        >
                            ✕
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

//    QuizzesList ← default export

function QuizzesList() {
    const { ftechUserQuizzes, userQuizzes, isLoading, error } = useQuizStore();
    useEffect(() => {
        ftechUserQuizzes();
    }, [ftechUserQuizzes]);

    if (isLoading) return <CardSkeleton />;
    if (error) return (
        <ErrorState
            title="Unable to load quizzes"
            message={error}
        />
    );
    if (!userQuizzes || userQuizzes.length === 0) return <EmptyState type="quiz" />;

    return (
        <div className="space-y-5">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-lg font-bold text-[#F5F5F5]">My Quizzes</h2>
                    <p className="text-xs text-[#F5F5F5]/30 mt-0.5">
                        {userQuizzes.length} quiz{userQuizzes.length !== 1 ? 'zes' : ''}
                    </p>
                </div>
                <button className="text-[13px] font-semibold text-[#00E5FF]/70 hover:text-[#00E5FF] transition-colors hover:underline underline-offset-2">
                    View All
                </button>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {userQuizzes.map((quiz, i) => (
                    <QuizCard key={quiz._id} quiz={quiz} index={i} />
                ))}
            </div>
        </div>
    );
}

export default QuizzesList;