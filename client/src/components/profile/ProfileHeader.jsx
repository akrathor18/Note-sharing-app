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

     const [editedUser, setEditedUser] = useState({ ...userDetails, socials: { ...userDetails.socials } })
   
    return (
        <div className="bg-[#1A1A1A] rounded-xl p-6 mb-6">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          {/* Profile Picture */}
          <div className="relative group">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-[#00E5FF] flex items-center justify-center text-[#0D0D0D] text-4xl font-bold overflow-hidden">
              {userDetails.profilePicture ? (
                <img
                  src={userDetails.profilePicture || "/placeholder.svg"}
                  alt={`${userDetails.name}'s profile picture`}
                  className="w-full h-full object-cover"
                />
              ) : (
                userDetails.name?.charAt(0) || "U"
              )}
            </div>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={handleFileUpload}
                className="bg-[#FF007F] text-white p-2 rounded-full shadow"
                title="Upload profile picture"
              >
                <Camera size={16} />
              </button>
              {userDetails.profilePicture || editedUser.profilePicture ? (
                <button
                  onClick={handleRemoveProfilePicture}
                  className="bg-[#1A1A1A] border border-[#F5F5F5]/10 text-[#F5F5F5] p-2 rounded-full"
                  title="Remove profile picture"
                >
                  <X size={16} />
                </button>
              ) : null}
            </div>
            <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
          </div>

          {/* Profile Info */}
          <div className="flex-1 text-center md:text-left w-full">
            {isEditing ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm text-[#F5F5F5]/60 mb-1">
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={editedUser.name}
                      onChange={handleInputChange}
                      className="w-full bg-[#0D0D0D] border border-[#F5F5F5]/10 rounded-lg py-2 px-3 focus:outline-none focus:border-[#FF007F]"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm text-[#F5F5F5]/60 mb-1">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={editedUser.email}
                      onChange={handleInputChange}
                      className="w-full bg-[#0D0D0D] border border-[#F5F5F5]/10 rounded-lg py-2 px-3 focus:outline-none focus:border-[#FF007F]"
                    />
                  </div>
                  <div>
                    <label htmlFor="role" className="block text-sm text-[#F5F5F5]/60 mb-1">
                      Role
                    </label>
                    <input
                      id="role"
                      name="role"
                      type="text"
                      value={editedUser.role}
                      onChange={handleInputChange}
                      className="w-full bg-[#0D0D0D] border border-[#F5F5F5]/10 rounded-lg py-2 px-3 focus:outline-none focus:border-[#FF007F]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-[#F5F5F5]/60 mb-1">Profile Picture</label>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={handleFileUpload}
                        className="px-3 py-2 rounded-lg bg-[#FF007F] text-white hover:bg-[#FF007F]/90"
                      >
                        Upload Image
                      </button>
                      {editedUser.profilePicture && (
                        <button
                          type="button"
                          onClick={handleRemoveProfilePicture}
                          className="px-3 py-2 rounded-lg border border-[#F5F5F5]/10 hover:bg-[#F5F5F5]/5"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                    {editedUser.profilePicture && (
                      <div className="mt-3 flex items-center gap-3">
                        <img
                          src={editedUser.profilePicture || "/placeholder.svg"}
                          alt="Profile preview"
                          className="w-16 h-16 rounded-full object-cover border border-[#F5F5F5]/10"
                        />
                        <span className="text-xs text-[#F5F5F5]/60">Preview</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Social Links */}
                <div className="pt-2">
                  <p className="text-sm font-medium mb-3">Social Links</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="relative">
                      <label className="block text-xs text-[#F5F5F5]/60 mb-1">GitHub</label>
                      <div className="relative">
                        <Github size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#F5F5F5]/40" />
                        <input
                          type="url"
                          placeholder="github.com/username"
                          value={editedUser.socials?.github || ""}
                          onChange={(e) => handleSocialChange("github", e.target.value)}
                          className="w-full pl-9 pr-3 py-2 rounded-lg bg-[#0D0D0D] border border-[#F5F5F5]/10 focus:outline-none focus:border-[#FF007F]"
                        />
                      </div>
                    </div>
                    <div className="relative">
                      <label className="block text-xs text-[#F5F5F5]/60 mb-1">Twitter</label>
                      <div className="relative">
                        <Twitter size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#F5F5F5]/40" />
                        <input
                          type="url"
                          placeholder="twitter.com/username"
                          value={editedUser.socials?.twitter || ""}
                          onChange={(e) => handleSocialChange("twitter", e.target.value)}
                          className="w-full pl-9 pr-3 py-2 rounded-lg bg-[#0D0D0D] border border-[#F5F5F5]/10 focus:outline-none focus:border-[#FF007F]"
                        />
                      </div>
                    </div>
                    <div className="relative">
                      <label className="block text-xs text-[#F5F5F5]/60 mb-1">LinkedIn</label>
                      <div className="relative">
                        <Linkedin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#F5F5F5]/40" />
                        <input
                          type="url"
                          placeholder="linkedin.com/in/username"
                          value={editedUser.socials?.linkedin || ""}
                          onChange={(e) => handleSocialChange("linkedin", e.target.value)}
                          className="w-full pl-9 pr-3 py-2 rounded-lg bg-[#0D0D0D] border border-[#F5F5F5]/10 focus:outline-none focus:border-[#FF007F]"
                        />
                      </div>
                    </div>
                    <div className="relative">
                      <label className="block text-xs text-[#F5F5F5]/60 mb-1">Website</label>
                      <div className="relative">
                        <Globe size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#F5F5F5]/40" />
                        <input
                          type="url"
                          placeholder="your-site.com"
                          value={editedUser.socials?.website || ""}
                          onChange={(e) => handleSocialChange("website", e.target.value)}
                          className="w-full pl-9 pr-3 py-2 rounded-lg bg-[#0D0D0D] border border-[#F5F5F5]/10 focus:outline-none focus:border-[#FF007F]"
                        />
                      </div>
                    </div>
                    <div className="relative md:col-span-2">
                      <label className="block text-xs text-[#F5F5F5]/60 mb-1">Instagram</label>
                      <div className="relative">
                        <Instagram size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#F5F5F5]/40" />
                        <input
                          type="url"
                          placeholder="instagram.com/username"
                          value={editedUser.socials?.instagram || ""}
                          onChange={(e) => handleSocialChange("instagram", e.target.value)}
                          className="w-full pl-9 pr-3 py-2 rounded-lg bg-[#0D0D0D] border border-[#F5F5F5]/10 focus:outline-none focus:border-[#FF007F]"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 justify-center md:justify-start">
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-1 bg-[#FF007F] text-white px-4 py-2 rounded-lg"
                  >
                    <Save size={16} />
                    Save
                  </button>
                  <button
                    onClick={handleCancel}
                    className="flex items-center gap-1 bg-[#1A1A1A] border border-[#F5F5F5]/10 px-4 py-2 rounded-lg"
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
                    <h1 className="text-2xl font-bold">{userDetails.name}</h1>
                    <p className="text-[#F5F5F5]/60">{userDetails.role}</p>
                  </div>
                  <button
                    onClick={() => {
                      setIsEditing(true)
                    }}
                    className="flex items-center gap-1 bg-[#1A1A1A] border border-[#F5F5F5]/10 px-3 py-1 rounded-lg hover:bg-[#F5F5F5]/5"
                  >
                    <Edit2 size={16} />
                    Edit
                  </button>
                </div>

                <div className="mt-4 space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail size={16} className="text-[#F5F5F5]/60" />
                    <span>{userDetails.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar size={16} className="text-[#F5F5F5]/60" />
                    <span>Joined {userDetails.joinDate}</span>
                  </div>

                  {/* Social links row */}
                  <div className="flex flex-wrap gap-3 mt-3">
                    {[
                      { key: "github", icon: Github, label: "GitHub", },
                      { key: "twitter", icon: Twitter, label: "Twitter", },
                      { key: "linkedin", icon: Linkedin, label: "LinkedIn", },
                      { key: "website", icon: Globe, label: "Website", },
                      { key: "instagram", icon: Instagram, label: "Instagram", },
                    ].map((item) =>
                      item.url ? (
                        <a
                          key={item.key}
                          href={normalizeUrl(item.url)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-full bg-[#0D0D0D] hover:bg-[#F5F5F5]/10 transition-colors"
                          title={item.label}
                          aria-label={item.label}
                        >
                          <item.icon size={18} />
                        </a>
                      ) : (
                        <button
                          key={item.key}
                          onClick={() => {
                            setIsEditing(true)
                          }}
                          className="p-2 rounded-full bg-[#0D0D0D] text-[#F5F5F5]/40 hover:text-[#F5F5F5] transition-colors"
                          title={`Add ${item.label}`}
                          aria-label={`Add ${item.label}`}
                        >
                          <item.icon size={18} />
                        </button>
                      ),
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
}

export default ProfileHeader; 