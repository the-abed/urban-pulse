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
import StaffRoute from "./StaffRoute";
import AssignedIssues from "../deshboard/staff/AssignedIssues";
import ManageUsers from "../deshboard/admin/ManageUsers";
import ManageStaff from "../deshboard/admin/ManageStaff";
import AdminRoute from "./AdminRoute";
import AssignStaff from "../deshboard/admin/AssignStaff";
import ViewAllIssues from "../deshboard/admin/ViewAllIssues";
import MyIssue from "../deshboard/citizen/MyIssue";

import DashboardHome from "../deshboard/DashboardHome/DashboardHome";
import AddStaff from "../deshboard/admin/AddStaff";
import Payments from "../deshboard/admin/Payments";
import Profile from "../pages/Profile/Profile";
import TermsAndConditions from "../pages/TermsAndConditions/TermsAndConditions";
import EditIssue from "../pages/Issues/EditIssue/EditIssue";
import ErrorPage from "../components/ui/ErrorPage";
import PrivacyPolicy from "../pages/PrivacyPolicy/PrivacyPolicy";



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
        element: (
          <PrivateRoute>
            <IssueDetails></IssueDetails>
          </PrivateRoute>
        ),
      },
      {
        path: "/edit-issue/:id",
        element: (
          <PrivateRoute>
            <EditIssue></EditIssue>
          </PrivateRoute>
        ),
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
        path: "/terms-and-conditions",
        Component: TermsAndConditions,
      },
      {
        path: "/privacy-policy",
        Component: PrivacyPolicy
      },

     {
  path: "/reportIssue",
  element: (
    <PrivateRoute>
      <ReportIssue />
    </PrivateRoute>
  ),
},
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        Component: DashboardHome,
      },

      {
        path: "/dashboard/payment-success",
        Component: PaymentSuccess,
      },
      {
        path: "/dashboard/payment-cancelled",
        Component: PaymentCancelled,
      },
      //Admin routes
      {
        path: "/dashboard/addstaff",
        element: (
          <AdminRoute>
            <AddStaff></AddStaff>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/manage-users",
        element: (
          <PrivateRoute>
            <ManageUsers></ManageUsers>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/manage-staff",
        element: (
          <AdminRoute>
            <ManageStaff></ManageStaff>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/assign-staff",
        element: (
          <AdminRoute>
            <AssignStaff></AssignStaff>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/view-all-issues",
        element: (
          <AdminRoute>
            <ViewAllIssues></ViewAllIssues>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/payments",
        element: (
          <AdminRoute>
            <Payments></Payments>
          </AdminRoute>
        ),
      },
      // staff routes

      {
        path: "/dashboard/assigned-issue",
        element: (
          <StaffRoute>
            <AssignedIssues></AssignedIssues>
          </StaffRoute>
        ),
      },
      // Citizen routes (Citizen@1212)

      {
        path: "/dashboard/my-issue",
        element: (
          <PrivateRoute>
            <MyIssue></MyIssue>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/profile/:id",
        element: (
          <PrivateRoute>
            <Profile></Profile>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />
  }
]);

export default router;
