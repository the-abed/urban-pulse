import { createBrowserRouter } from "react-router";
import Home from "../pages/Home/Home";
import MainLayout from "../layouts/MainLayout";
import AllIssue from "../pages/Issues/AllIssue";


const router = createBrowserRouter([
    {
        path: "/",
        Component: MainLayout,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: "/issues",
                Component: AllIssue
            }
           
        ],
    },
]);

export default router