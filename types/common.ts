// Common types for use across client and backend

export interface UserStats {
    notesCreated: number;
    notesViewed: number;
    quizzesTaken: number;
    quizzesPassed: number;
    studyHours: number;
}

export interface User {
    id: string;
    name: string;
    email: string;
    avatar: string | null;
    role: 'Student' | 'Teacher' | 'Admin' | string;
    joinDate: string;
    stats: UserStats;
}

export interface SettingsFormData {
    email: string;
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
    role: 'Student' | 'Teacher' | 'Admin' | string;
    emailNotifications: boolean;
    quizReminders: boolean;
    studyReminders: boolean;
    darkMode: boolean;
    language: string;
    privacyProfile: string;
    privacyActivity: string;
}

export interface Quiz {
    _id: string;
    title: string;
    category: string;
    difficulty: 'Easy' | 'Medium' | 'Hard' | string;
    questions: Array<any>; // Replace 'any' with a proper Question type if available
    timeLimit: number;
}

export interface SignInFormData {
    email: string;
    password: string;
}

export interface SignUpFormData {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    terms: boolean;
} 

export interface Note {
    _id: string;
    title: string;
    description?: string;
    subject: string;
    uploadedBy: string;
    fileUrl: string;
    fileType: string;
    createdAt: string;
    totalDownloads: number;
    totalViews: number;
    pages: number;
}