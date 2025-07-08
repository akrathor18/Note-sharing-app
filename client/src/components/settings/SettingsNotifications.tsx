import { Save } from 'lucide-react';

const notificationOptions = [
    {
        name: 'emailNotifications',
        label: 'Email Notifications',
        desc: 'Receive notifications via email',
    },
    { name: 'quizReminders', label: 'Quiz Reminders', desc: 'Get reminders for upcoming quizzes' },
    {
        name: 'studyReminders',
        label: 'Study Reminders',
        desc: 'Never miss your daily study sessions',
    },
];

export default function SettingsNotifications({ formData, handleFormChange }) {
    return (
        <div>
            <h2 className="text-lg font-bold mb-4">Notification Settings</h2>
            <div className="space-y-4">
                {notificationOptions.map(({ name, label, desc }) => (
                    <div key={name} className="flex items-center justify-between">
                        <div>
                            <p className="font-medium">{label}</p>
                            <p className="text-sm text-[#F5F5F5]/60">{desc}</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                name={name}
                                checked={formData[name]}
                                onChange={handleFormChange}
                                className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-[#0D0D0D] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FF007F]"></div>
                        </label>
                    </div>
                ))}
            </div>
            <div className="mt-6">
                <button
                    type="submit"
                    className="flex items-center gap-2 bg-[#FF007F] hover:bg-[#FF007F]/90 text-white px-4 py-2 rounded-lg transition-colors"
                >
                    <Save size={16} />
                    Save Changes
                </button>
            </div>
        </div>
    );
}
