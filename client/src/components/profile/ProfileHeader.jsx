import React from 'react';
import {
  Mail,
  Calendar,
  Edit2,
  X,
  Plus,
  Trash2,
  Camera,
  Github,
  Twitter,
  Linkedin,
  Globe,
  Instagram,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { formatDate } from '../../utils/formatDate';
function ProfileHeader({
  user,
  isEditing,
  handleInputChange,
  handleSave,
  handleCancel,
  setIsEditing,
  handleFileUpload,
  fileInputRef,
  handleFileChange,
}) {

  const [editedUser, setEditedUser] = useState()
  const [previewImage, setPreviewImage] = useState(user?.profilePic || "");
  const User = {
    name: "",
    email: "",
    role: "",
    joinDate: "",
    bio: "Computer Science student passionate about learning and sharing knowledge. Interested in data structures, algorithms, and web development.",
    stats: {
      notesCreated: 0,
      notesViewed: 0,
      quizzesTaken: 0,
      quizzesPassed: 0,
      studyHours: 0,
    },
    profilePic: "",
    socialLinks: [
      { label: "GitHub", url: "", icon: "github" },
      { label: "Twitter", url: "", icon: "twitter" },
      { label: "LinkedIn", url: "", icon: "linkedin" },
      { label: "Website", url: "", icon: "globe" },
      { label: "Instagram", url: "", icon: "instagram" },
    ],
  }

  useEffect(() => {
    if (user) {
      setEditedUser({
        ...user,
        bio: user.bio || "",
        links: user.links || [],
      });
      setPreviewImage(user.profilePic || "");
    }
  }, [user]);


  const handleLocalFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file");
      return;
    }

    const maxSize = 2.5 * 1024 * 1024;
    if (file.size > maxSize) {
      alert("Please upload an image smaller than 2.5MB");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result;
      setPreviewImage(dataUrl);
      setEditedUser((prev) => ({
        ...prev,
        profilePic: dataUrl,  // 👈 use profilePic, same as backend
      }));
    };
    reader.readAsDataURL(file);
  };


  const handleSocialLinkChange = (index, field, value) => {
    const updatedLinks = [...editedUser.socialLinks]
    updatedLinks[index] = { ...updatedLinks[index], [field]: value }
    setEditedUser({ ...editedUser, socialLinks: updatedLinks })
  }

  const handleAddSocialLink = () => {
    setEditedUser({
      ...editedUser,
      socialLinks: [...editedUser.links, { label: "", url: "", icon: "globe" }],
    })
  }

  const handleRemoveSocialLink = (index) => {
    setEditedUser({
      ...editedUser,
      socialLinks: editedUser.socialLinks.filter((_, i) => i !== index),
    })
  }

  const handleSaveProfilePicture = () => {
    setUser((prev) => ({ ...prev, profilePicture: editedUser.profilePicture }))
  }

  const handleSaveSocialLinks = () => {
    // setUser((prev) => ({ ...prev, socialLinks: editedUser.socialLinks }))
    console.log(editedUser.socialLinks)
    setIsEditing(false)
  }
  return (

    <div className="bg-[#1A1A1A] rounded-xl p-6 mb-6">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        {/* Profile Picture Section */}
        <div className="relative group">
          {!isEditing ? 
          (<div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-[#00E5FF] flex items-center justify-center text-[#0D0D0D] text-4xl font-bold overflow-hidden">
            {editedUser?.profilePicture || user.profilePic ? (
              <img
                src={editedUser?.profilePicture || user.profilePic}
                alt={`${user.name}'s profile`}
                className="w-full h-full object-cover"
              />
            ) : (
              user?.name?.charAt(0)?.toUpperCase() || "U"
            )}
          </div>) : ("")}
        </div>

        {/* Profile Info */}
        <div className="flex-1 w-full">
          {isEditing ? (
            <div className="space-y-4 md:space-y-6 w-full">
              <div className="bg-[#0D0D0D] border border-[#F5F5F5]/10 rounded-lg p-4 md:p-6">
                <h3 className="text-sm font-semibold text-[#F5F5F5] mb-4">Profile Picture</h3>
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <div className="relative">
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-[#00E5FF] flex items-center justify-center text-white text-2xl font-bold overflow-hidden flex-shrink-0">
                      {editedUser.profilePic || user.profilePic ? (
                        <img
                          src={previewImage}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        user?.name?.charAt(0)?.toUpperCase() || "U"
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 w-full sm:w-auto">
                    <button
                      onClick={handleFileUpload}
                      className="w-full sm:w-auto px-4 py-2 bg-[#FF007F] text-white text-sm font-medium rounded-lg hover:bg-[#FF007F]/90 transition flex items-center justify-center gap-2"
                    >
                      <Camera size={16} />
                      Upload Picture
                    </button>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleLocalFileChange}
                      accept="image/*"
                      className="hidden"
                    />
                    {editedUser.profilePicture && (
                      <button
                        onClick={handleRemoveProfilePicture}
                        className="w-full sm:w-auto px-4 py-2 bg-[#1A1A1A] text-[#F5F5F5] text-sm font-medium rounded-lg border border-[#F5F5F5]/10 hover:bg-[#F5F5F5]/10 transition flex items-center justify-center gap-2"
                      >
                        <X size={16} />
                        Remove
                      </button>
                    )}
                  </div>
                </div>
                <div className="mt-4 flex flex-col sm:flex-row gap-2">
                  <button
                    onClick={handleSaveProfilePicture}
                    className="flex-1 px-4 py-2 bg-[#00E5FF] text-[#0D0D0D] text-sm font-medium rounded-lg hover:bg-[#00E5FF]/90 transition"
                  >
                    Save Picture
                  </button>
                  <button
                    onClick={handleCancel}
                    className="flex-1 px-4 py-2 bg-[#1A1A1A] text-[#F5F5F5] text-sm font-medium rounded-lg border border-[#F5F5F5]/10 hover:bg-[#F5F5F5]/10 transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>

              <div className="bg-[#0D0D0D] border border-[#F5F5F5]/10 rounded-lg p-4 md:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                  <h3 className="text-sm font-semibold text-[#F5F5F5]">Social Links</h3>
                  <button
                    onClick={handleAddSocialLink}
                    className="w-full sm:w-auto text-xs flex items-center justify-center gap-1 px-3 py-2 text-[#FF007F] hover:text-[#FF007F]/80 border border-[#FF007F]/20 rounded-lg hover:bg-[#FF007F]/5 transition"
                  >
                    <Plus size={14} />
                    Add Link
                  </button>
                </div>
                <div className="space-y-3 max-h-80 overflow-y-auto">
                  {user.links?.map((link, index) => (
                    <div key={index} className="space-y-2 p-3 bg-[#1A1A1A] rounded-lg border border-[#F5F5F5]/5">
                      <div>
                        <label className="block text-xs text-[#F5F5F5]/60 mb-1">Label</label>
                        <input
                          type="text"
                          value={link.label}
                          onChange={(e) => handleSocialLinkChange(index, "label", e.target.value)}
                          placeholder="e.g., GitHub"
                          className="w-full bg-[#0D0D0D] border border-[#F5F5F5]/10 rounded-lg py-2 px-3 text-sm focus:outline-none focus:border-[#FF007F]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-[#F5F5F5]/60 mb-1">URL</label>
                        <div className="flex flex-col sm:flex-row gap-2">
                          <input
                            type="url"
                            value={link.url}
                            onChange={(e) => handleSocialLinkChange(index, "url", e.target.value)}
                            placeholder="https://example.com"
                            className="flex-1 bg-[#0D0D0D] border border-[#F5F5F5]/10 rounded-lg py-2 px-3 text-sm focus:outline-none focus:border-[#FF007F]"
                          />
                          <button
                            onClick={() => handleRemoveSocialLink(index)}
                            className="w-full sm:w-auto px-3 py-2 rounded-lg bg-[#1A1A1A] border border-[#F5F5F5]/10 hover:bg-[#F5F5F5]/10 text-[#FF007F] transition flex items-center justify-center gap-1"
                            title="Remove"
                          >
                            <Trash2 size={16} />
                            <span className="sm:hidden text-xs">Remove</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex flex-col sm:flex-row gap-2">
                  <button
                    onClick={handleSaveSocialLinks}
                    className="flex-1 px-4 py-2 bg-[#00E5FF] text-[#0D0D0D] text-sm font-medium rounded-lg hover:bg-[#00E5FF]/90 transition"
                  >
                    Save Links
                  </button>
                  <button
                    onClick={handleCancel}
                    className="flex-1 px-4 py-2 bg-[#1A1A1A] text-[#F5F5F5] text-sm font-medium rounded-lg border border-[#F5F5F5]/10 hover:bg-[#F5F5F5]/10 transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-start w-full">
                <div>
                  <h1 className="text-2xl font-bold">{user.name || "User"}</h1>
                  <p className="text-[#F5F5F5]/60">{user.role?.role_name}</p>
                </div>
                <button
                  onClick={() => {
                    setEditedUser({
                      ...user,
                      bio: user.bio || User.bio,
                      socialLinks: user.socialLinks || User.socialLinks,
                    })
                    setIsEditing(true)
                  }}
                  className="flex items-center gap-1 bg-[#1A1A1A] border border-[#F5F5F5]/10 px-3 py-1 rounded-lg hover:bg-[#F5F5F5]/5"
                >
                  <Edit2 size={16} />
                  Edit Profile
                </button>
              </div>

              <div className="mt-4 space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Mail size={16} className="text-[#F5F5F5]/60" />
                  <span>{user.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar size={16} className="text-[#F5F5F5]/60" />
                  <span>Joined {formatDate(user.createdAt)}</span>
                </div>

                {user.bio && (
                  <p className="text-sm text-[#F5F5F5]/80 pt-2 border-t border-[#F5F5F5]/10">{user.bio}</p>
                )}

                {/* Social links row */}
                {user.links && user.links.some((link) => link.url) && (
                  <div className="flex flex-wrap gap-2 pt-3">
                    {user.links?.map((link, index) =>
                      link.url ? (
                        <a
                          key={index}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1 rounded-full bg-[#0D0D0D] border border-[#F5F5F5]/10 hover:border-[#FF007F] text-xs flex items-center gap-1 transition-colors"
                          title={link.label}
                        >
                          {link.label}
                        </a>
                      ) : null,
                    )}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>

  );
}

export default ProfileHeader; 