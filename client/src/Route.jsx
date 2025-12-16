import LandingPage from './pages/LandingPage.jsx';
import ProtectedRoute from './auth/ProtectedRoute.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Notes from './pages/Notes.jsx';
import Quiz from './pages/Quiz.jsx';
import Profile from './pages/Profile.jsx';
import Settings from './pages/Settings.jsx';
import SearchResults from './pages/SearchResults.jsx';
import SignIn from './pages/SignIn.jsx';
import SignUp from './pages/SignUp.jsx';
import NotFound from './pages/NotFound.jsx';
import CreateQuiz from './pages/CreateQuiz.jsx';
import QuizScreen from './pages/QuizScreen.jsx';
import Feedback from './pages/Feedback.jsx';

import Navbar from './components/NavBar.jsx';

const routes = [
    // Public routes
    {
        path: '/',
        element: <LandingPage />,
    },
    {
        path: '/signin',
        element: <SignIn />,
    },
    {
        path: '/signup',
        element: <SignUp />,
    },
    {
        path: '*',
        element: <NotFound />,
    },

    // Protected routes
    {
        element: (
            <Navbar />
        ),
        children: [
            {
                element: <ProtectedRoute />,
                children: [
                    { path: 'dashboard', element: <Dashboard /> },
                    { path: 'notes', element: <Notes /> },
                    { path: 'quizzes', element: <Quiz /> },
                    { path: 'profile', element: <Profile /> },
                    { path: 'settings', element: <Settings /> },
                    { path: 'search', element: <SearchResults /> },
                    { path: 'quizzes/createquiz', element: <CreateQuiz /> },
                    { path: 'quizzes/:id', element: <QuizScreen /> },
                    { path: 'feedback', element: <Feedback /> },
                ],
            }]
    },
];

export default routes;
