import { Plus } from 'lucide-react';
import QuestionForm from './QuestionForm';

export default function QuestionList({
    questions,
    expandedQuestionId,
    setExpandedQuestionId,
    onAddQuestion,
    onRemoveQuestion,
    onQuestionChange,
    onOptionChange,
    onCorrectAnswerChange,
}) {

    return (
        <div>
            <div className="flex flex-wrap items-center justify-between mb-4">
                <h3 className="text-lg font-bold">Questions</h3>
                <button
                    onClick={onAddQuestion}
                    className="flex items-center gap-2 bg-[#00E5FF] text-[#0D0D0D] px-4 py-2 rounded-lg hover:bg-[#00E5FF]/90 transition-colors"
                >
                    <Plus size={16} />
                    Add Question
                </button>
            </div>

            <div className="space-y-6">
                {questions.map((question, index) => (
                    <QuestionForm
                        key={question.id}
                        question={question}
                        questionIndex={index}
                        isExpanded={expandedQuestionId === question.id}
                        onToggle={() =>
                            setExpandedQuestionId(
                                expandedQuestionId === question.id ? null : question.id
                            )
                        }
                        canBeRemoved={questions.length > 1}
                        onRemoveQuestion={onRemoveQuestion}
                        onQuestionChange={onQuestionChange}
                        onOptionChange={onOptionChange}
                        onCorrectAnswerChange={onCorrectAnswerChange}
                    />
                ))}


            </div>
        </div>
    );
}
