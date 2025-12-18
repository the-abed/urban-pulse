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
import StaffProfile from "../deshboard/staff/StaffProfile";
import AssignedIssues from "../deshboard/staff/AssignedIssues";
import ManageUsers from "../deshboard/admin/ManageUsers";
import ManageStaff from "../deshboard/admin/ManageStaff";
import AdminRoute from "./AdminRoute";
import AssignStaff from "../deshboard/admin/AssignStaff";
import ViewAllIssues from "../deshboard/admin/ViewAllIssues";
import MyIssue from "../deshboard/citizen/MyIssue";
import Profile from "../deshboard/citizen/Profile";

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
        path: '/dashboard/payment-success',
        Component: PaymentSuccess
      },
      {
        path: '/dashboard/payment-cancelled',
        Component: PaymentCancelled
      },
      //Admin routes
      {
        path: "/dashboard/manage-users",
        element: <PrivateRoute>
          <ManageUsers></ManageUsers>
        </PrivateRoute>
      },
      {
        path: "/dashboard/manage-staff",
        element:
        <AdminRoute>

          <ManageStaff></ManageStaff>
        </AdminRoute> 
       
      },
      {
        path: "/dashboard/assign-staff",
        element: <AdminRoute>
          <AssignStaff></AssignStaff>
        </AdminRoute>
      },
      {
        path: "/dashboard/view-all-issues",
        element: 
          <AdminRoute>
            <ViewAllIssues></ViewAllIssues>
          </AdminRoute>
        
      },
      // staff routes
      {
        path: "/dashboard/staff-profile",
        element: <StaffRoute>
          <StaffProfile></StaffProfile>
        </StaffRoute>
      },
      {
        path: "/dashboard/assigned-issue",
        element: <StaffRoute>
          <AssignedIssues></AssignedIssues>
        </StaffRoute>
      },
      // Citizen routes (Citizen@1212)
     {
      path: "/dashboard/profile",
      element: <PrivateRoute>
        <Profile></Profile>
      </PrivateRoute>

     },
     {
      path: "/dashboard/my-issue",
      element: <PrivateRoute>
        <MyIssue></MyIssue>
      </PrivateRoute>
     },
     
    ]
  }
]);

export default router;
