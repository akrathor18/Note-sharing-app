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

import Navbar from './components/NavBar.jsx';

const routes = [
    {
        path: '/',
        element: <Navbar />,
        children: [
            {
                element: <ProtectedRoute />,
                children: [
                    { index: true, element: <Dashboard /> },
                    { path: 'notes', element: <Notes /> },
                    { path: 'quizzes', element: <Quiz /> },
                    { path: 'profile', element: <Profile /> },
                    { path: 'settings', element: <Settings /> },
                    { path: 'search', element: <SearchResults /> },
                    { path: 'createquiz', element: <CreateQuiz /> },
                    { path: '/quiz/:id', element: <QuizScreen /> },
                ],
            },
        ],
    },
    {
        path: '*',
        element: <NotFound />,
    },
    {
        path: '/signup',
        element: <SignUp />,
    },
    {
        path: '/signin',
        element: <SignIn />,
    },
];

export default routes;
