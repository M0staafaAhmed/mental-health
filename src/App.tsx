import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Dashboard from './components/Dashboard/Dashboard'
import Home from './components/Home/Home'
import HomeNavbar from './components/HomeNavbar/HomeNavbar'

function App() {
  
  const router = createBrowserRouter([
    {path: '', element: <HomeNavbar/> , children:[
      {index: true, element: <Home/>},
      {path: 'tests', element: <h1>Tests</h1>},
      {path: 'doctors', element: <h1>Doctors</h1>},
    ]},
    {path: '/register', element: <h1>Register</h1>},
    {path: '/login', element: <h1>Login</h1>},
    {path: '/mood', element: <h1>Mood</h1>},
    {path: '/dashboard', element: <Dashboard />, children: [
      {index: true, element: <h1>Dashboard home</h1>},
      {path: 'tests', element: <h1>tests</h1>},
      {path: 'chat', element: <h1>Chat</h1>},
      {path: 'doctors', element: <h1>Doctors</h1>},
      {path: 'results', element: <h1>Results</h1>},
      {path: 'profile', element: <h1>Profile</h1>},
      {path: 'settings', element: <h1>Settings</h1>},
    ]},
  ])

  

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
