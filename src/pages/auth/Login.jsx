import React, { useState } from "react";
import { useForm } from "react-hook-form";

import { Link, useLocation, useNavigate } from "react-router";
import GoogleLogin from "./GoogleLogin";
import useAuth from "../../hooks/useAuth";
import toast, { ToastBar, Toaster } from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogin = (data) => {
    signIn(data.email, data.password)
      .then((result) => {
        toast.success("Login successful");
        // console.log(result.user);
        navigate(location.state || "/");
      })
      .catch((error) => console.log(error.message));
  };

  return (
    <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl mt-8 ">
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div className="card-body">
        <h2 className="text-3xl font-bold text-secondary ">Welcome Back</h2>
        <p className="text-gray-600">Login with UrbanPulse</p>
        <form onSubmit={handleSubmit(handleLogin)}>
          <fieldset className="fieldset">
            {/* Email */}
            <label className="label">Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="input"
              placeholder="Email"
            />
            {errors.email?.type === "required" && (
              <span className="text-red-500">Email is required</span>
            )}

            {/* Password */}
            <label className="label">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: true,
                  minLength: 6,
                  pattern:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                })}
                className="input pr-10"
                placeholder="Password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password?.type === "required" && (
              <span className="text-red-500">Password is required</span>
            )}
            {errors.password?.type === "minLength" && (
              <span className="text-red-500">
                Password must be at least 6 characters
              </span>
            )}
            {errors.password?.type === "pattern" && (
              <span className="text-red-500">
                Password must contain only letters and numbers
              </span>
            )}
            <div>
              <a className="link link-hover">Forgot password?</a>
            </div>
            <button className="btn btn-neutral mt-4">Login</button>
          </fieldset>
          <p className="mt-3">
            New to UrbanPulse?
            <Link
              state={location.state}
              to="/register"
              className="link link-hover underline hover:text-green-600"
            >
              Create an account
            </Link>
          </p>
        </form>
        <GoogleLogin></GoogleLogin>
      </div>
    </div>
  );
};

export default Login;
