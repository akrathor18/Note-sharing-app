import { useState, useEffect } from 'react';
import API from '../config/axios';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import SettingsSkeleton from '../components/settings/SettingsSkeleton';
import SettingsSidebar from '../components/settings/SettingsSidebar';
import SettingsAccount from '../components/settings/SettingsAccount';
import SettingsNotifications from '../components/settings/SettingsNotifications';
import SettingsAppearance from '../components/settings/SettingsAppearance';
import SettingsLanguage from '../components/settings/SettingsLanguage';
import SettingsPrivacy from '../components/settings/SettingsPrivacy';
import SettingsSecurity from '../components/settings/SettingsSecurity';

import { User, SettingsFormData } from '../../../types/common';
import { ChangePasswordRequest, UserProfileResponse } from '../../../types/api/user';

// export default function Settings({ user, setUser }) {
export default function Settings() {
    const [loading, setLoading] = useState<boolean>(true);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [activeSection, setActiveSection] = useState<string>('account');
    const [userData, setUserData] = useState<User>({
        id: 'user123',
        name: 'John Doe',
        email: 'john.doe@example.com',
        avatar: null,
        role: 'Student',
        joinDate: 'January 2023',
        stats: {
            notesCreated: 12,
            notesViewed: 45,
            quizzesTaken: 8,
            quizzesPassed: 7,
            studyHours: 24,
        },
    });

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting, isSubmitSuccessful },
    } = useForm<SettingsFormData>();

    const newPassword = watch('newPassword');

    const onSubmit = async (data: SettingsFormData) => {
        try {
            const payload: ChangePasswordRequest = {
                password: data.currentPassword,
                newPassword: data.newPassword,
            };
            const response = await API.post<string>('/users/changepassword', payload);
            toast.success(response.data);
        } catch (error: unknown) {
            if (error && typeof error === 'object' && 'response' in error && error.response && typeof error.response === 'object' && 'data' in error.response) {
                toast.error((error as any).response.data);
                console.error((error as any).response.data);
            } else {
                toast.error('An unexpected error occurred.');
                console.error(error);
            }
        }
    };

    const showalter = () => alert('We are still working on this feature!');

    const fetchUserDetail = async () => {
        setTimeout(async () => {
            try {
                const response = await API.get<UserProfileResponse>('/users/profile');
                setUserData(response.data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }, 1000);
    };

    useEffect(() => {
        fetchUserDetail();
    }, []);

    const formatDate = (isoDate: string): string => {
        const date = new Date(isoDate);
        return date.toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
    };

    const [formData, setFormData] = useState<SettingsFormData>({
        email: userData.email,
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
        role: 'Student',
        emailNotifications: true,
        quizReminders: true,
        studyReminders: false,
        darkMode: true,
        language: 'english',
        privacyProfile: 'public',
        privacyActivity: 'friends',
    });
    const [successMessage, setSuccessMessage] = useState<string>('');

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const { name, value, type } = e.target;
        let checked = false;
        if (type === 'checkbox' && 'checked' in e.target) {
            checked = (e.target as HTMLInputElement).checked;
        }
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleFormChange = (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        const target = e.target as typeof e.target & (HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement);
        const { name, value, type } = target;
        let checked = false;
        if (type === 'checkbox' && 'checked' in target) {
            checked = (target as HTMLInputElement).checked;
        }
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
        // Optionally, you can call handleInputChange if you want to sync
        // handleInputChange(e as any); // Not needed if logic is duplicated here
    };

    if (loading) {
        return <SettingsSkeleton />;
    }

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Settings</h1>

            {/* Success Message */}
            {successMessage && (
                <div className="bg-green-500/20 text-green-500 p-3 rounded-lg mb-6">
                    {successMessage}
                </div>
            )}

            <div className="flex flex-col md:flex-row gap-6">
                <SettingsSidebar
                    activeSection={activeSection}
                    setActiveSection={setActiveSection}
                />
                <div className="flex-1 bg-[#1A1A1A] rounded-xl p-6">
                    {/* Section Switcher */}
                    {activeSection === 'account' && (
                        <form onSubmit={handleFormChange}>
                            <SettingsAccount
                                userData={userData}
                                formData={formData}
                                handleFormChange={handleFormChange}
                                formatDate={formatDate}
                            />
                        </form>
                    )}
                    {activeSection === 'notifications' && (
                        <form onSubmit={handleFormChange}>
                            <SettingsNotifications
                                formData={formData}
                                handleFormChange={handleFormChange}
                            />
                        </form>
                    )}
                    {activeSection === 'appearance' && (
                        <form onSubmit={handleFormChange}>
                            <SettingsAppearance
                                formData={formData}
                                handleInputChange={handleInputChange}
                            />
                        </form>
                    )}
                    {activeSection === 'language' && (
                        <form onSubmit={handleFormChange}>
                            <SettingsLanguage
                                formData={formData}
                                handleInputChange={handleInputChange}
                            />
                        </form>
                    )}
                    {activeSection === 'privacy' && (
                        <form onSubmit={handleFormChange}>
                            <SettingsPrivacy
                                formData={formData}
                                handleInputChange={handleInputChange}
                            />
                        </form>
                    )}
                    {activeSection === 'security' && (
                        <SettingsSecurity
                            showPassword={showPassword}
                            setShowPassword={setShowPassword}
                            errors={errors}
                            register={register}
                            isSubmitting={isSubmitting}
                            newPassword={newPassword}
                            handleSubmit={handleSubmit}
                            onSubmit={onSubmit}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
