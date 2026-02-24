import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import {
    BookOpen,
    Home,
    FileText,
    BrainCircuit,
    Bell,
    Search,
    User,
    Menu,
    X,
    LogOut,
    SettingsIcon,
    UserCircle,
} from 'lucide-react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import API from '../config/axios';
import { removeToken, handleAuthError } from '../utils/auth';
import { useUserStore } from "../store/userStore.js";

function navBar() {
    const { user } = useUserStore();
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(true);
    const [authView, setAuthView] = useState('signin');
    const [searchQuery, setSearchQuery] = useState('');
    const [notifications, setNotifications] = useState([
        { id: 1, title: 'Quiz reminder', message: "Don't forget your Database Systems quiz tomorrow", read: false },
        { id: 2, title: 'New note shared', message: 'Alex shared a note with you: Organic Chemistry', read: false },
        { id: 3, title: 'Study streak', message: "You've been studying for 5 days in a row!", read: true },
    ]);

    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    const toggleUserMenu = () => {
        setIsUserMenuOpen(!isUserMenuOpen);
        if (!isUserMenuOpen) setIsNotificationMenuOpen(false);
    };

    const [isNotificationMenuOpen, setIsNotificationMenuOpen] = useState(false);

    const toggleNotificationMenu = () => {
        setIsNotificationMenuOpen(!isNotificationMenuOpen);
        if (!isNotificationMenuOpen) setIsUserMenuOpen(false);
    };

    const markAsRead = (id) => {
        setNotifications(
            notifications.map((notification) =>
                notification.id === id ? { ...notification, read: true } : notification,
            ),
        );
    };

    const handleLogout = async () => {
        try {
            const response = await API.post('/auth/logout');
            if (response.status === 200) {
                removeToken();
                setIsAuthenticated(false);
                navigate('/');
                toast.success('Logged out successfully');
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim() !== '') {
            navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isUserMenuOpen && !event.target.closest('.user-menu-container')) {
                setIsUserMenuOpen(false);
            }
            if (isNotificationMenuOpen && !event.target.closest('.notification-menu-container')) {
                setIsNotificationMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isUserMenuOpen, isNotificationMenuOpen]);

    const navLinkClass = ({ isActive }) =>
        `w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 text-sm ${
            isActive
                ? 'bg-[#FF007F]/10 text-[#FF007F]'
                : 'hover:bg-[#0d0d0d] text-white/70 hover:text-white'
        }`;

    return (
        <div className="flex h-screen bg-[#0D0D0D] text-[#F5F5F5] relative">

            {/* Sidebar */}
            <div
                className={`${
                    isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
                } md:translate-x-0 fixed md:static inset-y-0 z-20 left-0 w-64 bg-[#1A1A1A] border-r border-white/[0.05] p-4 flex flex-col transition-transform duration-300 ease-in-out overflow-y-auto`}
            >
                {/* Logo + mobile close */}
                <div className="flex justify-between items-center mb-1">
                    <NavLink to={'/'} className="flex items-center gap-2">
                        <BookOpen className="text-[#FF007F]" size={22} />
                        <h1 className="text-xl font-bold tracking-tight">StudyHub</h1>
                    </NavLink>
                    <button
                        onClick={toggleMobileMenu}
                        className="md:hidden p-2 rounded-lg hover:bg-white/[0.06] text-white/50 transition-colors"
                    >
                        {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>

                {/* Nav links */}
                <nav className="flex-1 mt-6 border-t border-white/[0.06] pt-4">
                    <ul className="space-y-1">
                        <li>
                            <NavLink to={'/Dashboard'} className={navLinkClass}>
                                <Home size={19} />
                                <span>Dashboard</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={'/notes'} className={navLinkClass}>
                                <FileText size={19} />
                                <span>Notes</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={'/quizzes'} className={navLinkClass}>
                                <BrainCircuit size={19} />
                                <span>Quizzes</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={'/profile'} className={navLinkClass}>
                                <UserCircle size={19} />
                                <span>Profile</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={'/settings'} className={navLinkClass}>
                                <SettingsIcon size={19} />
                                <span>Settings</span>
                            </NavLink>
                        </li>
                    </ul>
                </nav>

                {/* User footer */}
                <div className="mt-auto pt-4 border-t border-white/[0.06]">
                    <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/[0.04] transition-colors">
                        <div className="w-8 h-8 rounded-full bg-[#00E5FF]/20 border border-[#00E5FF]/20 flex items-center justify-center text-[#00E5FF] text-xs font-bold shrink-0">
                            {user?.name?.toUpperCase().charAt(0) || 'U'}
                        </div>
                        <div className="min-w-0">
                            <p className="text-sm font-medium capitalize truncate">{user?.name || 'User'}</p>
                            <p className="text-xs text-white/40 capitalize truncate">{user?.role?.role_name || 'Student'}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-auto w-full">

                {/* Header */}
                <header className="bg-[#1A1A1A] border-b border-white/[0.05] px-4 py-3 flex items-center justify-between sticky top-0 z-10">

                    {/* Mobile menu toggle */}
                    <button
                        onClick={toggleMobileMenu}
                        className="md:hidden p-2 rounded-lg hover:bg-white/[0.06] text-white/50 transition-colors"
                    >
                        {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>

                    {/* Search */}
                    <div className="relative w-full max-w-md ml-auto md:ml-0">
                        <form onSubmit={handleSearch}>
                            <Search
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none"
                                size={16}
                            />
                            <input
                                type="text"
                                placeholder="Search notes, quizzes..."
                                className="w-full bg-[#0D0D0D] border border-white/[0.08] hover:border-white/[0.14] rounded-xl py-2 pl-9 pr-4 text-sm text-white/80 placeholder-white/25 focus:outline-none focus:border-[#FF007F]/50 transition-colors"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </form>
                    </div>

                    {/* Right actions */}
                    <div className="flex items-center gap-2">
                        <div className="relative user-menu-container">
                            <button
                                onClick={toggleUserMenu}
                                className="p-2 rounded-full hover:bg-white/[0.06] text-white/60 hover:text-white transition-colors"
                            >
                                <User size={19} />
                            </button>

                            {/* User Dropdown */}
                            {isUserMenuOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-[#1A1A1A] rounded-xl shadow-2xl shadow-black/50 border border-white/[0.08] py-1.5 z-50">
                                    <NavLink
                                        to={'/profile'}
                                        className={({ isActive }) =>
                                            `flex items-center gap-2.5 px-3 py-2.5 text-sm transition-colors ${
                                                isActive
                                                    ? 'text-[#FF007F] bg-[#FF007F]/08'
                                                    : 'text-white/60 hover:text-white hover:bg-white/[0.05]'
                                            }`
                                        }
                                    >
                                        <UserCircle size={15} />
                                        <span>Profile</span>
                                    </NavLink>
                                    <NavLink
                                        to={'/settings'}
                                        className={({ isActive }) =>
                                            `flex items-center gap-2.5 px-3 py-2.5 text-sm transition-colors ${
                                                isActive
                                                    ? 'text-[#FF007F] bg-[#FF007F]/08'
                                                    : 'text-white/60 hover:text-white hover:bg-white/[0.05]'
                                            }`
                                        }
                                    >
                                        <SettingsIcon size={15} />
                                        <span>Settings</span>
                                    </NavLink>
                                    <div className="border-t border-white/[0.06] my-1" />
                                    <button
                                        onClick={handleLogout}
                                        className="w-full flex items-center gap-2.5 px-3 py-2.5 text-sm text-[#FF007F]/70 hover:text-[#FF007F] hover:bg-[#FF007F]/08 transition-colors"
                                    >
                                        <LogOut size={15} />
                                        <span>Logout</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </header>

                {/* Content */}
                <main className="p-4 md:p-6">
                    <Outlet />
                </main>
            </div>

            {/* Mobile overlay */}
            {isMobileMenuOpen && (
                <div
                    className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-10"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}
        </div>
    );
}

export default navBar;