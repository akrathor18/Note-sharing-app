"use client"

import { useEffect, useState } from "react"
import { ArrowLeft, Download, Share2, MoreVertical, Eye } from "lucide-react"
import ErrorState from "../common/components/ErrorState";
import DocViewer, { DocViewerRenderers } from "react-doc-viewer";

import { useParams } from "react-router-dom";
import { useNoteStore } from "../store/noteStore";
import { formatDate } from "../utils/formatDate";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export default function previewNote() {
    const navigate = useNavigate()
    const { id } = useParams()
    const { previewNote, getPreviewNote, loadingPreview, errorPreview } = useNoteStore()

    useEffect(() => {
        if (!id) return

        const fetchPreview = async () => {
            await getPreviewNote(id)
        }

        fetchPreview()
    }, [id])


    const onBack = () => {
        navigate((-1))
    }

    const handleShare = async () => {
        const shareUrl = window.location.href;

        try {
            if (navigator.share) {
                await navigator.share({
                    title: previewNote.title,
                    text: `Check out this note on StudyHub`,
                    url: shareUrl,
                });
            } else {
                // ❌ Fallback: copy link
                await navigator.clipboard.writeText(shareUrl);
                toast.success("Link copied to clipboard!");
            }
        } catch (error) {
            console.error("Share failed:", error);
        }
    };


    const [isDropdownOpen, setIsDropdownOpen] = useState(false)

    if (loadingPreview) {
        return (
            <div className="flex items-center justify-center h-screen text-[#F5F5F5]/60">
                Loading preview...
            </div>
        )
    }
    const isPDF =
        previewNote.fileType === "pdf" ||
        previewNote.fileUrl?.toLowerCase().endsWith(".pdf");



    if (!!errorPreview) return <ErrorState title='Unable to load Preview' message={errorPreview} />;

    const sampleDoc = [
        {
            // uri: `data:text/plain;base64,${Buffer.from(note.content).toString("base64")}`,
            fileType: "txt",
        },
    ]

    const docs = [
        {
            uri: previewNote.fileUrl,
            fileType: previewNote.fileType, // optional but recommended
            fileName: previewNote.title,
        },
    ];

    return (
        <div className="min-h-screen bg-[#0D0D0D] text-[#F5F5F5] flex flex-col">
            {/* Header */}
            <div className="bg-[#1A1A1A] border-b border-[#F5F5F5]/10 p-4 flex items-center justify-between sticky top-0 z-10">
                <div className="flex items-center gap-4 flex-1 min-w-0">
                    <button
                        onClick={onBack}
                        className="p-2 rounded-lg hover:bg-[#F5F5F5]/10 transition-colors flex-shrink-0"
                        title="Back to notes"
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <div className="min-w-0 capitalize">
                        <h1 className="text-lg md:text-xl font-bold truncate">{previewNote.title}</h1>
                        <p className="text-sm text-[#F5F5F5]/60 truncate">{previewNote.subject}</p>
                    </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0 ml-4">
                    <a href={previewNote.fileUrl} download>

                        <button className="p-2 rounded-lg hover:bg-[#F5F5F5]/10 transition-colors hidden sm:flex items-center gap-2 text-sm">
                            <Download size={18} />
                            <span className="hidden md:inline">Download</span>
                        </button>
                    </a>
                    <button
                        onClick={handleShare}
                        className="p-2 rounded-lg hover:bg-[#F5F5F5]/10 transition-colors hidden sm:flex items-center gap-2 text-sm">
                        <Share2 size={18} />
                        <span className="hidden md:inline">Share</span>
                    </button>

                    {/* More Options */}
                    {false ? <div className="relative">
                        <button
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="p-2 rounded-lg hover:bg-[#F5F5F5]/10 transition-colors"
                        >
                            <MoreVertical size={18} />
                        </button>
                        {isDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-[#1A1A1A] rounded-lg shadow-lg border border-[#F5F5F5]/10 z-20">
                                <button className="w-full text-left px-4 py-2 hover:bg-[#F5F5F5]/5 flex items-center gap-2 text-sm">
                                    <Download size={16} />
                                    Download
                                </button>
                                <button className="w-full text-left px-4 py-2 hover:bg-[#F5F5F5]/5 flex items-center gap-2 text-sm">
                                    <Share2 size={16} />
                                    Share
                                </button>
                                <div className="border-t border-[#F5F5F5]/10 my-1"></div>
                                <button className="w-full text-left px-4 py-2 hover:bg-[#F5F5F5]/5 text-[#FF007F] text-sm">
                                    Report
                                </button>
                            </div>
                        )}
                    </div> : ''}
                </div>
            </div>

            {/* Note Info */}
            <div className="bg-[#1A1A1A] border-b border-[#F5F5F5]/10 px-4 py-3 flex flex-wrap items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                    <span className="bg-[#FF007F]/10 text-[#FF007F] px-3 py-1 rounded-full text-xs font-medium">
                        {previewNote.subject}
                    </span>
                </div>
                <div className="text-[#F5F5F5]/60 flex items-center gap-2">
                    {/* <span>{note.pages || "5-30"} pages</span> */}
                </div>
                <div className="text-[#F5F5F5]/60 flex items-center gap-2">
                    <span>{formatDate(previewNote.createdAt) || new Date().toLocaleDateString()}</span>
                </div>
                <div className="text-[#F5F5F5]/60 ml-auto">
                    <span>{previewNote.downloads || 0} downloads</span>
                </div>
            </div>

            {/* Scroll Area */}
            <div className="flex-1 overflow-y-auto relative">

                {/* Content Preview */}
                <div className="p-4 md:p-6">
                    <div className="bg-[#1A1A1A] rounded-lg p-6 md:p-8 border border-[#F5F5F5]/10">

                        {/* DOC VIEWER HEIGHT FIX */}
                        <div className="doc-viewer-wrapper h-[75vh]">
                            {isPDF ? (
                                <iframe
                                    src={previewNote.fileUrl}
                                    className="w-full h-full rounded-lg"
                                    title="PDF Preview"
                                />
                            ) : (
                                <DocViewer
                                    className="doc-viewer-wrapper"
                                    documents={docs}
                                    pluginRenderers={DocViewerRenderers}
                                    config={{
                                        header: {
                                            disableHeader: false,
                                            disableFileName: false,
                                        },
                                    }}
                                />
                            )}
                        </div>

                    </div>
                </div>

                {/* Footer (NOW STICKY WILL WORK) */}
                <div className="bg-[#1A1A1A] border-t border-[#F5F5F5]/10 px-4 py-3 flex gap-2 sticky bottom-0">
                    <a href={previewNote.fileUrl} download>
                        <button className="flex-1 sm:flex-none px-4 py-2 bg-[#FF007F] text-white rounded-lg flex items-center justify-center gap-2">
                            <Download size={18} />
                            <span className="hidden sm:inline">Download Note</span>
                        </button>
                    </a>
                    <button
                        onClick={handleShare}
                        className="flex-1 sm:flex-none px-4 py-2 border border-[#F5F5F5]/20 rounded-lg flex items-center justify-center gap-2">
                        <Share2 size={18} />
                        <span className="hidden sm:inline">Share Note</span>
                    </button>
                </div>

            </div>

        </div>
    )
}
