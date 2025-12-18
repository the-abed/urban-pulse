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
import PaymentSuccess from "../pages/Payment/PaymentSuccess";
import PaymentCancelled from "../pages/Payment/PaymentCancelled";

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
    path: "dashboard",
    element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
    children: [
      {
        index: true,
        Component: () => <h1>Dashboard</h1>,
      },
      {
        path: "/dashboard/citizen",
        Component: () => <h1>Citizen Dashboard</h1>,
      },
      {
        path: "/dashboard/admin",
        Component: () => <h1>Admin Dashboard</h1>,
      },
      {
        path: "/dashboard/staff",
        Component: () => <h1>Staff Dashboard</h1>,
      },
      {
        path: '/dashboard/payment-success',
        Component: PaymentSuccess
      },
      {
        path: '/dashboard/payment-cancelled',
        Component: PaymentCancelled
      }
    ]
  }
]);

export default router;
