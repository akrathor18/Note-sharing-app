import { FileText, HelpCircle, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function EmptyState({ type = "note" }) {
    const navigate = useNavigate();

    const isNote = type === "note";

    return (
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center bg-[#1A1A1A] border border-[#F5F5F5]/10 rounded-xl">
            <div className="mb-4 p-4 rounded-full bg-[#FF007F]/10">
                {isNote ? (
                    <FileText size={36} className="text-[#FF007F]" />
                ) : (
                    <HelpCircle size={36} className="text-[#FF007F]" />
                )}
            </div>

            <h2 className="text-lg font-semibold mb-2">
                {isNote ? "No notes uploaded yet" : "No quizzes created yet"}
            </h2>

            <p className="text-sm text-[#F5F5F5]/60 max-w-md mb-6">
                {isNote
                    ? "You haven’t uploaded any notes yet. Start sharing your knowledge with others."
                    : "You haven’t created any quizzes yet. Create one to test knowledge and help others learn."}
            </p>

            <button
                onClick={() => navigate(isNote ? "/notes" : "/quizzes/createquiz")}
                className="flex items-center gap-2 bg-[#FF007F] hover:bg-[#FF007F]/90 text-white px-5 py-2.5 rounded-lg transition"
            >
                <Plus size={18} />
                {isNote ? "Upload Note" : "Create Quiz"}
            </button>
        </div>
    );
}