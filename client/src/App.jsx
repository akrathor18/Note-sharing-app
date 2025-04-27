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
    <div className="flex flex-col h-screen">
       <ToastContainer 
    position="top-right"
    autoClose={3000}
    hideProgressBar={false}
    closeOnClick
    pauseOnHover
    draggable
    theme="dark" 
  />
        <RouterProvider router={router} />
    </div>
  )
}

export default App

