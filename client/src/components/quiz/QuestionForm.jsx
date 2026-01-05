import { Trash2, ChevronDown } from 'lucide-react';

export default function QuestionForm({
    question,
    questionIndex,
    onQuestionChange,
    onOptionChange,
    onCorrectAnswerChange,
    onRemoveQuestion,
    canBeRemoved,
    isExpanded,
    onToggle,
}) {



    return (
        <>
            <div
                onClick={onToggle}
                className="flex items-center justify-between cursor-pointer mb-4"
            >
                <h4 className="font-medium">
                    Question {questionIndex + 1}
                </h4>
                <div className="flex items-center gap-4">
                    {canBeRemoved && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onRemoveQuestion(question.id);
                            }}
                            className="p-1 rounded-full hover:bg-[#FF007F]/10 text-[#FF007F]"
                        >
                            <Trash2 size={16} />
                        </button>

                    )}
                    <ChevronDown
                        size={18}
                        className={`transition-transform ${isExpanded ? 'rotate-180' : ''
                            }`}

                    />
                </div>
            </div>
            {isExpanded && (
                <div className="space-y-4">
                    <div key={question.id} className="bg-[#0D0D0D] rounded-lg p-4 border border-[#F5F5F5]/5">
                        <div className="flex flex-wrap items-center justify-between mb-4">
                            <h4 className="font-medium">Question {questionIndex + 1}</h4>
                            {canBeRemoved && (
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onRemoveQuestion(question.id);
                                    }}
                                    className="p-1 rounded-full hover:bg-[#FF007F]/10 text-[#FF007F]"
                                >
                                    <Trash2 size={16} />
                                </button>

                            )}
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Question Text <span className="text-[#FF007F]">*</span>
                                </label>
                                <textarea
                                    value={question.text}
                                    onChange={(e) => onQuestionChange(question.id, 'text', e.target.value)}
                                    placeholder="Enter your question"
                                    className="w-full bg-[#1A1A1A] border border-[#F5F5F5]/10 rounded-lg py-2 px-3 focus:outline-none focus:border-[#FF007F] min-h-[60px]"
                                    required
                                ></textarea>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Answer Options</label>
                                <div className="space-y-2">
                                    {question.options.map((option) => (
                                        <div key={option.id} className="flex flex-wrap items-center gap-3">
                                            <input
                                                type="radio"
                                                name={`correct-${question.id}`}
                                                checked={question.correctAnswer === option.id}
                                                onChange={() => onCorrectAnswerChange(question.id, option.id)}
                                                className={`w-4 h-4 text-[#FF007F] bg-[#1A1A1A] border-[#F5F5F5]/20 focus:ring-[#FF007F]`}
                                            />
                                            <span className={`${question.correctAnswer === option.id ?"bg-[#00e5ff] text-[#1A1A1A]":""}
                                                w-6 h-6 rounded-full bg-[#1A1A1A] flex items-center justify-center text-xs font-medium`}>
                                                {option.id.toUpperCase()}
                                            </span>
                                            <input
                                                type="text"
                                                value={option.text}
                                                onChange={(e) =>
                                                    onOptionChange(question.id, option.id, e.target.value)
                                                }
                                                placeholder={`Option ${option.id.toUpperCase()}`}
                                                className="flex-1 bg-[#1A1A1A] border border-[#F5F5F5]/10 rounded-lg py-2 px-3 focus:outline-none focus:border-[#FF007F]"
                                                required
                                            />
                                        </div>
                                    ))}
                                </div>
                                <p className="text-xs text-[#F5F5F5]/60 mt-2">
                                    Select the correct answer by clicking the radio button
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}


        </>
    );
}
