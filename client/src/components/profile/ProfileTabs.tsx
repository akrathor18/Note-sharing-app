import React from 'react';

const tabs = [
    { key: 'overview', label: 'Overview' },
    { key: 'notes', label: 'Notes' },
    { key: 'quizzes', label: 'Quizzes' },
    { key: 'activity', label: 'Activity' },
    { key: 'achievements', label: 'Achievements' },
];

function ProfileTabs({ activeTab, setActiveTab }) {
    return (
        <div className="border-b border-[#F5F5F5]/10 mb-6">
            <div className="flex overflow-x-auto hide-scrollbar">
                {tabs.map((tab) => (
                    <button
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key)}
                        className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${activeTab === tab.key
                                ? 'border-b-2 border-[#FF007F] text-[#FF007F]'
                                : 'text-[#F5F5F5]/60 hover:text-[#F5F5F5]'
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default ProfileTabs; 