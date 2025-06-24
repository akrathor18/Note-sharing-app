import API from '../config/axios';
import { useState, useRef, useEffect } from 'react';
import {
    Mail,
    Calendar,
    Edit2,
    Save,
    X,
    BookOpen,
    BrainCircuit,
    Clock,
    Award,
    Bookmark,
    Star,
    Zap,
    Smile,
    Camera,
    Link,
    GitlabIcon as GitHub,
    Twitter,
    Linkedin,
    FileText,
    CheckCircle2,
} from 'lucide-react';
import { toast } from 'react-toastify';

function SkeletonLoader() {
    return (
        <div className="max-w-4xl mx-auto animate-pulse">
            {/* Profile Header */}
            <div className="bg-[#1A1A1A] rounded-xl p-6 mb-6">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                    <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-[#2a2a2a]" />

                    <div className="flex-1 space-y-4 w-full">
                        <div className="h-6 bg-[#2a2a2a] rounded w-1/3" />
                        <div className="h-4 bg-[#2a2a2a] rounded w-1/4" />
                        <div className="space-y-2 mt-4">
                            <div className="h-4 bg-[#2a2a2a] rounded w-2/3" />
                            <div className="h-4 bg-[#2a2a2a] rounded w-1/2" />
                            <div className="flex space-x-3 mt-3">
                                {Array(4)
                                    .fill(0)
                                    .map((_, i) => (
                                        <div
                                            key={i}
                                            className="w-8 h-8 rounded-full bg-[#2a2a2a]"
                                        />
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
                {Array(5)
                    .fill(0)
                    .map((_, i) => (
                        <div key={i} className="bg-[#1A1A1A] rounded-xl p-4 text-center space-y-2">
                            <div className="w-10 h-10 mx-auto rounded-full bg-[#2a2a2a]" />
                            <div className="h-5 bg-[#2a2a2a] w-1/2 mx-auto rounded" />
                            <div className="h-3 bg-[#2a2a2a] w-3/4 mx-auto rounded" />
                        </div>
                    ))}
            </div>

            {/* Tabs */}
            <div className="border-b border-[#F5F5F5]/10 mb-6">
                <div className="flex gap-4 overflow-x-auto hide-scrollbar">
                    {Array(5)
                        .fill(0)
                        .map((_, i) => (
                            <div key={i} className="h-6 w-20 bg-[#2a2a2a] rounded" />
                        ))}
                </div>
            </div>

            {/* About Me */}
            <div className="bg-[#1A1A1A] rounded-xl p-5 space-y-3">
                <div className="h-6 bg-[#2a2a2a] w-1/4 rounded" />
                <div className="space-y-2">
                    <div className="h-4 bg-[#2a2a2a] rounded w-full" />
                    <div className="h-4 bg-[#2a2a2a] rounded w-11/12" />
                    <div className="h-4 bg-[#2a2a2a] rounded w-2/3" />
                </div>
            </div>
        </div>
    );
}

function Profile() {
    const [userDetails, setUserDetails] = useState();

    const fetchUserDetail = async () => {
        setTimeout(async () => {
            try {
                const response = await API.get('/users/profile');
                // console.log(response.data);
                setUserDetails(response.data);
                setNewBio(response.data.bio);
                setBio(response.data.bio);
            } catch (error) {
                console.log(error);
                toast.error(error.response.data.message);
            }
        }, 1000);
    };

    useEffect(() => {
        fetchUserDetail();
    }, []);

    const [isEditing, setIsEditing] = useState(false);
    const [editedUser, setEditedUser] = useState();
    const [activeTab, setActiveTab] = useState('overview'); // overview, notes, quizzes, activity, achievements
    const [bio, setBio] = useState('');
    const [editingBio, setEditingBio] = useState(false);
    const [newBio, setNewBio] = useState();
    const fileInputRef = useRef(null);

    // Sample activity data
    const recentActivity = [
        {
            id: 1,
            type: 'note',
            action: 'created',
            title: 'Data Structures & Algorithms',
            date: '2 days ago',
        },
        {
            id: 2,
            type: 'quiz',
            action: 'completed',
            title: 'Organic Chemistry',
            score: '85%',
            date: '3 days ago',
        },
        {
            id: 3,
            type: 'note',
            action: 'updated',
            title: 'Calculus II: Integration',
            date: '1 week ago',
        },
        { id: 4, type: 'quiz', action: 'started', title: 'Physics Mechanics', date: '1 week ago' },
        {
            id: 5,
            type: 'note',
            action: 'downloaded',
            title: 'Biology Cell Structure',
            date: '2 weeks ago',
        },
    ];

    // Sample notes data
    const userNotes = [
        {
            id: 1,
            title: 'Data Structures & Algorithms',
            subject: 'Computer Science',
            date: 'Oct 15, 2023',
            downloads: 128,
        },
        {
            id: 2,
            title: 'Organic Chemistry Reactions',
            subject: 'Chemistry',
            date: 'Oct 22, 2023',
            downloads: 112,
        },
        {
            id: 3,
            title: 'Calculus II: Integration',
            subject: 'Mathematics',
            date: 'Sep 28, 2023',
            downloads: 95,
        },
    ];

    // Sample quizzes data
    const userQuizzes = [
        {
            id: 1,
            title: 'Database Systems',
            subject: 'Computer Science',
            date: 'Nov 10, 2023',
            score: '90%',
        },
        {
            id: 2,
            title: 'Organic Chemistry',
            subject: 'Chemistry',
            date: 'Nov 5, 2023',
            score: '85%',
        },
        {
            id: 3,
            title: 'Calculus Derivatives',
            subject: 'Mathematics',
            date: 'Oct 20, 2023',
            score: '75%',
        },
    ];

    // Sample achievements data
    const achievements = [
        {
            id: 1,
            title: 'Quiz Master',
            description: 'Completed 10 quizzes with a score of 80% or higher',
            icon: Award,
            progress: 80,
            color: '#FF007F',
        },
        {
            id: 2,
            title: 'Note Creator',
            description: 'Created 5 notes that have been downloaded by others',
            icon: BookOpen,
            progress: 60,
            color: '#00E5FF',
        },
        {
            id: 3,
            title: 'Study Streak',
            description: 'Studied for 7 consecutive days',
            icon: Zap,
            progress: 100,
            color: '#FFD700',
        },
        {
            id: 4,
            title: 'Knowledge Sharer',
            description: 'Shared notes with 10 other students',
            icon: Bookmark,
            progress: 40,
            color: '#4CAF50',
        },
        {
            id: 5,
            title: 'Perfect Score',
            description: 'Achieved 100% on 3 quizzes',
            icon: Star,
            progress: 33,
            color: '#FF9800',
        },
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedUser({ ...editedUser, [name]: value });
    };

    const handleSave = () => {
        setUser(editedUser);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditedUser({ ...user });
        setIsEditing(false);
    };

    const handleBioEdit = () => {
        setEditingBio(true);
        setNewBio(bio);
    };

    const handleBioSave = async () => {
        try {
            const response = await API.patch('/users/bio', {
                bio: newBio,
            });

            setBio(newBio);
            setEditingBio(false);
        } catch (error) {
            console.log(error);
        }
    };

    const handleBioCancel = () => {
        setNewBio(bio);
        setEditingBio(false);
    };

    const handleFileUpload = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // In a real app, you would upload the file to a server
            // For now, we'll just simulate a profile picture change
            console.log('File selected:', file.name);

            // You could use FileReader to preview the image
            const reader = new FileReader();
            reader.onload = (event) => {
                console.log('File loaded:', event.target.result);
                // In a real app, you would update the user's profile picture
            };
            reader.readAsDataURL(file);
        }
    };

    const formatDate = (isoDate) => {
        const date = new Date(isoDate);
        return date.toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
    };

    if (!userDetails) {
        return <SkeletonLoader />;
    }

    return (
        <div className="max-w-4xl mx-auto">
            {/* Profile Header */}
            <div className="bg-[#1A1A1A] rounded-xl p-6 mb-6">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                    {/* Profile Picture */}
                    <div className="relative group">
                        <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-[#00E5FF] flex items-center justify-center text-[#0D0D0D] text-4xl font-bold overflow-hidden">
                            {userDetails.name.toUpperCase().charAt(0)}
                            {/* If user has a profile picture, show it instead of the initial */}
                            {/* {user.profilePicture ? (
                <img src={user.profilePicture || "/placeholder.svg"} alt={user.name} className="w-full h-full object-cover" />
              ) : (
                user.name.charAt(0)
              )} */}
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
                                    <label
                                        htmlFor="name"
                                        className="block text-sm text-[#F5F5F5]/60 mb-1"
                                    >
                                        Name
                                    </label>
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
                                    <label
                                        htmlFor="email"
                                        className="block text-sm text-[#F5F5F5]/60 mb-1"
                                    >
                                        Email
                                    </label>
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
                                    <label
                                        htmlFor="role"
                                        className="block text-sm text-[#F5F5F5]/60 mb-1"
                                    >
                                        Role
                                    </label>
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
                                        <Mail size={16} className="text-[#F5F5F5]/60" />
                                        <span>{userDetails.email}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm">
                                        <Calendar size={16} className="text-[#F5F5F5]/60" />
                                        <span>Joined {formatDate(userDetails.createdAt)}</span>
                                    </div>
                                    <div className="flex flex-wrap gap-3 mt-3">
                                        <a
                                            href="#"
                                            className="p-2 rounded-full bg-[#0D0D0D] hover:bg-[#F5F5F5]/10 transition-colors"
                                        >
                                            <GitHub size={18} />
                                        </a>
                                        <a
                                            href="#"
                                            className="p-2 rounded-full bg-[#0D0D0D] hover:bg-[#F5F5F5]/10 transition-colors"
                                        >
                                            <Twitter size={18} />
                                        </a>
                                        <a
                                            href="#"
                                            className="p-2 rounded-full bg-[#0D0D0D] hover:bg-[#F5F5F5]/10 transition-colors"
                                        >
                                            <Linkedin size={18} />
                                        </a>
                                        <a
                                            href="#"
                                            className="p-2 rounded-full bg-[#0D0D0D] hover:bg-[#F5F5F5]/10 transition-colors"
                                        >
                                            <Link size={18} />
                                        </a>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
                <div className="bg-[#1A1A1A] rounded-xl p-4 text-center">
                    <div className="w-10 h-10 mx-auto rounded-full bg-[#FF007F]/10 flex items-center justify-center mb-2">
                        <FileText size={18} className="text-[#FF007F]" />
                    </div>
                    <p className="text-2xl font-bold">{userDetails.stats.totalNoteCreated}</p>
                    <p className="text-xs text-[#F5F5F5]/60">Notes Created</p>
                </div>
                <div className="bg-[#1A1A1A] rounded-xl p-4 text-center">
                    <div className="w-10 h-10 mx-auto rounded-full bg-[#00E5FF]/10 flex items-center justify-center mb-2">
                        <FileText size={18} className="text-[#00E5FF]" />
                    </div>
                    <p className="text-2xl font-bold">{userDetails.stats.totalNoteVisits}</p>
                    <p className="text-xs text-[#F5F5F5]/60">Notes Viewed</p>
                </div>
                <div className="bg-[#1A1A1A] rounded-xl p-4 text-center">
                    <div className="w-10 h-10 mx-auto rounded-full bg-[#FF007F]/10 flex items-center justify-center mb-2">
                        <BrainCircuit size={18} className="text-[#FF007F]" />
                    </div>
                    <p className="text-2xl font-bold">{userDetails.stats.quizzesTaken}</p>
                    <p className="text-xs text-[#F5F5F5]/60">Quizzes Taken</p>
                </div>
                <div className="bg-[#1A1A1A] rounded-xl p-4 text-center">
                    <div className="w-10 h-10 mx-auto rounded-full bg-[#00E5FF]/10 flex items-center justify-center mb-2">
                        <CheckCircle2 size={18} className="text-[#00E5FF]" />
                    </div>
                    <p className="text-2xl font-bold">{userDetails.stats.quizzesPassed}</p>
                    <p className="text-xs text-[#F5F5F5]/60">Quizzes Passed</p>
                </div>
                <div className="bg-[#1A1A1A] rounded-xl p-4 text-center">
                    <div className="w-10 h-10 mx-auto rounded-full bg-[#FF007F]/10 flex items-center justify-center mb-2">
                        <Clock size={18} className="text-[#FF007F]" />
                    </div>
                    <p className="text-2xl font-bold">{userDetails.stats.totalStudyTime}h</p>
                    <p className="text-xs text-[#F5F5F5]/60">Study Hours</p>
                </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-[#F5F5F5]/10 mb-6">
                <div className="flex overflow-x-auto hide-scrollbar">
                    <button
                        onClick={() => setActiveTab('overview')}
                        className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${
                            activeTab === 'overview'
                                ? 'border-b-2 border-[#FF007F] text-[#FF007F]'
                                : 'text-[#F5F5F5]/60 hover:text-[#F5F5F5]'
                        }`}
                    >
                        Overview
                    </button>
                    <button
                        onClick={() => setActiveTab('notes')}
                        className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${
                            activeTab === 'notes'
                                ? 'border-b-2 border-[#FF007F] text-[#FF007F]'
                                : 'text-[#F5F5F5]/60 hover:text-[#F5F5F5]'
                        }`}
                    >
                        Notes
                    </button>
                    <button
                        onClick={() => setActiveTab('quizzes')}
                        className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${
                            activeTab === 'quizzes'
                                ? 'border-b-2 border-[#FF007F] text-[#FF007F]'
                                : 'text-[#F5F5F5]/60 hover:text-[#F5F5F5]'
                        }`}
                    >
                        Quizzes
                    </button>
                    <button
                        onClick={() => setActiveTab('activity')}
                        className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${
                            activeTab === 'activity'
                                ? 'border-b-2 border-[#FF007F] text-[#FF007F]'
                                : 'text-[#F5F5F5]/60 hover:text-[#F5F5F5]'
                        }`}
                    >
                        Activity
                    </button>
                    <button
                        onClick={() => setActiveTab('achievements')}
                        className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${
                            activeTab === 'achievements'
                                ? 'border-b-2 border-[#FF007F] text-[#FF007F]'
                                : 'text-[#F5F5F5]/60 hover:text-[#F5F5F5]'
                        }`}
                    >
                        Achievements
                    </button>
                </div>
            </div>

            {/* Tab Content */}
            <div>
                {/* Overview Tab */}
                {activeTab === 'overview' && (
                    <div className="space-y-6">
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
                                            disabled={newBio === bio}
                                            className={`px-3 py-1 rounded-lg text-white text-sm ${
                                                newBio === bio
                                                    ? 'bg-gray-500 cursor-not-allowed'
                                                    : 'bg-[#FF007F] hover:bg-[#FF007F]/90'
                                            }`}
                                        >
                                            Save
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <p className="text-[#F5F5F5]/80">{bio}</p>
                            )}
                        </div>

                        <div className="bg-[#1A1A1A] rounded-xl p-5">
                            <h2 className="text-lg font-bold mb-4">Recent Activity</h2>
                            <div className="space-y-3">
                                {recentActivity.slice(0, 3).map((activity) => (
                                    <div
                                        key={activity.id}
                                        className="flex items-center gap-3 p-3 rounded-lg bg-[#0D0D0D]"
                                    >
                                        <div
                                            className={`w-10 h-10 rounded-lg ${
                                                activity.type === 'note'
                                                    ? 'bg-[#FF007F]/10'
                                                    : 'bg-[#00E5FF]/10'
                                            } flex items-center justify-center`}
                                        >
                                            {activity.type === 'note' ? (
                                                <FileText size={20} className="text-[#FF007F]" />
                                            ) : (
                                                <BrainCircuit
                                                    size={20}
                                                    className="text-[#00E5FF]"
                                                />
                                            )}
                                        </div>
                                        <div>
                                            <h3 className="font-medium">{activity.title}</h3>
                                            <p className="text-xs text-[#F5F5F5]/60">
                                                {activity.action}{' '}
                                                {activity.score ? `• Score: ${activity.score}` : ''}{' '}
                                                • {activity.date}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-[#1A1A1A] rounded-xl p-5">
                            <h2 className="text-lg font-bold mb-4">Top Achievements</h2>
                            <div className="space-y-3">
                                {achievements.slice(0, 2).map((achievement) => (
                                    <div
                                        key={achievement.id}
                                        className="p-3 rounded-lg bg-[#0D0D0D]"
                                    >
                                        <div className="flex items-center gap-3 mb-2">
                                            <div
                                                className="w-10 h-10 rounded-lg flex items-center justify-center"
                                                style={{
                                                    backgroundColor: `${achievement.color}20`,
                                                }}
                                            >
                                                <achievement.icon
                                                    size={20}
                                                    style={{ color: achievement.color }}
                                                />
                                            </div>
                                            <div>
                                                <h3 className="font-medium">{achievement.title}</h3>
                                                <p className="text-xs text-[#F5F5F5]/60">
                                                    {achievement.description}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="w-full bg-[#1A1A1A] rounded-full h-2">
                                            <div
                                                className="h-2 rounded-full"
                                                style={{
                                                    width: `${achievement.progress}%`,
                                                    backgroundColor: achievement.color,
                                                }}
                                            ></div>
                                        </div>
                                        <p className="text-right text-xs mt-1 text-[#F5F5F5]/60">
                                            {achievement.progress}% complete
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Notes Tab */}
                {activeTab === 'notes' && (
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <h2 className="text-lg font-bold">My Notes</h2>
                            <button className="text-[#00E5FF] text-sm hover:underline">
                                View All
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {userNotes.map((note) => (
                                <div
                                    key={note.id}
                                    className="bg-[#1A1A1A] rounded-xl p-4 border border-[#F5F5F5]/5"
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-xs bg-[#FF007F]/10 text-[#FF007F] px-2 py-1 rounded-full">
                                            {note.subject}
                                        </span>
                                        <span className="text-xs text-[#F5F5F5]/60">
                                            {note.date}
                                        </span>
                                    </div>
                                    <h3 className="font-medium mb-3">{note.title}</h3>
                                    <div className="flex items-center text-xs text-[#F5F5F5]/60">
                                        <span>{note.downloads} downloads</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Quizzes Tab */}
                {activeTab === 'quizzes' && (
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <h2 className="text-lg font-bold">My Quizzes</h2>
                            <button className="text-[#00E5FF] text-sm hover:underline">
                                View All
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {userQuizzes.map((quiz) => (
                                <div
                                    key={quiz.id}
                                    className="bg-[#1A1A1A] rounded-xl p-4 border border-[#F5F5F5]/5"
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-xs bg-[#00E5FF]/10 text-[#00E5FF] px-2 py-1 rounded-full">
                                            {quiz.subject}
                                        </span>
                                        <span className="text-xs text-[#F5F5F5]/60">
                                            {quiz.date}
                                        </span>
                                    </div>
                                    <h3 className="font-medium mb-3">{quiz.title}</h3>
                                    <div className="flex items-center text-xs">
                                        <span className="text-green-500">Score: {quiz.score}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Activity Tab */}
                {activeTab === 'activity' && (
                    <div className="space-y-4">
                        <h2 className="text-lg font-bold">Activity History</h2>

                        <div className="space-y-3">
                            {recentActivity.map((activity) => (
                                <div
                                    key={activity.id}
                                    className="flex items-center gap-3 p-3 rounded-lg bg-[#1A1A1A]"
                                >
                                    <div
                                        className={`w-10 h-10 rounded-lg ${
                                            activity.type === 'note'
                                                ? 'bg-[#FF007F]/10'
                                                : 'bg-[#00E5FF]/10'
                                        } flex items-center justify-center`}
                                    >
                                        {activity.type === 'note' ? (
                                            <FileText size={20} className="text-[#FF007F]" />
                                        ) : (
                                            <BrainCircuit size={20} className="text-[#00E5FF]" />
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-medium">{activity.title}</h3>
                                        <p className="text-xs text-[#F5F5F5]/60">
                                            {activity.action}{' '}
                                            {activity.score ? `• Score: ${activity.score}` : ''} •{' '}
                                            {activity.date}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Achievements Tab */}
                {activeTab === 'achievements' && (
                    <div className="space-y-4">
                        <h2 className="text-lg font-bold">My Achievements</h2>

                        <div className="space-y-4">
                            {achievements.map((achievement) => (
                                <div key={achievement.id} className="p-4 rounded-lg bg-[#1A1A1A]">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div
                                            className="w-12 h-12 rounded-lg flex items-center justify-center"
                                            style={{ backgroundColor: `${achievement.color}20` }}
                                        >
                                            <achievement.icon
                                                size={24}
                                                style={{ color: achievement.color }}
                                            />
                                        </div>
                                        <div>
                                            <h3 className="font-medium">{achievement.title}</h3>
                                            <p className="text-sm text-[#F5F5F5]/60">
                                                {achievement.description}
                                            </p>
                                        </div>
                                        <div className="ml-auto text-right">
                                            <span
                                                className="text-lg font-bold"
                                                style={{ color: achievement.color }}
                                            >
                                                {achievement.progress}%
                                            </span>
                                        </div>
                                    </div>
                                    <div className="w-full bg-[#0D0D0D] rounded-full h-2.5">
                                        <div
                                            className="h-2.5 rounded-full"
                                            style={{
                                                width: `${achievement.progress}%`,
                                                backgroundColor: achievement.color,
                                            }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="bg-[#1A1A1A] rounded-xl p-5 text-center">
                            <div className="w-16 h-16 mx-auto rounded-full bg-[#FF007F]/10 flex items-center justify-center mb-3">
                                <Smile size={32} className="text-[#FF007F]" />
                            </div>
                            <h3 className="text-lg font-medium mb-2">Keep Going!</h3>
                            <p className="text-[#F5F5F5]/60 mb-4">
                                Complete more quizzes and create notes to unlock more achievements
                            </p>
                            <button className="px-4 py-2 bg-[#FF007F] hover:bg-[#FF007F]/90 text-white rounded-lg">
                                Explore More Quizzes
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Profile;
