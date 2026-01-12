import React from "react";
import UrbanPulseLogo from "../shared/UrbanPulseLogo";
import { Link, NavLink, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import { LayoutDashboard, LogOut, Menu, User } from "lucide-react";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  const handleLogOut = () => {
    logOut()
      .then(() => navigate("/"))
      .catch((error) => console.log(error.message));
  };

  const linkStyles = ({ isActive }) => 
    `relative px-1 py-2 text-sm font-bold tracking-wide transition-all duration-300 group ${
      isActive ? "text-primary" : "text-base-content/70 hover:text-primary"
    }`;

  const navLinks = (
    <>
      <li>
        <NavLink to="/" className={linkStyles}>
          Home
          <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 rounded-full opacity-0 group-[.active]:opacity-100 group-[.active]:scale-x-100"></span>
        </NavLink>
      </li>
      <li>
        <NavLink to="/issues" className={linkStyles}>
          All Issues
          <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 rounded-full opacity-0 group-[.active]:opacity-100 group-[.active]:scale-x-100"></span>
        </NavLink>
      </li>
      <li>
        <NavLink to="/about" className={linkStyles}>
          About
          <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 rounded-full opacity-0 group-[.active]:opacity-100 group-[.active]:scale-x-100"></span>
        </NavLink>
      </li>
      <li>
        <NavLink to="/contact" className={linkStyles}>
          Contact
          <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 rounded-full opacity-0 group-[.active]:opacity-100 group-[.active]:scale-x-100"></span>
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="sticky top-0 z-50 backdrop-blur-xl bg-base-100/70 border-b border-base-200/60">
      <div className="navbar container mx-auto px-4 md:px-8 h-16">
        
        {/* Navbar Start: Mobile Menu + Logo */}
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden mr-2 p-1">
              <Menu size={24} />
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-2xl z-50 mt-3 w-64 p-4 shadow-2xl border border-base-200 gap-3 animate-in fade-in slide-in-from-top-2">
              {navLinks}
            </ul>
          </div>
          <UrbanPulseLogo />
        </div>

        {/* Navbar Center: Desktop Links */}
        <div className="navbar-center hidden lg:flex">
          <ul className="flex items-center gap-8">
            {navLinks}
          </ul>
        </div>

        {/* Navbar End: User Profile / Auth Actions */}
        <div className="navbar-end gap-4">
          {user ? (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar ring-2 ring-primary/10 hover:ring-primary ring-offset-2 ring-offset-base-100 transition-all">
                <div className="w-10 rounded-full">
                  <img 
                    src={user.photoURL || "https://i.ibb.co/mJR7z9Y/user-placeholder.png"} 
                    alt="Profile" 
                    referrerPolicy="no-referrer"
                    className="object-cover"
                  />
                </div>
              </label>

              <ul tabIndex={0} className="menu menu-sm dropdown-content mt-4 z-50 p-3 shadow-2xl bg-base-100 rounded-2xl w-64 border border-base-200 animate-in fade-in zoom-in duration-200">
                <div className="px-3 py-3 mb-2 border-b border-base-200/60">
                  <p className="text-[10px] font-black uppercase tracking-widest text-base-content/40 mb-1">Signed in as</p>
                  <p className="font-extrabold text-primary truncate text-sm">{user.displayName}</p>
                  <p className="text-[11px] text-base-content/60 truncate">{user.email}</p>
                </div>

                <li>
                  <button onClick={() => navigate("/dashboard")} className="flex items-center gap-3 py-3 hover:bg-primary/10 rounded-xl transition-all group px-3">
                    <LayoutDashboard size={18} className="text-primary group-hover:scale-110 transition-transform" /> 
                    <span className="font-bold">Dashboard</span>
                  </button>
                </li>

                <li>
                  <button onClick={handleLogOut} className="flex items-center gap-3 py-3 text-error hover:bg-error/10 rounded-xl mt-1 transition-all group px-3">
                    <LogOut size={18} className="group-hover:translate-x-1 transition-transform" /> 
                    <span className="font-bold">Logout</span>
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <NavLink to="/login" className="hidden sm:inline-block">
                <button className="text-sm font-bold hover:text-primary transition-colors px-4">Login</button>
              </NavLink>
              <NavLink to="/register">
                <button className="btn btn-primary btn-sm md:btn-md rounded-full px-8 shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:-translate-y-0.5 transition-all normal-case font-bold">
                  Get Started
                </button>
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;