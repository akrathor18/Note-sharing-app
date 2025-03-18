import {  createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css"

import Navbar from "./components/navBar.jsx"
import Dashboard from "./components/Dashboard.jsx";
import Notes from "./components/Notes.jsx";
import Quiz from "./components/Quiz.jsx";
import Profile from "./components/Profile.jsx";
import Settings from "./components/Settings.jsx";
import SignIn from "./components/SignIn.jsx";
import SignUp from "./components/SignUp.jsx";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navbar />,
      children: [
        {
          index: true,
          element: <Dashboard />,
        },
        {
          path: "notes",
          element: <Notes />,
        },
        {
          path: "quizzes",
          element: <Quiz />,
        },
        {
          path: "profile",
          element: <Profile />,
        },
        {
          path: "settings",
          element: <Settings />,
        },
      ],
    },
    {
      path: "/sign-in",
      element: <SignIn />,
    },
    {
      path: "/sign-up",
      element: <SignUp />,
    },
  ]);
  
  
  return (
    <div className="flex flex-col h-screen">
        <RouterProvider router={router} />
    </div>
  )
}

export default App

