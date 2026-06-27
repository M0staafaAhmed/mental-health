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
import { Provider } from 'react-redux'
import Login from "./components/auth/Login/Login";
import Tests from "./components/Tests/Tests";
import NotFound from "./components/NotFound/NotFound";
import { store } from "./redux/store";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import ProtectedAuth from "./components/ProtectedAuth/ProtectedAuth";
import Main from "./components/DashboardPages/Main/Main";

// dashboard-main

function App() {
  const router = createBrowserRouter([
    { path: "*", element: <NotFound /> },
    {
      path: "",
      element: <HomeNavbar />,
      children: [
        { index: true, element: <Home /> },
        { path: "tests", element: <Tests /> },
        { path: "doctors", element: <Doctors /> },
        { path: "about", element: <About /> },
      ],
    },
    { path: "/register", element: <ProtectedAuth><Register /></ProtectedAuth> },
    { path: "/login", element: <ProtectedAuth><Login /></ProtectedAuth> },
    { path: "/mood", element: <h1>Mood</h1> },
    {
      path: "/dashboard",
      element: <ProtectedRoute><Dashboard /></ProtectedRoute>,
      children: [
        { index: true, element: <Main /> },
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
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
          <ToastContainer />
        </QueryClientProvider>
      </Provider >
    </>
  );
}

export default App;
