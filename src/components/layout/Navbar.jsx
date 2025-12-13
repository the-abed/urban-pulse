import React from "react";
import UrbanPulseLogo from "../shared/UrbanPulseLogo";
import { Link, NavLink } from "react-router";
import useAuth from "../../hooks/useAuth";
import ThemeController from "../ui/ThemeController";

const Navbar = () => {
  const { user, logOut } = useAuth();
  // console.log(user);

  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.log(error.message));
  };
  const navLinks = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/issues">All Issues</NavLink>
      </li>
      <li>
        <NavLink to="/about">About</NavLink>
      </li>
      <li>
        <NavLink to="/contact">Contact</NavLink>
      </li>
    </>
  );
  return (
    <div>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {navLinks}
            </ul>
          </div>
          <UrbanPulseLogo />
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navLinks}</ul>
        </div>
        {/* Navbar end */}
        <div className="navbar-end">
          <ThemeController></ThemeController>
          {user ? (
            <div className="flex items-center">
              {/* Tooltip only on image */}
              <div
                className="tooltip tooltip-bottom"
                data-tip={user.displayName}
              >
                <div className="avatar">
                  <div className="w-10 rounded-full">
                    <img
                      src={user.photoURL}
                      alt={user.displayName}
                      className="cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              <button onClick={handleLogOut} className="btn btn-primary ml-2">
                Logout
              </button>
            </div>
          ) : (
            <div>
              <NavLink to="/register">
                <button className="btn btn-secondary">Register</button>
              </NavLink>
              <NavLink to="/login">
                <button className="btn btn-primary ms-2">Login</button>
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

// <div className="avatar online mr-2 tooltip tooltip-bottom" data-tip={user.displayName}><div className="w-10 rounded-full"><img src={user.photoURL} alt="" className=" cursor-pointer" /></div></div>
