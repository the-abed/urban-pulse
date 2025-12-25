import React from "react";
import UrbanPulseLogo from "../shared/UrbanPulseLogo";
import { Link, NavLink, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import ThemeController from "../ui/ThemeController";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  const handleLogOut = () => {
    logOut()
      .then(() => {
        navigate("/");
      })
      .catch((error) => console.log(error.message));
  };

  // Shared Navigation Links
  const navLinks = (
    <>
      <li>
        <NavLink 
          to="/" 
          className={({ isActive }) => isActive ? "text-primary font-bold underline decoration-2 underline-offset-4" : "font-medium hover:text-primary transition-colors"}
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink 
          to="/issues" 
          className={({ isActive }) => isActive ? "text-primary font-bold underline decoration-2 underline-offset-4" : "font-medium hover:text-primary transition-colors"}
        >
          All Issues
        </NavLink>
      </li>
      <li>
        <NavLink 
          to="/about" 
          className={({ isActive }) => isActive ? "text-primary font-bold underline decoration-2 underline-offset-4" : "font-medium hover:text-primary transition-colors"}
        >
          About
        </NavLink>
      </li>
      <li>
        <NavLink 
          to="/contact" 
          className={({ isActive }) => isActive ? "text-primary font-bold underline decoration-2 underline-offset-4" : "font-medium hover:text-primary transition-colors"}
        >
          Contact
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="sticky top-0 z-50 backdrop-blur-md bg-base-100/80 border-b border-base-200">
      <div className="navbar container mx-auto px-2 md:px-8 h-20">
        
        {/* Navbar Start: Mobile Menu + Logo */}
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden pr-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-2xl z-50 mt-3 w-52 p-4 shadow-xl border border-base-200 gap-2">
              {navLinks}
            </ul>
          </div>
          <UrbanPulseLogo />
        </div>

        {/* Navbar Center: Desktop Links */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-6">
            {navLinks}
          </ul>
        </div>

        {/* Navbar End: User Profile / Auth Actions */}
        <div className="navbar-end gap-3">
          {/* <ThemeController /> */}
          {/* <ThemeController></ThemeController> */}
          {user ? (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar border-2 border-primary/20 hover:border-primary transition-all">
                <div className="w-10 rounded-full">
                  <img 
                    src={user.photoURL || "https://i.ibb.co/mJR7z9Y/user-placeholder.png"} 
                    alt="Profile" 
                    title={user.displayName}
                  />
                </div>
              </label>

              <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-50 p-4 shadow-2xl bg-base-100 rounded-2xl w-60 border border-base-200">
                <div className="px-2 pb-2 mb-2 border-b border-base-200">
                  <p className="text-xs font-bold uppercase text-base-content/50">Signed in as</p>
                  <p className="font-bold text-primary truncate">{user.displayName}</p>
                </div>

                <li>
                  <button onClick={() => navigate("/dashboard")} className="flex items-center gap-2 py-3 hover:bg-primary/10 rounded-xl">
                    <span className="text-lg">📊</span> Dashboard
                  </button>
                </li>

                <li>
                  <button onClick={handleLogOut} className="flex items-center gap-2 py-3 text-error hover:bg-error/10 rounded-xl mt-1">
                    <span className="text-lg">🚪</span> Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <NavLink to="/login" className="hidden sm:inline-block">
                <button className="btn btn-ghost btn-sm md:btn-md normal-case font-bold">Login</button>
              </NavLink>
              <NavLink to="/register">
                <button className="btn btn-primary btn-sm md:btn-md rounded-full px-6 shadow-lg shadow-primary/20 hover:scale-105 transition-transform normal-case">
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