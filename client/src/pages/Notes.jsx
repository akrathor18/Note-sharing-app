import { useState, useRef, useEffect } from "react"
import { FileText, Download, Search, Filter, Plus, X, Save, Image, Tag, Calendar } from "lucide-react"
import { useForm } from "react-hook-form";
import API from "../config/axios";
import { toast } from "react-toastify";
export default function Notes() {
  const [activeSubject, setActiveSubject] = useState("All Subjects")
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddNoteModalOpen, setIsAddNoteModalOpen] = useState(false)
  const [newNote, setNewNote] = useState({
    title: "",
    subject: "Computer Science",
    subjectId: "cs",
    content: "",
  })
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null)
  const [isUploading, setIsUploading] = useState(false);
  const { register, handleSubmit, formState: { errors }, watch } = useForm();

  // Sample data
  const subjects = [
    { id: "all", name: "All Subjects" },
    { id: "cs", name: "Computer Science" },
    { id: "math", name: "Mathematics" },
    { id: "physics", name: "Physics" },
    { id: "chemistry", name: "Chemistry" },
    { id: "biology", name: "Biology" },
    { id: "CE", name: "civil engineering" },
    { id: "ME", name: "mechanical engineering" },
  ]

  const formatDate = (date) => {
    const currentDate = date ? new Date(date) : new Date(" ");

    const formattedDate = currentDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    return formattedDate;
  };


  const [notes, setNotes] = useState([])

  const getNotes = async () => {
    try {
      const response = await API.get("/notes/getnotes");
      setNotes(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {

    getNotes()
  }, [])


  // Filter notes based on active subject and search term
  const filteredNotes = notes
    .filter((note) => activeSubject === "All Subjects" || note.subject === activeSubject)
    .filter(
      (note) =>
        searchTerm === "" ||
        note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.description.toLowerCase().includes(searchTerm.toLowerCase()),
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
      description: "",
    })
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setNewNote((prevNote) => {
      let updatedNote = {
        ...prevNote,
        [name]: value,
      };

      if (name === "subject") {
        const selectedSubject = subjects.find((s) => s.name === value);
        if (selectedSubject && selectedSubject.id !== "all") {
          updatedNote.subjectId = selectedSubject.id;
        }
      }

      return updatedNote;
    });
  };


  const handleFileUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };


  const handleSaveNote = () => {
    if (!newNote.title || !newNote.subject || !newNote.description) {
      alert("Please fill in all required fields")
      return
    }


  }

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(e.target.files[0]);
    }
  };
  const onSubmit = async (data) => {
    try {
      setIsUploading(true);
      const currentDate = new Date();
      const formattedDate = formatDate(currentDate);

      const newNoteObj = {
        title: data.title,
        subject: data.subject,
        date: formattedDate,
        pages: Math.floor(Math.random() * 20) + 5,
        downloads: 0,
        content: data.content,
      };

      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("title", newNoteObj.title);
      formData.append("description", newNoteObj.content);
      formData.append("subject", newNoteObj.subject);

      const response = await API.post("/notes/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setIsAddNoteModalOpen(false)
      setNotes([newNoteObj, ...notes]);
      getNotes()
      toast.success("Note uploaded successfully")
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    } finally {
      setIsUploading(false); // Hide "Uploading..." after request finishes

    }
  };


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
      <div className="flex overflow-x-auto pb-2 [&::-webkit-scrollbar]:w-2
        [&::-webkit-scrollbar-track]:rounded-full
      [&::-webkit-scrollbar-track]:bg-none
        [&::-webkit-scrollbar-thumb]:rounded-full
      [&::-webkit-scrollbar-thumb]:bg-gray-500
      dark:[&::-webkit-scrollbar-track]:bg-neutral-700
      dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
        <div className="flex gap-2">
          {subjects.map((subject) => (
            <button
              key={subject.id}
              onClick={() => setActiveSubject(subject.name)}
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors 
                ${activeSubject === subject.name
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
              key={note._id}
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
                <p className="text-xs text-[#F5F5F5]/70 mb-3 line-clamp-2">{note.description}</p>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#F5F5F5]/60">{formatDate(note.createdAt)}</span>
                  <div className="flex items-center gap-1 text-xs text-[#F5F5F5]/60">
                    <Download size={14} />
                    {note.totalDownloads}
                  </div>
                </div>
                <a href={note.fileUrl} target="_blank">
                  <button className="w-full mt-3 py-2 rounded-lg bg-[#0D0D0D] hover:bg-[#00E5FF] hover:text-[#0D0D0D] transition-colors flex items-center justify-center gap-2 font-medium">
                    <Download size={16} />
                    Download
                  </button>
                </a>
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
      {!!isAddNoteModalOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1A1A1A] rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-[#F5F5F5]/10">
              <h2 className="text-lg font-bold">Create New Note</h2>
              <button onClick={handleCloseModal} className="p-1 rounded-full hover:bg-[#F5F5F5]/10">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium mb-1">
                  Title <span className="text-[#FF007F]">*</span>
                </label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  {...register("title", { required: "Title is required" })}
                  placeholder="Enter note title"
                  className="w-full bg-[#0D0D0D] border border-[#F5F5F5]/10 rounded-lg py-2 px-3 focus:outline-none focus:border-[#FF007F]"
                />
                {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title.message}</p>}
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-1">
                  Subject <span className="text-[#FF007F]">*</span>
                </label>
                <select
                  id="subject"
                  name="subject"
                  {...register("subject", { required: "Subject is required" })}
                  className="w-full bg-[#0D0D0D] border border-[#F5F5F5]/10 rounded-lg py-2 px-3 focus:outline-none focus:border-[#FF007F]"
                >
                  {subjects
                    .filter((s) => s.id !== "all")
                    .map((subject) => (
                      <option key={subject.id} value={subject.name}>
                        {subject.name}
                      </option>
                    ))}
                </select>
                {errors.subject && <p className="text-xs text-red-500 mt-1">{errors.subject.message}</p>}
              </div>

              <div>
                <label htmlFor="content" className="block text-sm font-medium mb-1">
                  Content <span className="text-[#FF007F]">*</span>
                </label>
                <textarea
                  id="content"
                  name="content"
                  {...register("content", { required: "Content is required" })}
                  placeholder="Enter note content"
                  className="w-full bg-[#0D0D0D] border border-[#F5F5F5]/10 rounded-lg py-2 px-3 focus:outline-none focus:border-[#FF007F] min-h-[150px]"
                ></textarea>
                {errors.content && <p className="text-xs text-red-500 mt-1">{errors.content.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Attachments</label>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleFileUpload}
                    type="button"
                    className="flex items-center gap-2 bg-[#1A1A1A] hover:bg-[#1A1A1A]/80 border border-[#F5F5F5]/10 px-3 py-2 rounded-lg"
                  >
                    <Image size={16} />
                    Upload File
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <span className="text-xs text-[#F5F5F5]/60">Supported formats: PDF, DOC, DOCX, JPG, PNG</span>
                  {errors.file && <p className="text-xs text-red-500 mt-1">{errors.file.message}</p>}
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

              <div className="flex justify-end gap-3 p-4 border-t border-[#F5F5F5]/10">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 rounded-lg border border-[#F5F5F5]/10 hover:bg-[#F5F5F5]/5"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUploading}
                  className={`flex items-center gap-2 ${isUploading ? `bg-gray-500` : `bg-[#FF007F] hover:bg-[#FF007F]`}/90 text-white px-4 py-2 rounded-lg`}
                >
                  <Save size={16} />
                  {isUploading ? "Uploading..." : "Save Note"}
                </button>
              </div>
            </form>


          </div>
        </div>
      )}
    </div>
  )
}

