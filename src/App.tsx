import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import Dashboard from "./components/Dashboard/Dashboard";
import Home from "./components/Home/Home";
import HomeNavbar from "./components/HomeNavbar/HomeNavbar";
import Register from "./components/auth/Register/Register";
import { ToastContainer } from "react-toastify";
import Doctors from "./components/Doctors/Doctors";
import About from "./components/About/About";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Login from "./components/auth/Login/Login";

function App() {
  const router = createBrowserRouter([
    {
      path: "",
      element: <HomeNavbar />,
      children: [
        { index: true, element: <Home /> },
        { path: "tests", element: <h1>Tests</h1> },
        { path: "doctors", element: <Doctors /> },
        { path: "about", element: <About /> },
      ],
    },
    { path: "/register", element: <Register /> },
    { path: "/login", element: <Login /> },
    { path: "/mood", element: <h1>Mood</h1> },
    {
      path: "/dashboard",
      element: <Dashboard />,
      children: [
        { index: true, element: <h1>Dashboard home</h1> },
        { path: "tests", element: <h1>tests</h1> },
        { path: "chat", element: <h1>Chat</h1> },
        { path: "doctors", element: <h1>Doctors</h1> },
        { path: "results", element: <h1>Results</h1> },
        { path: "profile", element: <h1>Profile</h1> },
        { path: "settings", element: <h1>Settings</h1> },
      ],
    },
  ]);

  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ToastContainer />
      </QueryClientProvider>
    </>
  );
}

export default App;
