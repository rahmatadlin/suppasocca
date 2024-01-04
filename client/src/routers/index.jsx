import { createBrowserRouter, Link, redirect } from "react-router-dom";
import Swal from "sweetalert2";
import Register from "../views/Register"; // Import register di awal
import LoginPage from "../views/LoginPage"; // Import login page terlebih dahulu
import BaseLayout from "../views/BaseLayout";
import HomePage from "../views/HomePage"; // Tampilkan homepage atau halaman utama
import DetailPage from "../views/DetailPage" // Menampilkan Table Klasemen
import CreateFormation from "../views/CreateFormation" // Menampilkann fitur create formation
import AddPage from "../views/AddPage";


const url = "http://localhost:3000";

const router = createBrowserRouter([
  {
    path: "/add-user",
    element: <Register url={url} />,
  },
  {
    path: "/login",
    element: <LoginPage url={url} />,
  },
  {
    element: <BaseLayout />,
    loader: () => {
      if (!localStorage.access_token) {
        Swal.fire({
          title: "Mohon register terlebih dahulu",
          icon: "warning",
        });
        return redirect("/add-user");
      }

      return null;
    },
    children: [
      {
        path: "/",
        element: <HomePage url={url} />,
      },
      {
        path: "/:id/standings", 
        element: <DetailPage url={url} />,
      },
      {
        path: "/create-formation", 
        element: <CreateFormation url={url} />,
      },
      {
        path: "/add-forums", 
        element: <AddPage url={url} />,
      },
      {
        path: "/forums/:id/comments", 
        element: <AddComments url={url} />,
      },
    ],
  },
]);

export default router;

