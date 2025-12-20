import { Mail, Lock, Bell, Sun, Globe, Shield } from 'lucide-react';

const sections = [
    // { key: 'account', icon: <Mail size={18} />, label: 'Account' },
    { key: 'security', icon: <Lock size={18} />, label: 'Security' },
    // { key: 'notifications', icon: <Bell size={18} />, label: 'Notifications' },
    // { key: 'appearance', icon: <Sun size={18} />, label: 'Appearance' },
    // { key: 'language', icon: <Globe size={18} />, label: 'Language' },
    // { key: 'privacy', icon: <Shield size={18} />, label: 'Privacy' },
];

export default function SettingsSidebar({ activeSection, setActiveSection }) {
    return (
        <div className="w-full md:w-64 bg-[#1A1A1A] rounded-xl p-4 h-fit">
            <nav>
                <ul className="space-y-1">
                    {sections.map(({ key, icon, label }) => (
                        <li key={key}>
                            <button
                                onClick={() => setActiveSection(key)}
                                className={`w-full text-left px-3 py-2 rounded-lg flex items-center gap-2 ${activeSection === key ? 'bg-[#FF007F]/10 text-[#FF007F]' : 'hover:bg-[#F5F5F5]/5'}`}
                            >
                                {icon}
                                <span>{label}</span>
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
}
