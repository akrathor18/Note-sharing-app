import React from 'react';
import { Camera, Edit2 } from 'lucide-react';

function ProfileHeader({
    userDetails,
    isEditing,
    handleInputChange,
    handleSave,
    handleCancel,
    setIsEditing,
    handleFileUpload,
    fileInputRef,
    handleFileChange,
}) {
    return (
        <div className="bg-[#1A1A1A] rounded-xl p-6 mb-6">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                {/* Profile Picture */}
                <div className="relative group">
                    <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-[#00E5FF] flex items-center justify-center text-[#0D0D0D] text-4xl font-bold overflow-hidden">
                        {userDetails.name.toUpperCase().charAt(0)}
                    </div>
                    <button
                        onClick={handleFileUpload}
                        className="absolute bottom-0 right-0 bg-[#FF007F] text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                        <Camera size={16} />
                    </button>
                    <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                </div>

                {/* Profile Info */}
                <div className="flex-1 text-center md:text-left">
                    {isEditing ? (
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm text-[#F5F5F5]/60 mb-1">Name</label>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    value={userDetails.name}
                                    onChange={handleInputChange}
                                    className="w-full bg-[#0D0D0D] border border-[#F5F5F5]/10 rounded-lg py-2 px-3 focus:outline-none focus:border-[#FF007F]"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm text-[#F5F5F5]/60 mb-1">Email</label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={userDetails.email}
                                    onChange={handleInputChange}
                                    className="w-full bg-[#0D0D0D] border border-[#F5F5F5]/10 rounded-lg py-2 px-3 focus:outline-none focus:border-[#FF007F]"
                                />
                            </div>
                            <div>
                                <label htmlFor="role" className="block text-sm text-[#F5F5F5]/60 mb-1">Role</label>
                                <input
                                    id="role"
                                    name="role"
                                    type="text"
                                    value={userDetails.role}
                                    onChange={handleInputChange}
                                    className="w-full bg-[#0D0D0D] border border-[#F5F5F5]/10 rounded-lg py-2 px-3 focus:outline-none focus:border-[#FF007F]"
                                />
                            </div>
                            <div className="flex gap-2 justify-center md:justify-start">
                                <button
                                    onClick={handleSave}
                                    className="flex items-center gap-1 bg-[#FF007F] text-white px-4 py-2 rounded-lg"
                                >
                                    Save
                                </button>
                                <button
                                    onClick={handleCancel}
                                    className="flex items-center gap-1 bg-[#1A1A1A] border border-[#F5F5F5]/10 px-4 py-2 rounded-lg"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="flex justify-between items-start">
                                <div>
                                    <h1 className="text-2xl font-bold">{userDetails.name}</h1>
                                    <p className="text-[#F5F5F5]/60">{userDetails.role}</p>
                                </div>
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="flex items-center gap-1 bg-[#1A1A1A] border border-[#F5F5F5]/10 px-3 py-1 rounded-lg hover:bg-[#F5F5F5]/5"
                                >
                                    <Edit2 size={16} />
                                    Edit
                                </button>
                            </div>
                            <div className="mt-4 space-y-2">
                                <div className="flex items-center gap-2 text-sm">
                                    <span>{userDetails.email}</span>
                                </div>
                                {/* Add more info if needed */}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ProfileHeader; 