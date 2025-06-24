import { Search, Filter } from "lucide-react";

export default function SearchAndFilter({ searchTerm, onSearchChange }) {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#F5F5F5]/40" size={18} />
        <input
          type="text"
          placeholder="Search notes by title, subject..."
          className="w-full bg-[#1A1A1A] border border-[#F5F5F5]/10 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:border-[#FF007F] transition-colors"
          value={searchTerm}
          onChange={onSearchChange}
        />
      </div>

      <div className="flex items-center gap-2 bg-[#1A1A1A] border border-[#F5F5F5]/10 rounded-lg px-3">
        <Filter size={18} className="text-[#F5F5F5]/40" />
        <select className="bg-transparent py-2 focus:outline-none w-full">
          <option>Most Recent</option>
          <option>Most Downloaded</option>
          <option>Alphabetical</option>
        </select>
      </div>
    </div>
  );
} 