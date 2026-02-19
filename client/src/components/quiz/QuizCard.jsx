import { AlertCircle, BrainCircuit, ChevronRight, Clock, UserPen, PenLine } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { formatDate } from '../../utils/formatDate';

const DIFFICULTY_STYLES = {
  Easy:   { pill: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20', bar: 'bg-emerald-400', width: 'w-1/3' },
  Medium: { pill: 'bg-amber-500/10 text-amber-400 border-amber-500/20',       bar: 'bg-amber-400',   width: 'w-2/3' },
  Hard:   { pill: 'bg-rose-500/10 text-rose-400 border-rose-500/20',          bar: 'bg-rose-400',    width: 'w-full' },
};

function QuizCard(quizData) {
  const quiz = quizData.quizData;
  const navigate = useNavigate();

  const startQuiz = (quizId) => navigate(`/quizzes/${quizId}`);

  const diff = DIFFICULTY_STYLES[quiz.difficulty] || DIFFICULTY_STYLES.Medium;

  return (
    <div
      className="relative bg-[#161616] rounded-2xl overflow-hidden border border-white/[0.06] hover:border-white/[0.14] transition-all duration-300 group flex flex-col"
      style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.4)' }}
    >
      {/* Banner */}
      <div className="relative h-40 bg-gradient-to-br from-[#00E5FF]/20 to-[#FF007F]/20 flex items-center justify-center shrink-0 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          }}
        />
        <BrainCircuit
          size={56}
          className="text-white/60 group-hover:text-white/80 transition-all duration-300 group-hover:scale-110 drop-shadow-lg"
        />

        {/* Difficulty badge — top right */}
        <span className={`absolute top-3 right-3 text-[10px] font-semibold uppercase tracking-widest px-2 py-0.5 rounded-md border ${diff.pill}`}>
          {quiz.difficulty}
        </span>
      </div>

      {/* Difficulty progress bar */}
      <div className="h-[2px] w-full bg-white/[0.04]">
        <div className={`h-full ${diff.bar} ${diff.width} transition-all duration-500`} />
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1 gap-4">
        {/* Category */}
        <div className="flex items-center justify-between gap-2">
          <span className="text-[11px] font-medium bg-[#00E5FF]/10 text-[#00E5FF] px-2.5 py-1 rounded-full border border-[#00E5FF]/15">
            {quiz.category}
          </span>
          <span className="text-[11px] text-white/40 flex items-center gap-1">
            <PenLine size={12} />
            {formatDate(quiz.createdAt)}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-semibold text-base text-white/90 leading-snug line-clamp-2 capitalize flex-1">
          {quiz.title}
        </h3>

        {/* Stats row */}
        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center gap-1.5 bg-white/[0.04] rounded-lg px-2.5 py-1.5">
            <AlertCircle size={12} className="text-white/40 shrink-0" />
            <span className="text-[11px] text-white/60">{quiz.questions.length} Questions</span>
          </div>
          <div className="flex items-center gap-1.5 bg-white/[0.04] rounded-lg px-2.5 py-1.5">
            <Clock size={12} className="text-white/40 shrink-0" />
            <span className="text-[11px] text-white/60">{quiz.timeLimit} min</span>
          </div>
        </div>

        {/* Creator */}
        <div className="flex items-center gap-1.5 text-[11px] text-white/35 pt-1 border-t border-white/[0.05]">
          <UserPen size={13} className="shrink-0" />
          <span className="truncate">by {quiz.createdBy?.name || 'Unknown'}</span>
        </div>
      </div>

      {/* CTA Button */}
      <div className="px-5 pb-5">
        <button
          onClick={() => startQuiz(quiz._id)}
          className="w-full py-2 px-3 rounded-xl bg-white/[0.05] hover:bg-[#FF007F] active:scale-95 transition-all duration-150 flex items-center justify-center gap-2 text-xs font-semibold text-white/70 hover:text-white group/btn shadow-lg hover:shadow-[#FF007F]/20"
        >
          Start Quiz
          <ChevronRight size={14} className="group-hover/btn:translate-x-0.5 transition-transform duration-150" />
        </button>
      </div>
    </div>
  );
}

export default QuizCard;