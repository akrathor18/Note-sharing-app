import { Save } from 'lucide-react';

export default function SettingsAccount({ userData, formData, handleFormChange, formatDate }) {
    return (
        <div>
            <h2 className="text-lg font-bold mb-4">Account Settings</h2>
            <div className="space-y-4">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1">
                        Email Address
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleFormChange}
                        className="w-full bg-[#0D0D0D] border border-[#F5F5F5]/10 rounded-lg py-2 px-3 focus:outline-none focus:border-[#FF007F]"
                    />
                </div>
                <div>
                    <p className="text-sm text-[#F5F5F5]/60 mb-2">
                        Account Type: <span className="text-[#F5F5F5]">{userData.role}</span>
                    </p>
                    <p className="text-sm text-[#F5F5F5]/60">
                        Member Since:{' '}
                        <span className="text-[#F5F5F5]">{formatDate(userData.createdAt)}</span>
                    </p>
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
        </div>
    );
}
