import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Footer_Navbar from "./Components/Footer_Navbar";
import Agrupaciones from "./Pages/Agrupaciones";
import Inicio from "./Pages/Inicio";
import Feedbacks from "./Pages/Feedbacks";

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
      {
        path: "/registraradmin",
        element: <RegistrarAdmin />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={browserRouter} />
  </React.StrictMode>
);
