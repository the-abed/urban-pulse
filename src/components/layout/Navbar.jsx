import React from "react";
import UrbanPulseLogo from "../shared/UrbanPulseLogo";
import { Link, NavLink, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import ThemeController from "../ui/ThemeController";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
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
  <div className="dropdown dropdown-end">
    {/* Avatar trigger */}
    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
      <div className="w-10 rounded-full">
        <img
          src={user.photoURL}
          alt={user.displayName}
          className="cursor-pointer"
        />
      </div>
    </label>

    {/* Dropdown menu */}
    <ul
      tabIndex={0}
      className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
    >
      {/* User name (disabled item) */}
      <li className="pointer-events-none">
        <span className="font-semibold">{user.displayName}</span>
      </li>

      <div className="divider my-1"></div>

      {/* Dashboard */}
      <li>
        <button onClick={() => navigate("/dashboard")}>
          Dashboard
        </button>
      </li>

      {/* Logout */}
      <li>
        <button onClick={handleLogOut} className="text-error">
          Logout
        </button>
      </li>
    </ul>
  </div>
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

