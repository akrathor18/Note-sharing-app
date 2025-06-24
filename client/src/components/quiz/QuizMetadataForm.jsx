import { Clock, AlertCircle } from "lucide-react";

const difficulties = ["Easy", "Medium", "Hard"];

export default function QuizMetadataForm({ quizData, onInputChange }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Quiz Title */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium mb-2">
          Quiz Title <span className="text-[#FF007F]">*</span>
        </label>
        <input
          id="title"
          name="title"
          type="text"
          value={quizData.title}
          onChange={onInputChange}
          placeholder="Enter quiz title"
          className="w-full bg-[#0D0D0D] border border-[#F5F5F5]/10 rounded-lg py-2 px-3 focus:outline-none focus:border-[#FF007F]"
          required
        />
      </div>

      {/* Subject */}
      <div>
        <label
          htmlFor="category"
          className="block text-sm font-medium mb-2"
        >
          Subject <span className="text-[#FF007F]">*</span>
        </label>
        <input
          id="category"
          name="category"
          value={quizData.category}
          onChange={onInputChange}
          className="w-full bg-[#0D0D0D] border border-[#F5F5F5]/10 rounded-lg py-2 px-3 focus:outline-none focus:border-[#FF007F]"
          required
        ></input>
      </div>

      {/* Time Limit */}
      <div>
        <label
          htmlFor="timeLimit"
          className="block text-sm font-medium mb-2"
        >
          Time Limit (minutes)
        </label>
        <div className="relative">
          <Clock
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#F5F5F5]/40"
            size={18}
          />
          <input
            id="timeLimit"
            name="timeLimit"
            type="number"
            min="5"
            max="180"
            value={quizData.timeLimit}
            onChange={onInputChange}
            className="w-full bg-[#0D0D0D] border border-[#F5F5F5]/10 rounded-lg py-2 pl-10 pr-3 focus:outline-none focus:border-[#FF007F]"
          />
        </div>
      </div>

      {/* Difficulty Level */}
      <div>
        <label
          htmlFor="difficulty"
          className="block text-sm font-medium mb-2"
        >
          Difficulty Level
        </label>
        <div className="relative">
          <AlertCircle
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#F5F5F5]/40"
            size={18}
          />
          <select
            id="difficulty"
            name="difficulty"
            value={quizData.difficulty}
            onChange={onInputChange}
            className="w-full bg-[#0D0D0D] border border-[#F5F5F5]/10 rounded-lg py-2 pl-10 pr-3 focus:outline-none focus:border-[#FF007F]"
          >
            {difficulties.map((difficulty) => (
              <option key={difficulty} value={difficulty}>
                {difficulty}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
} 