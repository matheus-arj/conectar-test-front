import { createBrowserRouter } from "react-router";
import { Login } from "../pages/auth/login";
import { Dashboard } from "../pages/dashboard";
import { Profile } from "../pages/profile";
import { Register } from "../pages/register";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
]);
