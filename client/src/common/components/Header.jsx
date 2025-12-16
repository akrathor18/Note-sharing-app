import { Plus } from 'lucide-react';

export default function Header({ onAddClick, title, description }) {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
                <h1 className="text-xl md:text-2xl font-bold mb-1">{title}</h1>
                <p className="text-[#F5F5F5]/60">{description}</p>
            </div>
            <button
                onClick={onAddClick}
                className="flex items-center justify-center gap-2 bg-[#FF007F] hover:bg-[#FF007F]/90 text-white px-4 py-2 rounded-lg transition-colors w-full sm:w-auto"
            >
                <Plus size={18} />
                <span>Add Note</span>
            </button>
        </div>
    );
}
