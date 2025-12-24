import React from "react";
import { Link, NavLink, Outlet } from "react-router";
import { CiCreditCard1, CiDeliveryTruck } from "react-icons/ci";
import { FaTasks } from "react-icons/fa";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { FaAddressCard, FaMotorcycle } from "react-icons/fa6";
import {
  MdAssignmentInd,
  MdOutlineAllInbox,
  MdOutlineDirectionsBike,
  MdOutlineManageAccounts,
  MdOutlinePayment,
} from "react-icons/md";
import UrbanPulseLogo from "../components/shared/UrbanPulseLogo";
import useRole from "../hooks/useRole";
import useAuth from "../hooks/useAuth";


const DashboardLayout = () => {
  const {role} = useRole();
  const {user} = useAuth();

  return (
    <div>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Navbar */}
          <nav className="navbar w-full bg-base-300">
            <label
              htmlFor="my-drawer-4"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              {/* Sidebar toggle icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2"
                fill="none"
                stroke="currentColor"
                className="my-1.5 inline-block size-4"
              >
                <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
                <path d="M9 4v16"></path>
                <path d="M14 10l2 2l-2 2"></path>
              </svg>
            </label>
            <div className="px-2">
             <UrbanPulseLogo></UrbanPulseLogo>
            </div>
            <h4 className="text-xl font-bold  -mb-2.5">Dashboard</h4>
          </nav>
          {/* Page content here */}
          <Outlet></Outlet>
        </div>

        <div className="drawer-side is-drawer-close:overflow-visible">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
            {/* Sidebar content here */}
            <ul className="menu w-full grow">
              {/* List item */}
              <li>
                <Link
                  to="/dashboard"
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Homepage"
                >
                  {/* Home icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2"
                    fill="none"
                    stroke="currentColor"
                    className="my-1.5 inline-block size-4"
                  >
                    <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
                    <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  </svg>
                  <span className="is-drawer-close:hidden">Homepage</span>
                </Link>
              </li>

              {/* Admin only links */}
              {role === "admin" && (
                <>
               
                  <li>
                    <NavLink
                      to="manage-users"
                      className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                      data-tip="Manage Users"
                    >
                      <MdOutlineManageAccounts className="inline-block size-4.5" />
                      <span className="is-drawer-close:hidden">
                        Manage Users
                      </span>
                    </NavLink>
                  </li>

                  {/* All issues */}
                  <li>
                    <NavLink
                      to="view-all-issues"
                      className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                      data-tip="All Issues"
                    >
                      <MdOutlineAllInbox className="inline-block size-4.5" />
                      <span className="is-drawer-close:hidden"> View All Issues</span>
                    </NavLink>
                  </li>
                  {/* Manage staff */}
                  <li>
                    <NavLink
                      to="manage-staff"
                      className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                      data-tip="Manage Staff"
                    >
                      <MdOutlineManageAccounts className="inline-block size-4.5" />
                      <span className="is-drawer-close:hidden">
                        Manage Staff
                      </span>
                    </NavLink>
                  </li>
                  {/* Payments page */}
                  <li>
                    <NavLink
                      to="/dashboard/payments"
                      className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                      data-tip="Payments"
                    >
                      <MdOutlinePayment className="inline-block size-4.5" />
                      <span className="is-drawer-close:hidden">
                        Payments
                      </span>
                    </NavLink>
                  </li>
                </>
              )}

              {/* Citizen only links */}
              {
                role === "citizen" && (
                  <>
                  
                    {/* My issue */}
                    <li>
                      <NavLink
                        to="my-issue"
                        className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                        data-tip="My Issue"
                      >
                        <MdOutlineAllInbox className="inline-block size-4.5" />
                        <span className="is-drawer-close:hidden">
                          My Issue
                        </span>
                      </NavLink>
                    </li>
                    {/* Report Issue */}
                    <li>
                      <NavLink
                        to="/reportIssue"
                        className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                        data-tip="Report Issue"
                      >
                        <MdOutlineAllInbox className="inline-block size-4.5" />
                        <span className="is-drawer-close:hidden">
                          Report Issue
                        </span>
                      </NavLink>
                    </li>
                  </>
                )
              }

              {/* Staff only links */}
            {
                role === "staff" && (
                  <>
                   
                    {/* Assigned issues */}
                    <li>
                      <NavLink
                        to="assigned-issue"
                        className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                        data-tip="Assigned Issues"
                      >
                        <MdOutlineAllInbox className="inline-block size-4.5" />
                        <span className="is-drawer-close:hidden">
                          Assigned Issues
                        </span>
                      </NavLink>
                    </li>
                  </>
                )
            }
          
              {/* Profile */}
              <li>
                <NavLink
                  to={`/dashboard/profile/${user?.email}`}
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Profile"
                >
                  <MdOutlineManageAccounts className="inline-block size-4.5" />
                  <span className="is-drawer-close:hidden">
                    Profile
                  </span>
                </NavLink>
              </li>
              
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;