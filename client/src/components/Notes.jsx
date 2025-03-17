"use client"

import { useState } from "react"
import { FileText, Download, Search, Filter, Plus } from "lucide-react"

export default function Notes() {
  const [activeSubject, setActiveSubject] = useState("all")

  // Sample data
  const subjects = [
    { id: "all", name: "All Subjects" },
    { id: "cs", name: "Computer Science" },
    { id: "math", name: "Mathematics" },
    { id: "physics", name: "Physics" },
    { id: "chemistry", name: "Chemistry" },
    { id: "biology", name: "Biology" },
  ]

  const notes = [
    {
      id: 1,
      title: "Data Structures & Algorithms",
      subject: "Computer Science",
      subjectId: "cs",
      date: "Oct 15, 2023",
      pages: 24,
      downloads: 128,
    },
    {
      id: 2,
      title: "Calculus II: Integration Techniques",
      subject: "Mathematics",
      subjectId: "math",
      date: "Sep 28, 2023",
      pages: 18,
      downloads: 95,
    },
    {
      id: 3,
      title: "Quantum Mechanics Fundamentals",
      subject: "Physics",
      subjectId: "physics",
      date: "Nov 5, 2023",
      pages: 32,
      downloads: 76,
    },
    {
      id: 4,
      title: "Organic Chemistry Reactions",
      subject: "Chemistry",
      subjectId: "chemistry",
      date: "Oct 22, 2023",
      pages: 15,
      downloads: 112,
    },
    {
      id: 5,
      title: "Cell Biology & Genetics",
      subject: "Biology",
      subjectId: "biology",
      date: "Nov 12, 2023",
      pages: 28,
      downloads: 64,
    },
    {
      id: 6,
      title: "Database Systems",
      subject: "Computer Science",
      subjectId: "cs",
      date: "Sep 18, 2023",
      pages: 22,
      downloads: 143,
    },
    {
      id: 7,
      title: "Organic Chemistry Reactions",
      subject: "Chemistry",
      subjectId: "chemistry",
      date: "Oct 22, 2023",
      pages: 15,
      downloads: 112,
    },
    {
      id: 8,
      title: "Cell Biology & Genetics",
      subject: "Biology",
      subjectId: "biology",
      date: "Nov 12, 2023",
      pages: 28,
      downloads: 64,
    },
    {
      id: 9,
      title: "Database Systems",
      subject: "Computer Science",
      subjectId: "cs",
      date: "Sep 18, 2023",
      pages: 22,
      downloads: 143,
    },
  ]

  // Filter notes based on active subject
  const filteredNotes = activeSubject === "all" ? notes : notes.filter((note) => note.subjectId === activeSubject)

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold mb-1">Notes</h1>
          <p className="text-[#F5F5F5]/60">Browse and download study materials</p>
        </div>

        <button className="flex items-center justify-center gap-2 bg-[#FF007F] hover:bg-[#FF007F]/90 text-white px-4 py-2 rounded-lg transition-colors w-full sm:w-auto">
          <Plus size={18} />
          <span>Add Note</span>
        </button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#F5F5F5]/40" size={18} />
          <input
            type="text"
            placeholder="Search notes by title, subject..."
            className="w-full bg-[#1A1A1A] border border-[#F5F5F5]/10 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:border-[#FF007F] transition-colors"
          />
        </div>

        <div className="flex items-center gap-2 bg-[#1A1A1A] border border-[#F5F5F5]/10 rounded-lg px-3">
          <Filter size={18} className="text-[#F5F5F5]/40" />
          <select className="bg-[#1A1A1A] text-white py-2 focus:outline-none w-full">
            <option>Most Recent</option>
            <option>Most Downloaded</option>
            <option>Alphabetical</option>
          </select>
        </div>
      </div>

      {/* Subject Tabs */}
      <div className="flex overflow-x-auto pb-2 hide-scrollbar">
        <div className="flex gap-2">
          {subjects.map((subject) => (
            <button
              key={subject.id}
              onClick={() => setActiveSubject(subject.id)}
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                activeSubject === subject.id
                  ? "bg-[#FF007F] text-white"
                  : "bg-[#1A1A1A] hover:bg-[#1A1A1A]/80 text-[#F5F5F5]"
              }`}
            >
              {subject.name}
            </button>
          ))}
        </div>
      </div>

      {/* Notes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredNotes.map((note) => (
          <div
            key={note.id}
            className="bg-[#1A1A1A] rounded-xl overflow-hidden border border-[#F5F5F5]/5 hover:border-[#F5F5F5]/20 transition-all duration-300 group"
          >
            <div className="h-32 bg-gradient-to-r from-[#FF007F]/20 to-[#00E5FF]/20 flex items-center justify-center">
              <FileText size={48} className="text-[#F5F5F5]/80" />
            </div>

            <div className="p-4">
              <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                <span className="text-xs bg-[#FF007F]/10 text-[#FF007F] px-2 py-1 rounded-full">{note.subject}</span>
                <span className="text-xs text-[#F5F5F5]/60">{note.pages} pages</span>
              </div>

              <h3 className="font-medium mb-2 line-clamp-2">{note.title}</h3>

              <div className="flex items-center justify-between">
                <span className="text-xs text-[#F5F5F5]/60">{note.date}</span>
                <div className="flex items-center gap-1 text-xs text-[#F5F5F5]/60">
                  <Download size={14} />
                  {note.downloads}
                </div>
              </div>

              <button className="w-full mt-3 py-2 rounded-lg bg-[#0D0D0D] hover:bg-[#00E5FF] hover:text-[#0D0D0D] transition-colors flex items-center justify-center gap-2 font-medium">
                <Download size={16} />
                Download
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

