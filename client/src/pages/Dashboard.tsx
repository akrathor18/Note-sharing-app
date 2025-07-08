import { Clock, FileText, CheckCircle2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import API from '../config/axios';

// Components
import SkeletonLoader from '../components/dashboard/skeletonLoader';
import ActivityStats from '../components/dashboard/activityStats';
import RecentNotes from '../components/dashboard/recentNotes';
import UpcomingQuizzes from '../components/dashboard/upcomingQuiz';
import StudyActivityChart from '../components/dashboard/studyActivityChart';

// Sample Data
import { recentNotes, upcomingQuizzes } from '../config/data';
import { User } from '../../../types/common';

export default function Dashboard() {
    const [userDetails, setUserDetails] = useState<User | undefined>();

    const fetchUserDetail = async () => {
        setTimeout(async () => {
            try {
                const response = await API.get('/users/profile');
                setUserDetails(response.data);
            } catch (error) {
                console.log(error);
            }
        }, 1000);
    };

    useEffect(() => {
        fetchUserDetail();
    }, []);

    useEffect(() => {
        console.log('Fetched user details:', userDetails);
    }, [userDetails]);

    const activityStats = [
        {
            label: 'Notes Viewed',
            value: userDetails?.stats?.notesViewed ?? 10,
            icon: FileText,
            color: '#FF007F',
        },
        {
            label: 'Quizzes Completed',
            value: userDetails?.stats?.quizzesTaken ?? 10,
            icon: CheckCircle2,
            color: '#00E5FF',
        },
        {
            label: 'Study Hours',
            value: userDetails?.stats?.studyHours ?? 10,
            icon: Clock,
            color: '#FF007F',
        },
    ];

    if (!userDetails) {
        return <SkeletonLoader />;
    }

    return (
        <div className="space-y-6 md:space-y-8">
            <div>
                <h1 className="text-xl md:text-2xl font-bold mb-1">
                    Welcome back, {userDetails.name}!
                </h1>
                <p className="text-[#F5F5F5]/60">Here's what's happening with your studies</p>
            </div>
            <ActivityStats stats={activityStats} />
            <RecentNotes notes={recentNotes} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <UpcomingQuizzes quizzes={upcomingQuizzes} />
                <StudyActivityChart />
            </div>
        </div>
    );
}
