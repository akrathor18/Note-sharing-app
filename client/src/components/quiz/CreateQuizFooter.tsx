import { Save } from 'lucide-react';

export default function CreateQuizFooter({ onCancel, onSave, isUploading }) {
    return (
        <div className="flex justify-end gap-3 p-6 border-t border-[#F5F5F5]/10">
            <button
                onClick={onCancel}
                className="px-6 py-2 rounded-lg border border-[#F5F5F5]/10 hover:bg-[#F5F5F5]/5 transition-colors"
            >
                Cancel
            </button>
            <button
                onClick={onSave}
                disabled={isUploading}
                className={`flex items-center gap-2 ${
                    !isUploading
                        ? 'bg-[#FF007F] hover:bg-[#FF007F]/90'
                        : 'bg-gray-700 cursor-not-allowed'
                } text-white px-6 py-2 rounded-lg transition-colors`}
            >
                <Save size={16} />
                {!isUploading ? 'Create Quiz' : 'Uploading...'}
            </button>
        </div>
    );
}
