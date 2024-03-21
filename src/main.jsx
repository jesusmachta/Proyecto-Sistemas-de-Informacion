import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Footer_Navbar from './Components/Footer_Navbar'
import Agrupaciones from './Pages/Agrupaciones'
import Inicio from './Pages/Inicio'
import Feedbacks from './Pages/Feedbacks'
import Register from './Pages/Signup'
import UserProvider from './UserProvider'
import StudentProfile from './Pages/StudentProfile'

const browserRouter = createBrowserRouter([
  {
    path:"/",
    element:<Footer_Navbar/>,
    children:[
      {
        index: true, 
        element:<Inicio/>
      },
      {
        path:"/agrupaciones",
        element:<Agrupaciones/>
      },
      {
        path:"/feedbacks",
        element:<Feedbacks/>
      },
    ]
  },{
    path:"/signup",
    element:<Register/>
  },{
    // borrar!!!!
    path: "profile", 
    element: <StudentProfile/>
  }


])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
    <RouterProvider router={browserRouter}/>
    </UserProvider>
    
  </React.StrictMode>,
)
