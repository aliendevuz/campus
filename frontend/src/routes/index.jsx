import { createBrowserRouter } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import Home from "@/pages/Home";
// import About from "@/pages/About";
// import NotFound from "@/pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />, // Umumiy qobiq (Navbar, Footer shu yerda)
    children: [
      {
        path: "/",
        element: <Home />,
      },
      // {
      //   path: "about",
      //   element: <About />,
      // },
    ],
  },
  // {
  //   path: "*", // Xato sahifa (404)
  //   element: <NotFound />,
  // },
]);