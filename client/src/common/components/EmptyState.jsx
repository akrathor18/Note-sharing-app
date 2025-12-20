import {
  FileText,
  HelpCircle,
  Activity,
  ClipboardList,
  Plus,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const EMPTY_STATE_CONFIG = {
  note: {
    icon: FileText,
    title: "No notes uploaded yet",
    description:
      "You haven’t uploaded any notes yet. Start sharing your knowledge with others.",
    actionLabel: "Upload Note",
    actionPath: "/notes",
  },
  quiz: {
    icon: HelpCircle,
    title: "No quizzes created yet",
    description:
      "You haven’t created any quizzes yet. Create one to test knowledge and help others learn.",
    actionLabel: "Create Quiz",
    actionPath: "/quizzes/createquiz",
  },
  activity: {
    icon: Activity,
    title: "No activity yet",
    description:
      "Your recent actions like note uploads, quiz attempts, and creations will appear here.",
    actionLabel: "Start Exploring",
    actionPath: "/dashboard",
  },
  attempt: {
    icon: ClipboardList,
    title: "No quizzes attempted yet",
    description:
      "You haven’t attempted any quizzes yet. Try one to test your understanding and track progress.",
    actionLabel: "Attempt a Quiz",
    actionPath: "/quizzes",
  },
};

export default function EmptyState({ type = "note" }) {
  const navigate = useNavigate();

  const config = EMPTY_STATE_CONFIG[type] || EMPTY_STATE_CONFIG.note;
  const Icon = config.icon;

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center bg-[#1A1A1A] border border-[#F5F5F5]/10 rounded-xl">
      <div className="mb-4 p-4 rounded-full bg-[#FF007F]/10">
        <Icon size={36} className="text-[#FF007F]" />
      </div>

      <h2 className="text-lg font-semibold mb-2">{config.title}</h2>

      <p className="text-sm text-[#F5F5F5]/60 max-w-md mb-6">
        {config.description}
      </p>

      {config.actionPath && (
        <button
          onClick={() => navigate(config.actionPath)}
          className="flex items-center gap-2 bg-[#FF007F] hover:bg-[#FF007F]/90 text-white px-5 py-2.5 rounded-lg transition"
        >
          <Plus size={18} />
          {config.actionLabel}
        </button>
      )}
    </div>
  );
}
