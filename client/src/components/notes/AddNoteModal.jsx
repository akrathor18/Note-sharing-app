import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { X, Trash2, Save, Image, Tag, Calendar, FileText, CircleAlert } from 'lucide-react';
import { subjects } from '../../config/data';
import { useNoteStore } from "../../store/noteStore";
import { toast } from 'react-toastify';
export default function AddNoteModal({ onClose, onNoteAdded }) {
    // States
    const [selectedFile, setSelectedFile] = useState(null);
    const { uploadNote, isUploading, errorOnUpload, } = useNoteStore();
    const [fileError, setFileError] = useState('');
    // Refs
    const fileInputRef = useRef(null);
    // Form
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    // Provide file validation
    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
    const ALLOWED_TYPES = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];

    const validateFile = (file) => {
        if (!ALLOWED_TYPES.includes(file.type)) {
            return 'Invalid file type. Only PDF, DOC, DOCX allowed.';
        }

        if (file.size > MAX_FILE_SIZE) {
            return 'File size exceeds 5 MB limit.';
        }

        return '';
    };

    // Handlers
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(e.target.files[0]);
        }


        const error = validateFile(file);

        if (error) {
            setSelectedFile(null);
            setFileError(error);
            e.target.value = null;
            return;
        }

        setFileError('');
        setSelectedFile(file);
    };

    const handleFileUpload = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();

        const file = e.dataTransfer.files[0];
        if (!file) return;
        const error = validateFile(file);

        if (error) {
            setSelectedFile(null);
            setFileError(error);
            return;
        }

        setFileError('');
        setSelectedFile(file);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };


    const onSubmit = async (data) => {
        console.log("Submitting note with data:", data);
        if (!selectedFile) {
            toast.error("Please upload a file");
            return;
        }

        await uploadNote(data, selectedFile, onNoteAdded, onClose);
    };


    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div className="bg-[#1A1A1A] rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between p-4 border-b border-[#F5F5F5]/10">
                    <h2 className="text-lg font-bold">Create New Note</h2>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-[#F5F5F5]/10">
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
                            {...register('title', { required: 'Title is required' })}
                            placeholder="Enter note title"
                            className="w-full bg-[#0D0D0D] border border-[#F5F5F5]/10 rounded-lg py-2 px-3 focus:outline-none focus:border-[#FF007F]"
                        />
                        {errors.title && (
                            <p className="text-xs text-red-500 mt-1">{errors.title.message}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="subject" className="block text-sm font-medium mb-1">
                            Subject <span className="text-[#FF007F]">*</span>
                        </label>
                        <select
                            id="subject"
                            name="subject"
                            value=''
                            {...register('subject', { required: 'Subject is required' })}
                            className="w-full bg-[#0D0D0D] capitalize border border-[#F5F5F5]/10 rounded-lg py-2 px-3 focus:outline-none focus:border-[#FF007F]"
                        >
                            <option value="" disabled>
                                Select subject
                            </option>

                            {subjects
                                .filter((s) => s.id !== 'all')
                                .map((subject) => (
                                    <option key={subject.id} value={subject.name}>
                                        {subject.name}
                                    </option>
                                ))}
                        </select>
                        {errors.subject && (
                            <p className="text-xs text-red-500 mt-1">{errors.subject.message}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="content" className="block text-sm font-medium mb-1">
                            Content <span className="text-[#FF007F]">*</span>
                        </label>
                        <textarea
                            id="content"
                            name="content"
                            {...register('content', { required: 'Content is required' })}
                            placeholder="Enter note content"
                            className="w-full bg-[#0D0D0D] border border-[#F5F5F5]/10 rounded-lg py-2 px-3 focus:outline-none focus:border-[#FF007F] min-h-[150px]"
                        ></textarea>
                        {errors.content && (
                            <p className="text-xs text-red-500 mt-1">{errors.content.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Attachments
                            <span className="text-[#FF007F]">*</span>
                        </label>

                        <div className="flex flex-wrap items-center gap-2">
                            <button
                                onClick={handleFileUpload}
                                type="button"
                                className="flex items-center gap-2 bg-[#1A1A1A] hover:bg-[#1A1A1A]/80 border border-[#F5F5F5]/10 px-3 py-2 rounded-lg"
                            >
                                <Image size={16} />
                                Upload File
                            </button>
                            <input
                                id="file"
                                type="file"
                                accept=".doc,.docx,.pdf"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                className="hidden"
                            />


                            <span className="text-xs text-[#F5F5F5]/60">
                                Supported formats: PDF, DOC, DOCX,
                            </span>

                            {selectedFile && !fileError && (
                                <div className="mt-3 flex items-center justify-between bg-[#0D0D0D] border border-[#F5F5F5]/10 rounded-lg px-3 py-2">
                                    <div className="flex items-center gap-2">
                                        <FileText size={16} className="text-[#00E5FF]" />
                                        <span className="text-sm truncate max-w-[200px]">
                                            {selectedFile.name}
                                        </span>
                                        <span className="text-xs text-[#F5F5F5]/40">
                                            ({(selectedFile.size / 1024).toFixed(1)} KB)
                                        </span>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() => {
                                            setSelectedFile(null);
                                            fileInputRef.current.value = null;
                                        }}
                                        className="flex flex-row items-center gap-1 text-[#FF007F] hover:text-[#FF007F]/80 text-sm"
                                    >
                                        <Trash2 size={16} />  Remove
                                    </button>
                                </div>
                            )}
                            {fileError && (
                                <div className="mt-3 flex items-center gap-2 text-sm text-red-400">
                                    <CircleAlert size={16} />
                                    {fileError}
                                </div>
                            )}

                            {/* // File Drag and Drop Area */}
                        </div>
                        {!selectedFile && (<div
                            onDrop={handleDrop}
                            onDragOver={handleDragOver}
                            onClick={() => fileInputRef.current.click()}
                            className="mt-2 border-2 border-dashed border-[#F5F5F5]/20 rounded-lg p-6 text-center cursor-pointer hover:border-[#FF007F] transition"
                        >
                            <p className="text-sm text-[#F5F5F5]/60">
                                Drag & drop a file here, or click to upload
                            </p>
                            <p className="text-xs text-[#F5F5F5]/40 mt-1">
                                PDF, DOC, DOCX (max 5 MB)
                            </p>
                        </div>)}



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
                    {errorOnUpload && (
                        <p className="text-xs text-red-500 mt-1">{errorOnUpload}</p>
                    )}
                    <div className="flex justify-end gap-3 p-4 border-t border-[#F5F5F5]/10">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 rounded-lg border border-[#F5F5F5]/10 hover:bg-[#F5F5F5]/5"
                        >
                            {isUploading ? 'Cancel Uploading' : 'Cancel'}
                        </button>
                        <button
                            type="submit"
                            disabled={isUploading}
                            className={`flex items-center gap-2 ${isUploading ? `bg-gray-500` : `bg-[#FF007F] hover:bg-[#FF007F]`}/90 text-white sm:px-4 sm:py-2 px-2 rounded-lg`}
                        >
                            <Save size={16} />
                            {isUploading ? 'Uploading...' : 'Save Note'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
