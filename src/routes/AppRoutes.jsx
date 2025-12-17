import { createBrowserRouter } from "react-router";
import Home from "../pages/Home/Home";
import MainLayout from "../layouts/MainLayout";
import AllIssue from "../pages/Issues/AllIssue";
import About from "../pages/About/About";
import Contact from "../pages/Contact/Contact";
import Register from "../pages/auth/Register";
import Login from "../pages/auth/Login";
import PrivateRoute from "./PrivateRoute";
import IssueDetails from "../pages/Issues/IssueDetails/IssueDetails";
import DashboardLayout from "../layouts/DashboardLayout";
import ReportIssue from "../deshboard/citizen/ReportIssue";

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/register",
        Component: Register,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/issues",
        Component: AllIssue,
      },
      {
        path: "/issue-details/:id",
        element: <PrivateRoute><IssueDetails></IssueDetails></PrivateRoute>

      },
      {
        path: "/about",
        Component: About,
      },
      {
        path: "/contact",
        Component: Contact,
      },
      {
        path: "/reportIssue",
        Component: () => (
          <PrivateRoute>
            <ReportIssue />
          </PrivateRoute>
        ),
        loader: async () => {
          const response = await fetch("/locations.json");
          const data = await response.json();
          return {
            city: data.division,
            areas: data.districts[0].upazilas,
          };
        },
      },
    ],
  },
  {
    path: "/dashboard",
    Component: DashboardLayout
  }
]);

export default router;
