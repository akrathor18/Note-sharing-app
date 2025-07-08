import { Save, Moon } from 'lucide-react';

export default function SettingsAppearance({ formData, handleInputChange }) {
    return (
        <div>
            <h2 className="text-lg font-bold mb-4">Appearance Settings</h2>
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="font-medium">Dark Mode</p>
                        <p className="text-sm text-[#F5F5F5]/60">
                            Toggle between light and dark themes
                        </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            name="darkMode"
                            checked={formData.darkMode}
                            onChange={handleInputChange}
                            className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-[#0D0D0D] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FF007F]"></div>
                        <Moon
                            className={`ml-2 ${formData.darkMode ? 'text-[#F5F5F5]' : 'text-[#F5F5F5]/40'}`}
                            size={16}
                        />
                    </label>
                </div>
                <div className="pt-4">
                    <p className="font-medium mb-2">Color Theme</p>
                    <div className="grid grid-cols-5 gap-2">
                        <button
                            type="button"
                            className="w-full aspect-square rounded-full bg-[#FF007F] ring-2 ring-[#FF007F] ring-offset-2 ring-offset-[#1A1A1A]"
                        ></button>
                        <button
                            type="button"
                            className="w-full aspect-square rounded-full bg-[#00E5FF]"
                        ></button>
                        <button
                            type="button"
                            className="w-full aspect-square rounded-full bg-[#9C27B0]"
                        ></button>
                        <button
                            type="button"
                            className="w-full aspect-square rounded-full bg-[#4CAF50]"
                        ></button>
                        <button
                            type="button"
                            className="w-full aspect-square rounded-full bg-[#FF9800]"
                        ></button>
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
