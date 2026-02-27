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
    const { previewNote, getPreviewNote, loadingPreview, errorPreview, viewsUpdate } = useNoteStore()

    useEffect(() => {
        if (!id) return
        const fetchPreview = async () => { await getPreviewNote(id) }
        fetchPreview()
    }, [id])

    useEffect(() => {
        if (!id) return;
        const trackView = async () => { await viewsUpdate(id) };
        trackView();
    }, [id]);

    const onBack = () => navigate((-1))

    const handleShare = async () => {
        const shareUrl = window.location.href;
        try {
            if (navigator.share) {
                await navigator.share({ title: previewNote.title, text: `Check out this note on StudyHub`, url: shareUrl });
            } else {
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
            <div className="flex flex-col items-center justify-center h-screen gap-3 text-white/40">
                <div className="w-8 h-8 rounded-full border-2 border-white/10 border-t-[#FF007F] animate-spin" />
                <span className="text-sm">Loading preview...</span>
            </div>
        )
    }

    const isPDF =
        previewNote.fileType === "pdf" ||
        previewNote.fileUrl?.toLowerCase().endsWith(".pdf");

    if (!!errorPreview) return <ErrorState title='Unable to load Preview' message={errorPreview} />;

    const docs = [
        { uri: previewNote.fileUrl, fileType: previewNote.fileType, fileName: previewNote.title },
    ];

    return (
        <div className="min-h-screen bg-[#0D0D0D] text-[#F5F5F5] flex flex-col">

            {/* Header */}
            <div className="bg-[#111111] border-b border-white/[0.06] px-4 py-3 flex items-center justify-between sticky top-0 z-10">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                    <button
                        onClick={onBack}
                        className="p-2 rounded-xl hover:bg-white/[0.06] text-white/60 hover:text-white transition-colors flex-shrink-0"
                        title="Back to notes"
                    >
                        <ArrowLeft size={18} />
                    </button>
                    <div className="min-w-0 capitalize">
                        <h1 className="text-base md:text-lg font-semibold truncate text-white/90">{previewNote.title}</h1>
                        <p className="text-xs text-white/40 truncate">{previewNote.subject}</p>
                    </div>
                </div>

                <div className="flex items-center gap-1 flex-shrink-0 ml-4">
                    <a href={previewNote.fileUrl} download>
                        <button className="px-3 py-2 rounded-xl hover:bg-white/[0.06] text-white/50 hover:text-white transition-colors hidden sm:flex items-center gap-2 text-sm">
                            <Download size={16} />
                            <span className="hidden md:inline">Download</span>
                        </button>
                    </a>
                    <button
                        onClick={handleShare}
                        className="px-3 py-2 rounded-xl hover:bg-white/[0.06] text-white/50 hover:text-white transition-colors hidden sm:flex items-center gap-2 text-sm"
                    >
                        <Share2 size={16} />
                        <span className="hidden md:inline">Share</span>
                    </button>
                </div>
            </div>

            {/* Note meta bar */}
            <div className="bg-[#111111] border-b border-white/[0.06] px-4 py-2.5 flex flex-wrap items-center gap-3 text-xs text-white/40">
                <span className="bg-[#FF007F]/10 text-[#FF007F] border border-[#FF007F]/20 px-2.5 py-1 rounded-full font-medium">
                    {previewNote.subject}
                </span>
                <span>{formatDate(previewNote.createdAt) || new Date().toLocaleDateString()}</span>
                <div className="ml-auto flex items-center gap-1.5">
                    <Eye size={13} className="text-white/30" />
                    <span>{previewNote.views || 0} views</span>
                </div>
            </div>

            {/* Scroll area */}
            <div className="flex-1 overflow-y-auto relative">
                <div className="p-4 md:p-6">
                    <div className="bg-[#111111] rounded-2xl border border-white/[0.06] overflow-hidden">
                        <div className="doc-viewer-wrapper h-[75vh]">
                            {isPDF ? (
                                <iframe
                                    src={previewNote.fileUrl}
                                    className="w-full h-full"
                                    title="PDF Preview"
                                />
                            ) : (
                                <DocViewer
                                    className="doc-viewer-wrapper"
                                    documents={docs}
                                    pluginRenderers={DocViewerRenderers}
                                    config={{ header: { disableHeader: false, disableFileName: false } }}
                                />
                            )}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="bg-[#111111] border-t border-white/[0.06] px-4 py-3 flex gap-2 sticky bottom-0">
                    <a href={previewNote.fileUrl} download>
                        <button className="px-4 py-2.5 bg-[#FF007F] hover:bg-[#FF007F]/90 text-white rounded-xl text-sm font-medium flex items-center justify-center gap-2 transition-colors">
                            <Download size={16} />
                            <span className="hidden sm:inline">Download Note</span>
                        </button>
                    </a>
                    <button
                        onClick={handleShare}
                        className="flex-1 sm:flex-none px-4 py-2.5 border border-white/[0.08] hover:border-white/[0.15] hover:bg-white/[0.04] rounded-xl text-sm text-white/60 hover:text-white flex items-center justify-center gap-2 transition-colors"
                    >
                        <Share2 size={16} />
                        <span className="hidden sm:inline">Share Note</span>
                    </button>
                </div>
            </div>
        </div>
    )
}