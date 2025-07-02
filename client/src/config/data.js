// Sample data for dashbaord
export const recentNotes = [
    {
        id: 1,
        title: 'Data Structures & Algorithms',
        subject: 'Computer Science',
        date: '2 days ago',
    },
    {
        id: 2,
        title: 'Organic Chemistry Reactions',
        subject: 'Chemistry',
        date: '1 week ago',
    },
    {
        id: 3,
        title: 'Calculus II: Integration',
        subject: 'Mathematics',
        date: '2 weeks ago',
    },
];

export const upcomingQuizzes = [
    {
        id: 1,
        title: 'Database Systems',
        date: 'Tomorrow, 2:00 PM',
        questions: 20,
    },
    { id: 2, title: 'Modern Physics', date: 'Friday, 10:00 AM', questions: 15 },
];

// Notes
export const subjects = [
    { id: 'all', name: 'All Subjects' },
    { id: 'cs', name: 'Computer Science' },
    { id: 'math', name: 'Mathematics' },
    { id: 'physics', name: 'Physics' },
    { id: 'chemistry', name: 'Chemistry' },
    { id: 'biology', name: 'Biology' },
    { id: 'CE', name: 'civil engineering' },
    { id: 'ME', name: 'mechanical engineering' },
];

// ----------------------
// Profile Page Mock Data
// ----------------------

/**
 * Sample recent activity for the Profile page.
 * Each activity can be a note or quiz action.
 */
export const recentActivity = [
    { id: 1, type: 'note', action: 'created', title: 'Data Structures & Algorithms', date: '2 days ago' },
    { id: 2, type: 'quiz', action: 'completed', title: 'Organic Chemistry', score: '85%', date: '3 days ago' },
    { id: 3, type: 'note', action: 'updated', title: 'Calculus II: Integration', date: '1 week ago' },
    { id: 4, type: 'quiz', action: 'started', title: 'Physics Mechanics', date: '1 week ago' },
    { id: 5, type: 'note', action: 'downloaded', title: 'Biology Cell Structure', date: '2 weeks ago' },
];

/**
 * Sample notes created by the user for the Profile page.
 */
export const userNotes = [
    { id: 1, title: 'Data Structures & Algorithms', subject: 'Computer Science', date: 'Oct 15, 2023', downloads: 128 },
    { id: 2, title: 'Organic Chemistry Reactions', subject: 'Chemistry', date: 'Oct 22, 2023', downloads: 112 },
    { id: 3, title: 'Calculus II: Integration', subject: 'Mathematics', date: 'Sep 28, 2023', downloads: 95 },
];

/**
 * Sample quizzes taken by the user for the Profile page.
 */
export const userQuizzes = [
    { id: 1, title: 'Database Systems', subject: 'Computer Science', date: 'Nov 10, 2023', score: '90%' },
    { id: 2, title: 'Organic Chemistry', subject: 'Chemistry', date: 'Nov 5, 2023', score: '85%' },
    { id: 3, title: 'Calculus Derivatives', subject: 'Mathematics', date: 'Oct 20, 2023', score: '75%' },
];

/**
 * Sample achievements for the Profile page.
 * Each achievement includes an icon from lucide-react.
 */
import { Award, BookOpen, Zap, Bookmark, Star } from 'lucide-react';
export const achievements = [
    { id: 1, title: 'Quiz Master', description: 'Completed 10 quizzes with a score of 80% or higher', icon: Award, progress: 80, color: '#FF007F' },
    { id: 2, title: 'Note Creator', description: 'Created 5 notes that have been downloaded by others', icon: BookOpen, progress: 60, color: '#00E5FF' },
    { id: 3, title: 'Study Streak', description: 'Studied for 7 consecutive days', icon: Zap, progress: 100, color: '#FFD700' },
    { id: 4, title: 'Knowledge Sharer', description: 'Shared notes with 10 other students', icon: Bookmark, progress: 40, color: '#4CAF50' },
    { id: 5, title: 'Perfect Score', description: 'Achieved 100% on 3 quizzes', icon: Star, progress: 33, color: '#FF9800' },
];

import { MessageSquare, Bug, Lightbulb, Heart, Smile, Meh, Frown } from 'lucide-react';

export const feedbackTypes = [
    {
        id: "general",
        label: "General Feedback",
        icon: MessageSquare,
        color: "#00E5FF",
        description: "Share your overall thoughts about StudyHub",
    },
    {
        id: "bug",
        label: "Bug Report",
        icon: Bug,
        color: "#FF6B6B",
        description: "Report issues or problems you've encountered",
    },
    {
        id: "feature",
        label: "Feature Request",
        icon: Lightbulb,
        color: "#FFD93D",
        description: "Suggest new features or improvements",
    },
    {
        id: "praise",
        label: "Praise & Thanks",
        icon: Heart,
        color: "#FF007F",
        description: "Share what you love about StudyHub",
    },
];

export const experienceOptions = [
    { value: "excellent", label: "Excellent", icon: Smile, color: "#4CAF50" },
    { value: "good", label: "Good", icon: Smile, color: "#8BC34A" },
    { value: "average", label: "Average", icon: Meh, color: "#FFC107" },
    { value: "poor", label: "Poor", icon: Frown, color: "#FF9800" },
    { value: "terrible", label: "Terrible", icon: Frown, color: "#F44336" },
];

export const faqs = [
    {
        question: "How do you use our feedback?",
        answer:
            "We carefully review every piece of feedback to improve StudyHub. Your suggestions directly influence our development roadmap and help us prioritize new features.",
    },
    {
        question: "Will I get a response to my feedback?",
        answer:
            "Yes! Since we now require contact information, we'll respond to all feedback within 48 hours. For bug reports, we'll keep you updated on the fix progress.",
    },
    {
        question: "Is my personal information secure?",
        answer:
            "We use industry-standard encryption to protect your data. Your information is only used to respond to your feedback and will never be shared with third parties.",
    },
    {
        question: "How long does it take to implement suggestions?",
        answer:
            "Implementation time varies based on complexity and priority. Simple fixes might be deployed within days, while major features could take several weeks or months. We'll keep you informed of progress.",
    },
    {
        question: "Can I submit multiple feedback items?",
        answer:
            "Yes! Feel free to submit feedback as often as you'd like. Each submission helps us understand your needs better and improve the platform continuously.",
    },
];