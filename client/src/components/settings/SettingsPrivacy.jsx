import { Save, ChevronDown } from 'lucide-react';

export default function SettingsPrivacy({ formData, handleInputChange }) {
    return (
        <div>
            <h2 className="text-lg font-bold mb-4">Privacy Settings</h2>
            <div className="space-y-4">
                <div>
                    <label htmlFor="privacyProfile" className="block text-sm font-medium mb-1">
                        Profile Visibility
                    </label>
                    <div className="relative">
                        <select
                            id="privacyProfile"
                            name="privacyProfile"
                            value={formData.privacyProfile}
                            onChange={handleInputChange}
                            className="w-full bg-[#0D0D0D] border border-[#F5F5F5]/10 rounded-lg py-2 px-3 appearance-none focus:outline-none focus:border-[#FF007F]"
                        >
                            <option value="public">Public - Anyone can view</option>
                            <option value="friends">Friends Only</option>
                            <option value="private">Private - Only me</option>
                        </select>
                        <ChevronDown
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#F5F5F5]/40"
                            size={16}
                        />
                    </div>
                </div>
                <div>
                    <label htmlFor="privacyActivity" className="block text-sm font-medium mb-1">
                        Activity Visibility
                    </label>
                    <div className="relative">
                        <select
                            id="privacyActivity"
                            name="privacyActivity"
                            value={formData.privacyActivity}
                            onChange={handleInputChange}
                            className="w-full bg-[#0D0D0D] border border-[#F5F5F5]/10 rounded-lg py-2 px-3 appearance-none focus:outline-none focus:border-[#FF007F]"
                        >
                            <option value="public">Public - Anyone can view</option>
                            <option value="friends">Friends Only</option>
                            <option value="private">Private - Only me</option>
                        </select>
                        <ChevronDown
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#F5F5F5]/40"
                            size={16}
                        />
                    </div>
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
