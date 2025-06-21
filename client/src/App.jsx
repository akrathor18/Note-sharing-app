import {  createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css"

import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./auth/ProtectedRoute.jsx";
import Navbar from "./components/navBar.jsx"
import Dashboard from "./components/Dashboard.jsx";
import Notes from "./components/Notes.jsx";
import Quiz from "./components/Quiz.jsx";
import Profile from "./components/Profile.jsx";
import Settings from "./components/Settings.jsx";
import SearchResults from "./components/SearchResults.jsx";
import SignIn from "./components/SignIn.jsx";
import SignUp from "./components/SignUp.jsx";
import NotFound from "./components/NotFound.jsx";
import CreateQuiz from "./components/CreateQuiz.jsx";
import QuizScreen from "./components/QuizScreen.jsx";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navbar />,
      children: [
        {
          element: <ProtectedRoute />, // <<=== Protect all child routes
          children: [
            { index: true, element: <Dashboard /> },
            { path: "notes", element: <Notes /> },
            { path: "quizzes", element: <Quiz /> },
            { path: "profile", element: <Profile /> },
            { path: "settings", element: <Settings /> },
            { path: "search", element: <SearchResults /> },
            { path: "createquiz", element: <CreateQuiz /> },
            { path: "/quiz/:id", element: <QuizScreen /> },
          ],
        },
      ],
    },
    {
      path: "*",
      element: <NotFound />,
    },
    {
      path: "/signup",
      element: <SignUp />,
    },
    {
      path: "/signin",
      element: <SignIn />,
    },
  ]);
  
  
  
  return (
    <>
       <ToastContainer 
    position="top-right"
    autoClose={3000}
    hideProgressBar={false}
    closeOnClick
    pauseOnHover
    draggable
    theme="dark" 
  />
    <div className="flex flex-col h-screen">
        <RouterProvider router={router} />
    </div>
    </>
  )
}

export default App

