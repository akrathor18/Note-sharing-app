import { subjects } from '../../config/data';

export default function SubjectTabs({ activeSubject, onSubjectClick }) {
    return (
        <div
            className="flex overflow-x-auto pb-2 [&::-webkit-scrollbar]:w-2
        [&::-webkit-scrollbar-track]:rounded-full
      [&::-webkit-scrollbar-track]:bg-none
        [&::-webkit-scrollbar-thumb]:rounded-full
      [&::-webkit-scrollbar-thumb]:bg-gray-500
      dark:[&::-webkit-scrollbar-track]:bg-neutral-700
      dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
        >
            <div className="flex gap-2">
                {subjects.map((subject) => (
                    <button
                        key={subject.id}
                        onClick={() => onSubjectClick(subject.name)}
                        className={`capitalize px-4 py-2 rounded-lg whitespace-nowrap transition-colors 
              ${activeSubject === subject.name
                                ? 'bg-[#FF007F] text-white'
                                : 'bg-[#1A1A1A] hover:bg-[#1A1A1A]/80 text-[#F5F5F5]'
                            }`}
                    >
                        {subject.name}
                    </button>
                ))}
            </div>
        </div>
    );
}
