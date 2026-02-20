import { useEffect } from 'react';
import { formatDateTime } from '../../utils/formatDate';
import { useQuizStore } from '../../store/quizStore';
import ErrorState from '../../common/components/ErrorState';
import CardSkeleton from '../../common/components/CardSkeleton';
import EmptyState from '../../common/components/EmptyState';

// ─── Score Ring 
function ScoreRing({ percent }) {
    const radius = 28;
    const circ = 2 * Math.PI * radius;
    const offset = circ - (percent / 100) * circ;

    const color =
        percent >= 80 ? '#22d3a0' : percent >= 50 ? '#f59e0b' : '#ef4444';

    return (
        <div className="relative flex items-center justify-center" style={{ width: 72, height: 72 }}>
            <svg width="72" height="72" style={{ transform: 'rotate(-90deg)' }}>
                <circle
                    cx="36" cy="36" r={radius}
                    fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="5"
                />
                <circle
                    cx="36" cy="36" r={radius}
                    fill="none"
                    stroke={color}
                    strokeWidth="5"
                    strokeLinecap="round"
                    strokeDasharray={circ}
                    strokeDashoffset={offset}
                    style={{ transition: 'stroke-dashoffset 0.8s cubic-bezier(.4,0,.2,1)' }}
                />
            </svg>
            <span
                className="absolute text-sm font-bold"
                style={{ color, letterSpacing: '-0.02em' }}
            >
                {percent}%
            </span>
        </div>
    );
}

// ─── Difficulty Badge
const difficultyConfig = {
    Easy: { color: '#22d3a0', bg: 'rgba(34,211,160,0.10)', dot: '#22d3a0' },
    Medium: { color: '#f59e0b', bg: 'rgba(245,158,11,0.10)', dot: '#f59e0b' },
    Hard: { color: '#ef4444', bg: 'rgba(239,68,68,0.10)', dot: '#ef4444' },
};

function DifficultyBadge({ level }) {
    const cfg = difficultyConfig[level] || difficultyConfig['Medium'];
    return (
        <span
            className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full"
            style={{ color: cfg.color, background: cfg.bg, fontFamily: "'DM Mono', monospace" }}
        >
            <span
                className="rounded-full"
                style={{ width: 5, height: 5, background: cfg.dot, display: 'inline-block' }}
            />
            {level}
        </span>
    );
}

