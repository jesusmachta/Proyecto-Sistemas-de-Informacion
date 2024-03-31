import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Footer_Navbar from "./Components/Footer_Navbar";
import Agrupaciones from "./Pages/Agrupaciones";
import Inicio from "./Pages/Inicio";
import Feedbacks from "./Pages/Feedbacks/Feedbacks";
import Register from "./Pages/Signup";
import RegistrarAdmin from "./Pages/RegistrarAdmin";
import Agrupacion from "./Pages/Agrupacion/Agrupacion";
import UserProvider from "./UserProvider";
import StudentProfile from "./Pages/StudentProfile";
import SidebarStudent from "./Components/SidebarStudent";
import ThankYouRegisterPage from "./Pages/ThankYouAndSuccessPages/ThankYouRegisterPage";
import Afiliaciones from "./Pages/Afiliaciones";
import Formulario from "./Pages/FormularioRegistroAgrupacion";
import { LoginAdmin } from "./Pages/loginAdmin";
import UpdateGroup from "./Pages/UpdateGroup";
import RegisterGroup from "./Pages/RegisterGroup";
import AdminProfile from "./Pages/AdminProfile";
import DeleteGroup from "./Pages/DeleteGroup";

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
    element: <StudentProfile />,
  },
  {
    path: "/sidebarP",
    element: <SidebarStudent />,
  },
  {
    path: "/registraradmin",
    element: <RegistrarAdmin />,
  },
  {
    path: "/thank-you-register",
    element: <ThankYouRegisterPage />,
  },
  {
    path: "/profile/afilliations/:userId",
    element: <Afiliaciones />,
  },
  {
    path: "/profile/formulario/:userId",
    element: <Formulario />,
  },
  {
    path: "/loginadmin",
    element: <LoginAdmin />,
  },
  {
    path: "/updategroup",
    element: <UpdateGroup />,
  },
  {
    path: "/registergroup/",
    element: <RegisterGroup />,
  },
  {
    path: "/adminprofile",
    element: <AdminProfile />,
  },
  {
    path: "/agrupacion/:id",
    element: <Agrupacion />,
  },
  {
    path: "/deletegroup",
    element: <DeleteGroup />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider>
      <RouterProvider router={browserRouter} />
    </UserProvider>
  </React.StrictMode>
);
