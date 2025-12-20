import {React, useState,useEffect} from 'react';
import { Edit2 } from 'lucide-react';
import { useUserStore } from '../../store/userStore';
function AboutMe({editingBio, setEditingBio, }) {
    const { bio, updateBio, isUpdatingBio } = useUserStore();
    const [newBio, setNewBio] = useState();
     const handleBioEdit = () => {
        setEditingBio(true);
        setNewBio(bio);
    };

    const handleBioSave = async () => {
        try {
            const success = await updateBio(newBio);
            if (success){
                setEditingBio(false);
            }
        } catch (error) {
            toast.error("Failed to update bio");
        }
    };

    const handleBioCancel = () => {
        setNewBio(bio);
        setEditingBio(false);
    };

   
    return (
        <div className="bg-[#1A1A1A] rounded-xl p-5">
            <div className="flex justify-between items-start mb-4">
                <h2 className="text-lg font-bold">About Me</h2>
                {!editingBio ? (
                    <button
                        onClick={handleBioEdit}
                        className="text-[#00E5FF] hover:underline text-sm flex items-center gap-1"
                    >
                        <Edit2 size={14} />
                        Edit
                    </button>
                ) : null}
            </div>

            {editingBio ? (
                <div className="space-y-3">
                    <textarea
                        value={newBio}
                        onChange={(e) => setNewBio(e.target.value)}
                        className="w-full bg-[#0D0D0D] border border-[#F5F5F5]/10 rounded-lg py-2 px-3 focus:outline-none focus:border-[#FF007F] min-h-[100px]"
                    ></textarea>
                    <div className="flex justify-end gap-2">
                        <button
                            onClick={handleBioCancel}
                            className="px-3 py-1 rounded-lg border border-[#F5F5F5]/10 hover:bg-[#F5F5F5]/5 text-sm"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleBioSave}
                            disabled={newBio === bio || isUpdatingBio}
                            className={`px-3 py-1 rounded-lg text-white text-sm ${newBio === bio
                                    ? 'bg-gray-500 cursor-not-allowed'
                                    : 'bg-[#FF007F] hover:bg-[#FF007F]/90'
                                }`}
                        >
                            {isUpdatingBio ? 'Saving...' : 'Save'}
                        </button>
                    </div>
                </div>
            ) : (
                <p className="text-[#F5F5F5]/80">{bio}</p>
            )}
        </div>
    );
}

export default AboutMe; 