import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import HomePage from "./pages/HomePage";
import CoursesPage from "./pages/CoursesPage";
import CoursePage, { courseLoader } from "./pages/CoursePage";
import EditCoursePage from "./pages/EditCoursePage";
import AddCoursePage from "./pages/AddCoursePage";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFoundPage from "./pages/NotFoundPage";
import Protected from "./routes/Protected";

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/courses", element: <CoursesPage /> },
      { path: "/course/:courseName", element: <CoursePage />, loader: courseLoader },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },
    ],
  },
  {
    element: <Protected />, // any logged-in user
    children: [{ path: "/dashboard", element: <Dashboard /> }],
  },
  {
    element: <Protected role="admin" />, // admin only
    children: [
      { path: "/admin/add-course", element: <AddCoursePage /> },
      { path: "/admin/edit-course/:courseName", element: <EditCoursePage /> },
    ],
  },
  { path: "*", element: <NotFoundPage /> },
]);
