import React from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router";
import { 
  LayoutDashboard, 
  Users, 
  Inbox, 
  Settings, 
  CreditCard, 
  AlertCircle, 
  UserCircle, 
  Home,
  LogOut,
  ChevronRight,
  PanelLeft
} from "lucide-react";
import UrbanPulseLogo from "../components/shared/UrbanPulseLogo";
import useRole from "../hooks/useRole";
import useAuth from "../hooks/useAuth";

const DashboardLayout = () => {
  const { role } = useRole();
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logOut().then(() => navigate("/"));
  };

  const activeClass = "bg-primary/10 text-primary font-bold border-r-4 border-primary";
  const normalClass = "text-base-content/70 hover:bg-base-300 hover:text-base-content transition-all duration-200";

  const SidebarLink = ({ to, icon: Icon, label, tip }) => (
    <li>
      <NavLink
        to={to}
        end={to === "/dashboard"}
        className={({ isActive }) => 
          `flex items-center gap-3 px-4 py-3 my-1 rounded-lg mx-2 ${isActive ? activeClass : normalClass}`
        }
      >
        <Icon size={20} />
        <span className="font-medium">{label}</span>
      </NavLink>
    </li>
  );

  return (
    <div className="bg-base-100 min-h-screen">
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        
        <div className="drawer-content flex flex-col">
          {/* Enhanced Top Navbar */}
          <nav className="navbar sticky top-0 z-30 w-full bg-base-100/80 backdrop-blur-md border-b border-base-200 px-4">
            <div className="flex-none lg:hidden">
              <label htmlFor="my-drawer-4" className="btn btn-square btn-ghost">
                <PanelLeft size={24} />
              </label>
            </div>
            
            <div className="flex-1 px-2 flex items-center gap-2">
               <div className="lg:hidden"><UrbanPulseLogo /></div>
               <h2 className="text-xl font-black tracking-tight ml-2">Urban<span className="text-primary">Pulse</span> Dashboard</h2>
            </div>

            <div className="flex-none gap-2">
              <div className="hidden md:block text-right mr-2">
                <p className="text-xs font-bold opacity-50 uppercase tracking-widest">{role}</p>
                <p className="text-sm font-medium">{user?.displayName}</p>
              </div>
              <div className="avatar ring-2 ring-primary/20 rounded-full">
                <div className="w-10 rounded-full">
                  <img src={user?.photoURL || "https://i.ibb.co/mJR7z9Y/user-placeholder.png"} referrerPolicy="no-referrer" />
                </div>
              </div>
            </div>
          </nav>

          {/* Page content wrapper with subtle padding and background */}
          <main className="p-6 bg-base-200/50 grow">
            <div className="max-w-7xl mx-auto animate-in fade-in duration-500">
              <Outlet />
            </div>
          </main>
        </div>

        {/* Styled Sidebar */}
        <div className="drawer-side z-40">
          <label htmlFor="my-drawer-4" className="drawer-overlay"></label>
          <div className="flex flex-col w-72 min-h-full bg-base-100 border-r border-base-200 shadow-xl">
            
            {/* Sidebar Header */}
            <div className="p-6 mb-2">
              <UrbanPulseLogo />
            </div>

            {/* Menu Sections */}
            <ul className="menu p-0 w-full grow block">
              <p className="px-6 py-2 text-[10px] font-black uppercase text-base-content/40 tracking-[0.2em]">Main Menu</p>
              
              <SidebarLink to="/dashboard" icon={Home} label="Overview" />

              {/* Admin Section */}
              {role === "admin" && (
                <>
                  <p className="px-6 py-4 text-[10px] font-black uppercase text-base-content/40 tracking-[0.2em]">Admin Management</p>
                  <SidebarLink to="manage-users" icon={Users} label="Manage Users" />
                  <SidebarLink to="view-all-issues" icon={Inbox} label="All Issues" />
                  <SidebarLink to="manage-staff" icon={Settings} label="Staff Settings" />
                  <SidebarLink to="/dashboard/payments" icon={CreditCard} label="Payment Logs" />
                </>
              )}

              {/* Citizen Section */}
              {role === "citizen" && (
                <>
                  <p className="px-6 py-4 text-[10px] font-black uppercase text-base-content/40 tracking-[0.2em]">Reporting</p>
                  <SidebarLink to="my-issue" icon={Inbox} label="My Submissions" />
                  <SidebarLink to="/reportIssue" icon={AlertCircle} label="File New Report" />
                </>
              )}

              {/* Staff Section */}
              {role === "staff" && (
                <>
                  <p className="px-6 py-4 text-[10px] font-black uppercase text-base-content/40 tracking-[0.2em]">Field Ops</p>
                  <SidebarLink to="assigned-issue" icon={Inbox} label="Work Queue" />
                </>
              )}

              <p className="px-6 py-4 text-[10px] font-black uppercase text-base-content/40 tracking-[0.2em]">Personal</p>
              <SidebarLink to={`/dashboard/profile/${user?.email}`} icon={UserCircle} label="My Profile" />
            </ul>

            {/* Sidebar Footer User Card */}
            <div className="p-4 border-t border-base-200 bg-base-200/50">
              <button 
                onClick={handleLogout}
                className="btn btn-error btn-ghost w-full justify-start gap-3 normal-case hover:bg-error/10"
              >
                <LogOut size={20} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;