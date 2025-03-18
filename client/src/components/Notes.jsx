"use client"

import { useState, useRef } from "react"
import { FileText, Download, Search, Filter, Plus, X, Save, Image, Tag, Calendar } from "lucide-react"

export default function Notes() {
  const [activeSubject, setActiveSubject] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddNoteModalOpen, setIsAddNoteModalOpen] = useState(false)
  const [newNote, setNewNote] = useState({
    title: "",
    subject: "Computer Science",
    subjectId: "cs",
    content: "",
  })
  const fileInputRef = useRef(null)

  // Sample data
  const subjects = [
    { id: "all", name: "All Subjects" },
    { id: "cs", name: "Computer Science" },
    { id: "math", name: "Mathematics" },
    { id: "physics", name: "Physics" },
    { id: "chemistry", name: "Chemistry" },
    { id: "biology", name: "Biology" },
  ]

  const [notes, setNotes] = useState([
    {
      id: 1,
      title: "Data Structures & Algorithms",
      subject: "Computer Science",
      subjectId: "cs",
      date: "Oct 15, 2023",
      pages: 24,
      downloads: 128,
      content: "This note covers basic data structures like arrays, linked lists, stacks, and queues.",
    },
    {
      id: 2,
      title: "Calculus II: Integration Techniques",
      subject: "Mathematics",
      subjectId: "math",
      date: "Sep 28, 2023",
      pages: 18,
      downloads: 95,
      content: "Learn about integration by parts, substitution, and partial fractions.",
    },
    {
      id: 3,
      title: "Quantum Mechanics Fundamentals",
      subject: "Physics",
      subjectId: "physics",
      date: "Nov 5, 2023",
      pages: 32,
      downloads: 76,
      content: "Introduction to quantum mechanics, wave functions, and Schrödinger's equation.",
    },
    {
      id: 4,
      title: "Organic Chemistry Reactions",
      subject: "Chemistry",
      subjectId: "chemistry",
      date: "Oct 22, 2023",
      pages: 15,
      downloads: 112,
      content: "Common organic chemistry reactions including substitution and elimination.",
    },
    {
      id: 5,
      title: "Cell Biology & Genetics",
      subject: "Biology",
      subjectId: "biology",
      date: "Nov 12, 2023",
      pages: 28,
      downloads: 64,
      content: "Cell structure, function, and basic principles of genetics and inheritance.",
    },
    {
      id: 6,
      title: "Database Systems",
      subject: "Computer Science",
      subjectId: "cs",
      date: "Sep 18, 2023",
      pages: 22,
      downloads: 143,
      content: "Relational database design, SQL queries, and normalization techniques.",
    },
  ])

  // Filter notes based on active subject and search term
  const filteredNotes = notes
    .filter((note) => activeSubject === "all" || note.subjectId === activeSubject)
    .filter(
      (note) =>
        searchTerm === "" ||
        note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.content.toLowerCase().includes(searchTerm.toLowerCase()),
    )

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleAddNoteClick = () => {
    setIsAddNoteModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsAddNoteModalOpen(false)
    setNewNote({
      title: "",
      subject: "Computer Science",
      subjectId: "cs",
      content: "",
    })
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewNote({
      ...newNote,
      [name]: value,
    })

    // Update subjectId when subject changes
    if (name === "subject") {
      const selectedSubject = subjects.find((s) => s.name === value)
      if (selectedSubject && selectedSubject.id !== "all") {
        setNewNote({
          ...newNote,
          subject: value,
          subjectId: selectedSubject.id,
        })
      }
    }
  }

  const handleFileUpload = () => {
    fileInputRef.current.click()
  }

  const handleSaveNote = () => {
    if (!newNote.title || !newNote.subject || !newNote.content) {
      alert("Please fill in all required fields")
      return
    }

    const currentDate = new Date()
    const formattedDate = currentDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })

    const newNoteObj = {
      id: notes.length + 1,
      title: newNote.title,
      subject: newNote.subject,
      subjectId: newNote.subjectId,
      date: formattedDate,
      pages: Math.floor(Math.random() * 20) + 5, // Random page count
      downloads: 0,
      content: newNote.content,
    }

    setNotes([newNoteObj, ...notes])
    handleCloseModal()
  }

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold mb-1">Notes</h1>
          <p className="text-[#F5F5F5]/60">Browse and download study materials</p>
        </div>

        <button
          onClick={handleAddNoteClick}
          className="flex items-center justify-center gap-2 bg-[#FF007F] hover:bg-[#FF007F]/90 text-white px-4 py-2 rounded-lg transition-colors w-full sm:w-auto"
        >
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
            value={searchTerm}
            onChange={handleSearchChange}
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
      {filteredNotes.length > 0 ? (
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
                <p className="text-xs text-[#F5F5F5]/70 mb-3 line-clamp-2">{note.content}</p>

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
      ) : (
        <div className="text-center py-12 bg-[#1A1A1A] rounded-xl">
          <FileText className="mx-auto mb-4 text-[#F5F5F5]/40" size={48} />
          <h3 className="text-lg font-medium mb-2">No notes found</h3>
          <p className="text-[#F5F5F5]/60">
            {searchTerm
              ? `We couldn't find any notes matching "${searchTerm}"`
              : "No notes available for this subject yet"}
          </p>
          <button
            onClick={handleAddNoteClick}
            className="mt-4 inline-flex items-center justify-center gap-2 bg-[#FF007F] hover:bg-[#FF007F]/90 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Plus size={18} />
            <span>Create a new note</span>
          </button>
        </div>
      )}

      {/* Add Note Modal */}
      {isAddNoteModalOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1A1A1A] rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-[#F5F5F5]/10">
              <h2 className="text-lg font-bold">Create New Note</h2>
              <button onClick={handleCloseModal} className="p-1 rounded-full hover:bg-[#F5F5F5]/10">
                <X size={20} />
              </button>
            </div>

            <div className="p-4 space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium mb-1">
                  Title <span className="text-[#FF007F]">*</span>
                </label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  value={newNote.title}
                  onChange={handleInputChange}
                  placeholder="Enter note title"
                  className="w-full bg-[#0D0D0D] border border-[#F5F5F5]/10 rounded-lg py-2 px-3 focus:outline-none focus:border-[#FF007F]"
                  required
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-1">
                  Subject <span className="text-[#FF007F]">*</span>
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={newNote.subject}
                  onChange={handleInputChange}
                  className="w-full bg-[#0D0D0D] border border-[#F5F5F5]/10 rounded-lg py-2 px-3 focus:outline-none focus:border-[#FF007F]"
                  required
                >
                  {subjects
                    .filter((s) => s.id !== "all")
                    .map((subject) => (
                      <option key={subject.id} value={subject.name}>
                        {subject.name}
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <label htmlFor="content" className="block text-sm font-medium mb-1">
                  Content <span className="text-[#FF007F]">*</span>
                </label>
                <textarea
                  id="content"
                  name="content"
                  value={newNote.content}
                  onChange={handleInputChange}
                  placeholder="Enter note content"
                  className="w-full bg-[#0D0D0D] border border-[#F5F5F5]/10 rounded-lg py-2 px-3 focus:outline-none focus:border-[#FF007F] min-h-[150px]"
                  required
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Attachments</label>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleFileUpload}
                    className="flex items-center gap-2 bg-[#0D0D0D] hover:bg-[#0D0D0D]/80 border border-[#F5F5F5]/10 px-4 py-2 rounded-lg"
                  >
                    <Image size={16} />
                    <span>Upload File</span>
                  </button>
                  <input type="file" ref={fileInputRef} className="hidden" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" />
                  <span className="text-xs text-[#F5F5F5]/60">Supported formats: PDF, DOC, DOCX, JPG, PNG</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 pt-2">
                <div className="flex items-center gap-2 text-sm text-[#F5F5F5]/60">
                  <Tag size={16} />
                  <span>Add tags to help others find your note</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-[#F5F5F5]/60">
                  <Calendar size={16} />
                  <span>Created: {new Date().toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 p-4 border-t border-[#F5F5F5]/10">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 rounded-lg border border-[#F5F5F5]/10 hover:bg-[#F5F5F5]/5"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveNote}
                className="flex items-center gap-2 bg-[#FF007F] hover:bg-[#FF007F]/90 text-white px-4 py-2 rounded-lg"
              >
                <Save size={16} />
                Save Note
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

