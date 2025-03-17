"use client"

import { useState } from "react"
import { FileText, BrainCircuit, Search, Filter, Download, ChevronRight } from "lucide-react"

export default function SearchResults({ results }) {
  const [activeTab, setActiveTab] = useState("all") // all, notes, quizzes
  const [sortBy, setSortBy] = useState("relevance") // relevance, newest, oldest

  // Filter results based on active tab
  const filteredResults =
    activeTab === "all"
      ? { notes: results.notes, quizzes: results.quizzes }
      : activeTab === "notes"
        ? { notes: results.notes, quizzes: [] }
        : { notes: [], quizzes: results.quizzes }

  // Sort results based on sortBy
  const sortResults = (items) => {
    if (sortBy === "newest") {
      return [...items].sort((a, b) => new Date(b.date) - new Date(a.date))
    } else if (sortBy === "oldest") {
      return [...items].sort((a, b) => new Date(a.date) - new Date(b.date))
    }
    // Default: sort by relevance (as they come from the search)
    return items
  }

  const sortedResults = {
    notes: sortResults(filteredResults.notes),
    quizzes: sortResults(filteredResults.quizzes),
  }

  // Calculate total results
  const totalResults = results.notes.length + results.quizzes.length
  const totalFilteredResults = sortedResults.notes.length + sortedResults.quizzes.length

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-1">Search Results</h1>
        <p className="text-[#F5F5F5]/60">
          Found {totalResults} results for "{results.query}"
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex overflow-x-auto hide-scrollbar">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                activeTab === "all" ? "bg-[#FF007F] text-white" : "bg-[#1A1A1A] hover:bg-[#1A1A1A]/80 text-[#F5F5F5]"
              }`}
            >
              All Results ({totalResults})
            </button>
            <button
              onClick={() => setActiveTab("notes")}
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                activeTab === "notes" ? "bg-[#FF007F] text-white" : "bg-[#1A1A1A] hover:bg-[#1A1A1A]/80 text-[#F5F5F5]"
              }`}
            >
              Notes ({results.notes.length})
            </button>
            <button
              onClick={() => setActiveTab("quizzes")}
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                activeTab === "quizzes"
                  ? "bg-[#FF007F] text-white"
                  : "bg-[#1A1A1A] hover:bg-[#1A1A1A]/80 text-[#F5F5F5]"
              }`}
            >
              Quizzes ({results.quizzes.length})
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-[#1A1A1A] border border-[#F5F5F5]/10 rounded-lg px-3 w-full sm:w-auto">
          <Filter size={18} className="text-[#F5F5F5]/40" />
          <select
            className="bg-transparent py-2 focus:outline-none w-full"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="relevance">Sort by: Relevance</option>
            <option value="newest">Sort by: Newest</option>
            <option value="oldest">Sort by: Oldest</option>
          </select>
        </div>
      </div>

      {/* Results */}
      <div className="space-y-6">
        {/* Notes Results */}
        {(activeTab === "all" || activeTab === "notes") && sortedResults.notes.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-bold">Notes</h2>
              {activeTab === "all" && sortedResults.notes.length > 3 && (
                <button className="text-[#00E5FF] text-sm flex items-center hover:underline">
                  View All <ChevronRight size={16} />
                </button>
              )}
            </div>

            <div className="space-y-3">
              {(activeTab === "all" ? sortedResults.notes.slice(0, 3) : sortedResults.notes).map((note) => (
                <div
                  key={note.id}
                  className="flex items-center gap-3 p-4 rounded-lg bg-[#1A1A1A] hover:bg-[#1A1A1A]/80 transition-colors"
                >
                  <div className="w-12 h-12 rounded-lg bg-[#FF007F]/10 flex items-center justify-center flex-shrink-0">
                    <FileText size={24} className="text-[#FF007F]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium truncate">{note.title}</h3>
                      <span className="text-xs bg-[#FF007F]/10 text-[#FF007F] px-2 py-0.5 rounded-full whitespace-nowrap">
                        {note.subject}
                      </span>
                    </div>
                    <p className="text-sm text-[#F5F5F5]/60 line-clamp-1">{note.content}</p>
                  </div>
                  <button className="p-2 rounded-full hover:bg-[#0D0D0D] transition-colors flex-shrink-0">
                    <Download size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quizzes Results */}
        {(activeTab === "all" || activeTab === "quizzes") && sortedResults.quizzes.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-bold">Quizzes</h2>
              {activeTab === "all" && sortedResults.quizzes.length > 3 && (
                <button className="text-[#00E5FF] text-sm flex items-center hover:underline">
                  View All <ChevronRight size={16} />
                </button>
              )}
            </div>

            <div className="space-y-3">
              {(activeTab === "all" ? sortedResults.quizzes.slice(0, 3) : sortedResults.quizzes).map((quiz) => (
                <div
                  key={quiz.id}
                  className="flex items-center gap-3 p-4 rounded-lg bg-[#1A1A1A] hover:bg-[#1A1A1A]/80 transition-colors"
                >
                  <div className="w-12 h-12 rounded-lg bg-[#00E5FF]/10 flex items-center justify-center flex-shrink-0">
                    <BrainCircuit size={24} className="text-[#00E5FF]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium truncate">{quiz.title}</h3>
                      <span className="text-xs bg-[#00E5FF]/10 text-[#00E5FF] px-2 py-0.5 rounded-full whitespace-nowrap">
                        {quiz.subject}
                      </span>
                    </div>
                    <p className="text-sm text-[#F5F5F5]/60 line-clamp-1">{quiz.description}</p>
                  </div>
                  <button className="px-3 py-1.5 rounded-lg bg-[#00E5FF] text-[#0D0D0D] text-sm font-medium hover:bg-[#00E5FF]/90 transition-colors flex-shrink-0">
                    Start
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* No Results */}
        {totalFilteredResults === 0 && (
          <div className="text-center py-12">
            <Search className="mx-auto mb-4 text-[#F5F5F5]/40" size={48} />
            <h3 className="text-lg font-medium mb-2">No results found</h3>
            <p className="text-[#F5F5F5]/60">We couldn't find any matches for "{results.query}"</p>
            <p className="text-[#F5F5F5]/60 mt-1">Try different keywords or check your spelling</p>
          </div>
        )}
      </div>
    </div>
  )
}

