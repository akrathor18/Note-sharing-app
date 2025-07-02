import { Save, ChevronDown } from 'lucide-react';

export default function SettingsLanguage({ formData, handleInputChange }) {
    return (
        <div>
            <h2 className="text-lg font-bold mb-4">Language Settings</h2>
            <div className="space-y-4">
                <div>
                    <label htmlFor="language" className="block text-sm font-medium mb-1">
                        Display Language
                    </label>
                    <div className="relative">
                        <select
                            id="language"
                            name="language"
                            value={formData.language}
                            onChange={handleInputChange}
                            className="w-full bg-[#0D0D0D] border border-[#F5F5F5]/10 rounded-lg py-2 px-3 appearance-none focus:outline-none focus:border-[#FF007F]"
                        >
                            <option value="english">English</option>
                            <option value="spanish">Spanish</option>
                            <option value="french">French</option>
                            <option value="german">German</option>
                            <option value="chinese">Chinese</option>
                            <option value="japanese">Japanese</option>
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
