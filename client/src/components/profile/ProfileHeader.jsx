import React from 'react';
import {   Mail,
  Calendar,
  Edit2,
  Save,
  X,
  Camera,
  Github,
  Twitter,
  Linkedin,
  Globe,
  Instagram, } from 'lucide-react';
import {useState, useEffect} from 'react';
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
   
    return (
         <div className="bg-[#1A1A1A] rounded-xl p-6 mb-6">
          {console.log(user)}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          {/* Profile Picture Section */}
          <div className="relative group">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-[#00E5FF] flex items-center justify-center text-[#0D0D0D] text-4xl font-bold overflow-hidden">
              { user.profilePic ? (
                <img
                  src={user.profilePic}
                  alt={`${user.name}'s profile`}
                  className="w-full h-full object-cover"
                />
              ) : (
                user.name?.charAt(0) || "U"
              )}
            </div>
            {isEditing && (
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
                <button
                  onClick={handleFileUpload}
                  className="bg-[#FF007F] text-white p-2 rounded-full shadow hover:bg-[#FF007F]/90"
                  title="Upload profile picture"
                >
                  <Camera size={16} />
                </button>
                {editedUser.profilePicture && (
                  <button
                    onClick={handleRemoveProfilePicture}
                    className="bg-[#1A1A1A] border border-[#F5F5F5]/10 text-[#F5F5F5] p-2 rounded-full hover:bg-[#F5F5F5]/10"
                    title="Remove profile picture"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            )}
            <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
          </div>

          {/* Profile Info */}
          <div className="flex-1 w-full">
            {isEditing ? (
              <div className="space-y-6">
                {/* Basic Info */}
                <div>
                  <h3 className="text-sm font-semibold text-[#F5F5F5] mb-3">Basic Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-[#F5F5F5]/60 mb-1">Name *</label>
                      <input
                        name="name"
                        type="text"
                        value={editedUser.name}
                        onChange={handleInputChange}
                        placeholder="Your full name"
                        className="w-full bg-[#0D0D0D] border border-[#F5F5F5]/10 rounded-lg py-2 px-3 text-sm focus:outline-none focus:border-[#FF007F]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-[#F5F5F5]/60 mb-1">Email *</label>
                      <input
                        name="email"
                        type="email"
                        value={editedUser.email}
                        onChange={handleInputChange}
                        placeholder="your.email@example.com"
                        className="w-full bg-[#0D0D0D] border border-[#F5F5F5]/10 rounded-lg py-2 px-3 text-sm focus:outline-none focus:border-[#FF007F]"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-xs text-[#F5F5F5]/60 mb-1">Role/Title</label>
                      <input
                        name="role"
                        type="text"
                        value={editedUser.role}
                        onChange={handleInputChange}
                        placeholder="e.g., Computer Science Student"
                        className="w-full bg-[#0D0D0D] border border-[#F5F5F5]/10 rounded-lg py-2 px-3 text-sm focus:outline-none focus:border-[#FF007F]"
                      />
                    </div>
                  </div>
                </div>

                {/* Bio */}
                <div>
                  <h3 className="text-sm font-semibold text-[#F5F5F5] mb-3">Bio</h3>
                  <textarea
                    name="bio"
                    value={editedUser.bio}
                    onChange={handleInputChange}
                    placeholder="Tell others about yourself..."
                    rows="4"
                    className="w-full bg-[#0D0D0D] border border-[#F5F5F5]/10 rounded-lg py-2 px-3 text-sm focus:outline-none focus:border-[#FF007F]"
                  />
                  <p className="text-xs text-[#F5F5F5]/40 mt-1">{editedUser.bio?.length || 0}/500 characters</p>
                </div>

                {/* Social Links */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-semibold text-[#F5F5F5]">Social Links</h3>
                    <button
                      onClick={handleAddSocialLink}
                      className="text-xs flex items-center gap-1 text-[#FF007F] hover:text-[#FF007F]/80"
                    >
                      <Plus size={14} />
                      Add Link
                    </button>
                  </div>
                  <div className="space-y-3 max-h-80 overflow-y-auto">
                    {console.log(user.links|| null)}
                    {user.links?.map((link, index) => (
                      <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-2 items-end">
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
                        <div className="md:col-span-2">
                          <label className="block text-xs text-[#F5F5F5]/60 mb-1">URL</label>
                          <div className="flex gap-2">
                            <input
                              type="url"
                              value={link.url}
                              onChange={(e) => handleSocialLinkChange(index, "url", e.target.value)}
                              placeholder="https://example.com"
                              className="flex-1 bg-[#0D0D0D] border border-[#F5F5F5]/10 rounded-lg py-2 px-3 text-sm focus:outline-none focus:border-[#FF007F]"
                            />
                            <button
                              onClick={() => handleRemoveSocialLink(index)}
                              className="px-3 py-2 rounded-lg bg-[#1A1A1A] border border-[#F5F5F5]/10 hover:bg-[#F5F5F5]/10 text-[#FF007F]"
                              title="Remove"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 justify-center md:justify-start pt-2">
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-2 bg-[#FF007F] text-white px-4 py-2 rounded-lg hover:bg-[#FF007F]/90"
                  >
                    <Save size={16} />
                    Save Changes
                  </button>
                  <button
                    onClick={handleCancel}
                    className="flex items-center gap-2 bg-[#1A1A1A] border border-[#F5F5F5]/10 px-4 py-2 rounded-lg hover:bg-[#F5F5F5]/5"
                  >
                    <X size={16} />
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-start w-full">
                  <div>
                    <h1 className="text-2xl font-bold">{user.name || "User"}</h1>
                    <p className="text-[#F5F5F5]/60">{user.role?.role_name || "Student"}</p>
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
                    <span>Joined {user.joinDate}</span>
                  </div>

                  {user.bio && (
                    <p className="text-sm text-[#F5F5F5]/80 pt-2 border-t border-[#F5F5F5]/10">{user.bio}</p>
                  )}

                  {/* Social links row */}
                  {user.socialLinks && user.socialLinks.some((link) => link.url) && (
                    <div className="flex flex-wrap gap-2 pt-3">
                      {user.socialLinks?.map((link, index) =>
                        link.url ? (
                          <a
                            key={index}
                            href={normalizeUrl(link.url)}
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