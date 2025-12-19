import API from '../config/axios';
import { useState, useRef, useEffect } from 'react';
import SkeletonLoader from '../components/profile/SkeletonLoader';
import ProfileHeader from '../components/profile/ProfileHeader';
import StatsCards from '../components/profile/StatsCards';
import ProfileTabs from '../components/profile/ProfileTabs';
import AboutMe from '../components/profile/AboutMe';
import RecentActivity from '../components/profile/RecentActivity';
import TopAchievements from '../components/profile/TopAchievements';
import NotesList from '../components/profile/NotesList';
import QuizzesList from '../components/profile/QuizzesList';
import AchievementsList from '../components/profile/AchievementsList';
import ActivityHistory from '../components/profile/ActivityHistory';
import ErrorState from '../common/components/ErrorState';
import { toast } from 'react-toastify';
import { userNotes, userQuizzes, achievements } from '../config/data';
import { useUserStore } from '../store/userStore.js';

function Profile() {
    const { user, userStates,averageScore, fetchUser, getScore, isLoading, error } =
        useUserStore();

    useEffect(() => {
        fetchUser();
        getScore();
    }, [fetchUser, getScore]);


    const userState = userStates || {};
    const userDetails = user || {};
    const recentActivity = user?.recentActivity || [];
    const [isEditing, setIsEditing] = useState(false);
    const [activeTab, setActiveTab] = useState('overview');
    const [bio, setBio] = useState('');
    const [editingBio, setEditingBio] = useState(false);
    const [newBio, setNewBio] = useState();
    const fileInputRef = useRef(null);

    if (isLoading) return <SkeletonLoader />;
    if (error) return <ErrorState title='Unable to load Profile' message="Something went wrong while fetching your Profile."/>;
    userState.averageScore = averageScore ? averageScore.averagePercentage : 0;
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserDetails({ ...userDetails, [name]: value });
    };

    const handleSave = () => {
        setIsEditing(false);
    };

    const handleCancel = () => {
        setIsEditing(false);
    };

    const handleBioEdit = () => {
        setEditingBio(true);
        setNewBio(bio);
    };

    const handleBioSave = async () => {
        try {
            await API.patch('/users/bio', { bio: newBio });
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
            // set local preview + edited user
            setPreviewImage(dataUrl);
            setEditedUser((prev) => ({
                ...prev,
                profilePic: dataUrl,
            }));
            // later you can also call a prop to upload to backend
            // onProfilePicChange(file or dataUrl)
        };
        reader.readAsDataURL(file);
    };



    return (
        <div className="max-w-4xl mx-auto">
            <ProfileHeader
                user={userDetails}
                userStats={userState}
                isEditing={isEditing}
                handleInputChange={handleInputChange}
                handleSave={handleSave}
                handleCancel={handleCancel}
                setIsEditing={setIsEditing}
                handleFileUpload={handleFileUpload}
                fileInputRef={fileInputRef}
                handleFileChange={handleFileChange}
            />
            <StatsCards stats={userState} />
            <ProfileTabs activeTab={activeTab} setActiveTab={setActiveTab} />
            <div>
                {activeTab === 'overview' && (
                    <div className="space-y-6">
                        <AboutMe
                            bio={userDetails.bio}
                            editingBio={editingBio}
                            newBio={newBio}
                            handleBioEdit={handleBioEdit}
                            handleBioSave={handleBioSave}
                            handleBioCancel={handleBioCancel}
                            setNewBio={setNewBio}
                        />
                        <RecentActivity recentActivity={recentActivity} />
                        <TopAchievements achievements={achievements} />
                    </div>
                )}
                {activeTab === 'notes' && <NotesList userNotes={userNotes} />}
                {activeTab === 'quizzes' && <QuizzesList userQuizzes={userQuizzes} />}
                {activeTab === 'activity' && <ActivityHistory recentActivity={recentActivity} />}
                {activeTab === 'achievements' && <AchievementsList achievements={achievements} />}
            </div>
        </div>
    );
}

export default Profile;
