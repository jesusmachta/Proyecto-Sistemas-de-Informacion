import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Footer_Navbar from "./Components/Footer_Navbar";
import Agrupaciones from "./Pages/Agrupaciones";
import Inicio from "./Pages/Inicio";
import Feedbacks from "./Pages/Feedbacks";
import Register from "./Pages/Signup";
import RegistrarAdmin from "./Pages/RegistrarAdmin";

import UserProvider from './UserProvider'
import StudentProfile from './Pages/StudentProfile'
import SidebarStudent from './Components/SidebarStudent'
import ThankYouRegisterPage from './Pages/ThankYouAndSuccessPages/ThankYouRegisterPage'
import { useUser } from './context/user'
import Afiliaciones from './Pages/Afiliaciones'
import Formulario from './Pages/FormularioRegistroAgrupacion'



import UserProvider from "./UserProvider";

import { LoginAdmin } from "./Pages/loginAdmin";


const browserRouter = createBrowserRouter([
  {
    path: "/",
    element: <Footer_Navbar />,
    children: [
      {
        index: true,
        element: <Inicio />,
      },
      {
        path: "/agrupaciones",
        element: <Agrupaciones />,
      },
      {
        path: "/feedbacks",
        element: <Feedbacks />,
      },
    ],
  },
  {
    path: "/signup",
    element: <Register />,
  },
  {
    // borrar!!!!

    path: "/profile/:userId", 
    element: <StudentProfile/>
  },{
    path: "/sidebarP", 
    element: <SidebarStudent/>
    
  },   
   {

    path: "/registraradmin",
    element: <RegistrarAdmin />,
  },{
    path: "/thank-you-register", 
    element: <ThankYouRegisterPage/>

  },
  {
    path:"/profile/afilliations", 
    element: <Afiliaciones/>

  },
  {

    path:"/profile/formulario", 
    element: <Formulario/>

  },




    path: "/loginadmin",
    element: <LoginAdmin />,
  },
]);


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider>
      <RouterProvider router={browserRouter} />
    </UserProvider>
  </React.StrictMode>
);
