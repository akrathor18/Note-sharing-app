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
import { toast } from 'react-toastify';
import { recentActivity, userNotes, userQuizzes, achievements } from '../config/data';

function Profile() {
    const [userDetails, setUserDetails] = useState();
    const [isEditing, setIsEditing] = useState(false);
    const [activeTab, setActiveTab] = useState('overview');
    const [bio, setBio] = useState('');
    const [editingBio, setEditingBio] = useState(false);
    const [newBio, setNewBio] = useState();
    const fileInputRef = useRef(null);

    const fetchUserDetail = async () => {
        setTimeout(async () => {
            try {
                const response = await API.get('/users/profile');
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
        const file = e.target.files[0];
        if (file) {
            // Simulate profile picture change
            const reader = new FileReader();
            reader.onload = (event) => {
                // In a real app, update the user's profile picture
            };
            reader.readAsDataURL(file);
        }
    };

    if (!userDetails) {
        return <SkeletonLoader />;
    }

    return (
        <div className="max-w-4xl mx-auto">
            <ProfileHeader
                userDetails={userDetails}
                isEditing={isEditing}
                handleInputChange={handleInputChange}
                handleSave={handleSave}
                handleCancel={handleCancel}
                setIsEditing={setIsEditing}
                handleFileUpload={handleFileUpload}
                fileInputRef={fileInputRef}
                handleFileChange={handleFileChange}
            />
            <StatsCards stats={userDetails.stats} />
            <ProfileTabs activeTab={activeTab} setActiveTab={setActiveTab} />
            <div>
                {activeTab === 'overview' && (
                    <div className="space-y-6">
                        <AboutMe
                            bio={bio}
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
