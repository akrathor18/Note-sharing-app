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
    const {user} = useUserStore();
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(true);
    const [authView, setAuthView] = useState('signin'); // signin, signup
    const [searchQuery, setSearchQuery] = useState('');
    const [notifications, setNotifications] = useState([
        {
            id: 1,
            title: 'Quiz reminder',
            message: "Don't forget your Database Systems quiz tomorrow",
            read: false,
        },
        {
            id: 2,
            title: 'New note shared',
            message: 'Alex shared a note with you: Organic Chemistry',
            read: false,
        },
        {
            id: 3,
            title: 'Study streak',
            message: "You've been studying for 5 days in a row!",
            read: true,
        },
    ]);

    // Toggle mobile menu
    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    // Toggle user menu
    const toggleUserMenu = () => {
        setIsUserMenuOpen(!isUserMenuOpen);
        // Close other menus when user menu is opened
        if (!isUserMenuOpen) {
            setIsNotificationMenuOpen(false);
        }
    };

    // Notification menu state
    const [isNotificationMenuOpen, setIsNotificationMenuOpen] = useState(false);

    // Toggle notification menu
    const toggleNotificationMenu = () => {
        setIsNotificationMenuOpen(!isNotificationMenuOpen);
        // Close other menus when notification menu is opened
        if (!isNotificationMenuOpen) {
            setIsUserMenuOpen(false);
        }
    };

    // Mark notification as read
    const markAsRead = (id) => {
        setNotifications(
            notifications.map((notification) =>
                notification.id === id ? { ...notification, read: true } : notification,
            ),
        );
    };

    const handleLogout = async () => {
        try {
            const response = await API.post('/users/logout');
            if (response.status === 200) {
                removeToken();
                setIsAuthenticated(false);
                // setUser(null);
                navigate('/');
                toast.success('Logged out successfully');
            }
        } catch (error) {
            console.log(error)
        }
    };

    // Handle search
    const handleSearch = (e) => {
        e.preventDefault();
        console.log('clicked');
        if (searchQuery.trim() !== '') {
            navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
        }
    };

    // Close menus when clicking outside
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
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isUserMenuOpen, isNotificationMenuOpen]);

    // If not authenticated, show auth screens

    return (
        <div className="flex h-screen bg-[#0D0D0D] text-[#F5F5F5] relative">
            {/* Mobile Menu Button */}
            <button
                onClick={toggleMobileMenu}
                className="md:hidden fixed top-4 left-4 z-30 p-2 rounded-lg bg-[#1A1A1A] text-[#F5F5F5]"
            >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Sidebar - Desktop always visible, Mobile as overlay */}
            <div
                className={`${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
                    } md:translate-x-0 fixed md:static inset-y-0 left-0 z-20 w-64 bg-[#1A1A1A] p-4 flex flex-col transition-transform duration-300 ease-in-out overflow-y-auto`}
            >
                <NavLink to={'/'} className="flex items-center gap-2 mb-8">
                    <BookOpen className="text-[#FF007F]" />
                    <h1 className="text-xl font-bold">StudyHub</h1>
                </NavLink>

                <nav className="flex-1">
                    <ul className="space-y-2">
                        <li>
                            <NavLink
                                to={'/Dashboard'}
                                className={({ isActive }) =>
                                    `w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${isActive
                                        ? 'bg-[#FF007F]/10 text-[#FF007F]' // Active state
                                        : 'hover:bg-[#1A1A1A]/80 text-white' // Default & hover state
                                    }`
                                }
                            >
                                <Home size={20} />
                                <span>Dashboard</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to={'/notes'}
                                className={({ isActive }) =>
                                    `w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${isActive
                                        ? 'bg-[#FF007F]/10 text-[#FF007F]' // Active state
                                        : 'hover:bg-[#1A1A1A]/80 text-white' // Default & hover state
                                    }`
                                }
                            >
                                <FileText size={20} />
                                <span>Notes</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to={'/quizzes'}
                                className={({ isActive }) =>
                                    `w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${isActive
                                        ? 'bg-[#FF007F]/10 text-[#FF007F]' // Active state
                                        : 'hover:bg-[#1A1A1A]/80 text-white' // Default & hover state
                                    }`
                                }
                            >
                                <BrainCircuit size={20} />
                                <span>Quizzes</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to={'/profile'}
                                className={({ isActive }) =>
                                    `w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${isActive
                                        ? 'bg-[#FF007F]/10 text-[#FF007F]' // Active state
                                        : 'hover:bg-[#1A1A1A]/80 text-white' // Default & hover state
                                    }`
                                }
                            >
                                <UserCircle size={20} />
                                <span>Profile</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to={'/settings'}
                                className={({ isActive }) =>
                                    `w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${isActive
                                        ? 'bg-[#FF007F]/10 text-[#FF007F]' // Active state
                                        : 'hover:bg-[#1A1A1A]/80 text-white' // Default & hover state
                                    }`
                                }
                            >
                                <SettingsIcon size={20} />
                                <span>Settings</span>
                            </NavLink>
                        </li>
                    </ul>
                </nav>

                <div className="mt-auto pt-4 border-t border-[#F5F5F5]/10">
                    <div className="flex items-center gap-3 p-2">
                        <div className="w-8 h-8 rounded-full bg-[#00E5FF] flex items-center justify-center text-[#0D0D0D] font-bold">
                            {user?.name.toUpperCase().charAt(0) || 'U'}
                        </div>
                        <div>
                            <p className="text-sm font-medium capitalize">{user?.name || 'User'}</p>
                            <p className="text-xs text-[#F5F5F5]/60 capitalize">{user?.role.role_name || 'Student'}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-auto w-full">
                {/* Header */}
                <header className="index bg-[#1A1A1A] p-4 flex items-center justify-between sticky top-0">
                    <div className="relative w-full max-w-xs ml-auto md:ml-0">
                        <form onSubmit={handleSearch}>
                            <Search
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#F5F5F5]/40"
                                size={18}
                            />
                            <input
                                type="text"
                                placeholder="Search notes, quizzes..."
                                className="w-full bg-[#0D0D0D] border border-[#F5F5F5]/10 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:border-[#FF007F] transition-colors"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </form>
                    </div>

                    <div className="flex items-center gap-4">
                        {/* <div className="relative notification-menu-container"> */}
                            {/* <button
                                onClick={toggleNotificationMenu}
                                className="relative p-2 rounded-full hover:bg-[#F5F5F5]/5 transition-colors"
                            >
                                <Bell size={20} />
                                {notifications.some((n) => !n.read) && (
                                    <span className="absolute top-1 right-1 w-2 h-2 bg-[#FF007F] rounded-full"></span>
                                )}
                            </button> */}

                            {/* Notification Dropdown */}
                            {/* {isNotificationMenuOpen && (
                                <div className="absolute xs:right-0 -right-14 mt-2 w-80 bg-[#1A1A1A] rounded-lg shadow-lg border border-[#F5F5F5]/10 py-1 z-50">
                                    <div className="px-4 py-2 border-b border-[#F5F5F5]/10">
                                        <h3 className="font-medium">Notifications</h3>
                                    </div>

                                    <div className="max-h-80 overflow-y-auto">
                                        {notifications.length > 0 ? (
                                            notifications.map((notification) => (
                                                <div
                                                    key={notification.id}
                                                    className={`px-4 py-3 border-b border-[#F5F5F5]/5 hover:bg-[#F5F5F5]/5 ${!notification.read ? 'bg-[#FF007F]/5' : ''}`}
                                                    onClick={() => markAsRead(notification.id)}
                                                >
                                                    <div className="flex justify-between items-start">
                                                        <h4 className="font-medium text-sm">
                                                            {notification.title}
                                                        </h4>
                                                        {!notification.read && (
                                                            <span className="w-2 h-2 bg-[#FF007F] rounded-full"></span>
                                                        )}
                                                    </div>
                                                    <p className="text-xs text-[#F5F5F5]/70 mt-1">
                                                        {notification.message}
                                                    </p>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="px-4 py-3 text-center text-[#F5F5F5]/60">
                                                No notifications
                                            </div>
                                        )}
                                    </div>

                                    <div className="px-4 py-2 border-t border-[#F5F5F5]/10">
                                        <button className="text-[#00E5FF] text-xs hover:underline w-full text-center">
                                            Mark all as read
                                        </button>
                                    </div>
                                </div>
                            )} */}
                        {/* </div> */}

                        <div className="relative user-menu-container">
                            <button
                                onClick={toggleUserMenu}
                                className="p-2 rounded-full hover:bg-[#F5F5F5]/5 transition-colors"
                            >
                                <User size={20} />
                            </button>

                            {/* User Dropdown Menu */}
                            {isUserMenuOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-[#1A1A1A] rounded-lg shadow-lg border border-[#F5F5F5]/10 py-1 z-50">
                                    <NavLink
                                        to={'/profile'}
                                        className={({ isActive }) =>
                                            `w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${isActive
                                                ? 'bg-[#FF007F]/10 text-[#FF007F]' // Active state
                                                : 'hover:bg-[#1A1A1A]/80 text-white' // Default & hover state
                                            }`
                                        }
                                    >
                                        <UserCircle size={16} />
                                        <span>Profile</span>
                                    </NavLink>
                                    <NavLink
                                        to={'/settings'}
                                        className={({ isActive }) =>
                                            `w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${isActive
                                                ? 'bg-[#FF007F]/10 text-[#FF007F]' // Active state
                                                : 'hover:bg-[#1A1A1A]/80 text-white' // Default & hover state
                                            }`
                                        }
                                    >
                                        <SettingsIcon size={16} />
                                        <span>Settings</span>
                                    </NavLink>
                                    <div className="border-t border-[#F5F5F5]/10 my-1"></div>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-left px-4 py-2 hover:bg-[#F5F5F5]/5 text-[#FF007F] flex items-center gap-2"
                                    >
                                        <LogOut size={16} />
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

            {/* Overlay for mobile menu */}
            {isMobileMenuOpen && (
                <div
                    className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-10"
                    onClick={() => setIsMobileMenuOpen(false)}
                ></div>
            )}
        </div>
    );
}

export default navBar;