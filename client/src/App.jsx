import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import routes from "./Route.jsx";
import "./index.css";

function App() {
  const router = createBrowserRouter(routes);

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
  );
}

export default App;
