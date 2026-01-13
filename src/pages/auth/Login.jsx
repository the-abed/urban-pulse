import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import GoogleLogin from "./GoogleLogin";
import useAuth from "../../hooks/useAuth";
import toast, { Toaster } from "react-hot-toast";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";

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
        toast.success("Welcome back to UrbanPulse!");
        navigate(location?.state ? location.state : "/");
      })
      .catch((error) => {
        toast.error("Invalid credentials. Please try again.");
        console.log(error.message);
      });
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <Toaster position="top-center" reverseOrder={false} />
      
      <div className="card bg-base-100 w-full max-w-md shadow-2xl border border-base-200 overflow-hidden">
        {/* Decorative Top Bar */}
        <div className="h-2 bg-gradient-to-r from-primary to-secondary w-full"></div>
        
        <div className="card-body p-8 md:p-10">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-black text-base-content mb-2">Welcome Back</h2>
            <p className="text-base-content/60 font-medium">Login to manage your UrbanPulse profile</p>
          </div>

          <form onSubmit={handleSubmit(handleLogin)} className="space-y-5">
            {/* Email Input */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold flex items-center gap-2">
                  <Mail size={16} className="text-primary" /> Email Address
                </span>
              </label>
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                className={`input input-bordered focus:input-primary transition-all bg-base-200/50 ${errors.email ? 'input-error' : ''}`}
                placeholder="name@example.com"
              />
              {errors.email && (
                <span className="text-error text-xs mt-1 font-medium">{errors.email.message}</span>
              )}
            </div>

            {/* Password Input */}
            <div className="form-control">
              <div className="flex justify-between items-center mb-1">
                <label className="label p-0">
                  <span className="label-text font-bold flex items-center gap-2">
                    <Lock size={16} className="text-primary" /> Password
                  </span>
                </label>
                <a className="text-xs link link-hover text-primary font-bold uppercase tracking-tighter">Forgot?</a>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 6, message: "Minimum 6 characters required" },
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                      message: "Must include Uppercase, Lowercase, Number & Symbol"
                    }
                  })}
                  className={`input input-bordered focus:input-primary w-full bg-base-200/50 pr-12 transition-all ${errors.password ? 'input-error' : ''}`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-base-content/40 hover:text-primary transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && (
                <span className="text-error text-xs mt-1 font-medium">{errors.password.message}</span>
              )}
            </div>

            <button className="btn btn-primary w-full text-white font-bold text-lg shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all normal-case">
              Sign In
            </button>
          </form>

          <div className="divider text-xs font-bold text-base-content/30 uppercase tracking-[0.2em] my-8">Or continue with</div>

          <GoogleLogin />

          <p className="text-center mt-8 text-base-content/70 font-medium">
            New to UrbanPulse?{" "}
            <Link
              state={location.state}
              to="/register"
              className="text-primary font-extrabold hover:underline underline-offset-4"
            >
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;