// ─── QuizCard
function QuizCard({ attempt }) {
    const q = attempt;
    const correct = q.score;
    const total = q.totalQuestions;
    const incorrect = total - correct;

    return (
        <div
            className="group relative overflow-hidden rounded-2xl border transition-all duration-300"
            style={{
                background: 'linear-gradient(145deg, #1c1c1f 0%, #161618 100%)',
                borderColor: 'rgba(255,255,255,0.07)',
                boxShadow: '0 2px 20px rgba(0,0,0,0.4)',
            }}
            onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(0,229,255,0.2)';
                e.currentTarget.style.boxShadow = '0 4px 30px rgba(0,229,255,0.08)';
                e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
                e.currentTarget.style.boxShadow = '0 2px 20px rgba(0,0,0,0.4)';
                e.currentTarget.style.transform = 'translateY(0)';
            }}
        >
            {/* Top accent line */}
            <div
                className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: 'linear-gradient(90deg, transparent, #00E5FF55, transparent)' }}
            />

            <div className="p-5">
                {/* Header row */}
                <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex-1 min-w-0">
                        {/* Category + Date */}
                        <div className="flex items-center gap-2 mb-2">
                            <span
                                className="text-xs font-semibold px-2.5 py-0.5 rounded-full uppercase tracking-wider"
                                style={{
                                    color: '#00E5FF',
                                    background: 'rgba(0,229,255,0.10)',
                                    letterSpacing: '0.06em',
                                    fontSize: '10px',
                                }}
                            >
                                {q.quiz?.category}
                            </span>
                            <span
                                className="text-xs"
                                style={{ color: 'rgba(255,255,255,0.35)', }}
                            >
                                {formatDateTime(q.attemptedAt)}
                            </span>
                        </div>

                        {/* Title */}
                        <h3
                            className="font-semibold text-base leading-snug mb-2 truncate"
                            style={{ color: 'rgba(255,255,255,0.92)', }}
                            title={q.quiz?.title}
                        >
                            {q.quiz?.title}
                        </h3>

                        {/* Difficulty */}
                        <DifficultyBadge level={q.quiz?.difficulty} />
                    </div>

                    {/* Score ring */}
                    <ScoreRing percent={q.percentageScore} />
                </div>

                {/* Divider */}
                <div className="mb-4" style={{ height: 1, background: 'rgba(255,255,255,0.05)' }} />

                {/* Stats row */}
                <div className="grid grid-cols-3 gap-3">
                    <StatPill label="Correct" value={correct} color="#22d3a0" />
                    <StatPill label="Wrong" value={incorrect} color="#ef4444" />
                    <StatPill label="Total" value={total} color="rgba(255,255,255,0.5)" />
                </div>

                {/* Progress bar */}
                <div className="mt-4">
                    <div
                        className="h-1.5 rounded-full overflow-hidden"
                        style={{ background: 'rgba(255,255,255,0.06)' }}
                    >
                        <div
                            className="h-full rounded-full transition-all duration-1000"
                            style={{
                                width: `${q.percentageScore}%`,
                                background:
                                    q.percentageScore >= 80
                                        ? 'linear-gradient(90deg, #22d3a0, #00E5FF)'
                                        : q.percentageScore >= 50
                                            ? 'linear-gradient(90deg, #f59e0b, #f97316)'
                                            : 'linear-gradient(90deg, #ef4444, #f43f5e)',
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

function StatPill({ label, value, color }) {
    return (
        <div
            className="flex flex-col items-center justify-center rounded-xl py-2.5 px-2"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}
        >
            <span
                className="text-lg font-bold leading-none mb-1"
                style={{ color, }}
            >
                {value}
            </span>
            <span
                className="text-xs"
                style={{ color: 'rgba(255,255,255,0.35)', }}
            >
                {label}
            </span>
        </div>
    );
}

// ─── AchievementsList
function AchievementsList() {
    const { getAttemptedQuiz, attemptedQuiz, isLoading, errorOnAttempt } = useQuizStore();

    useEffect(() => {
        getAttemptedQuiz();
    }, []);

    if (isLoading) return <CardSkeleton />;
    if (errorOnAttempt)
        return <ErrorState title="Unable to load quizzes" message={errorOnAttempt} />;
    if (!Array.isArray(attemptedQuiz) || attemptedQuiz.length === 0)
        return <EmptyState type="attempt" />;

    return (
        <div className="space-y-5">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2
                        className="text-xl font-bold"
                        style={{ color: 'rgba(255,255,255,0.92)', }}
                    >
                        My Attempted Quizzes
                    </h2>
                    <p
                        className="text-sm mt-0.5"
                        style={{ color: 'rgba(255,255,255,0.40)', }}
                    >
                        {attemptedQuiz.length} quiz{attemptedQuiz.length !== 1 ? 'zes' : ''} completed
                    </p>
                </div>

                {/* Summary badge */}
                <div
                    className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-sm font-semibold"
                    style={{
                        background: 'rgba(0,229,255,0.08)',
                        border: '1px solid rgba(0,229,255,0.15)',
                        color: '#00E5FF',
                    }}
                >
                    {Math.round(
                        attemptedQuiz.reduce((acc, a) => acc + (a.percentageScore || 0), 0) /
                        attemptedQuiz.length
                    )}% avg
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {attemptedQuiz.map((item) => (
                    <QuizCard key={item._id} attempt={item} />
                ))}
            </div>
        </div>
    );
}

export default AchievementsList;