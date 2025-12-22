import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import { FaEye, FaEyeSlash, FaCheckCircle } from "react-icons/fa";
import GoogleLogin from "./GoogleLogin";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import axios from "axios";

const Register = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [showPassword, setShowPassword] = useState(false);
  const { registerUser, updateUserProfile } = useAuth();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleRegister = (data) => {
    const profileImage = data.photo[0];

    registerUser(data.email, data.password).then((result) => {
      const formData = new FormData();
      formData.append("image", profileImage);

      const imageApiUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_HOST_KEY}`;

      axios.post(imageApiUrl, formData).then((res) => {
        const photoURL = res.data.data.url;

        const user = {
          email: data.email,
          displayName: data.name,
          photoURL: photoURL,
        };

        axiosSecure.post("/users", user).then((res) => {
          if (res.data.insertedId) {
            navigate(location.state || "/");
          }
        });

        const userProfile = {
          displayName: data.name,
          photoURL: photoURL,
        };

        updateUserProfile(userProfile)
          .then(() => {
            navigate(location.state || "/");
          })
          .catch((error) => console.log(error.message));
      });
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 py-12 px-4">
      <div className="card bg-base-100 w-full max-w-md shrink-0 shadow-2xl border border-base-200">
        <div className="card-body p-8 md:p-10">
          {/* Header */}
          <div className="text-center mb-6">
            <h2 className="text-3xl font-black text-primary italic">Join UrbanPulse</h2>
            <p className="text-gray-500 text-sm mt-2">Help us build a smarter, better city together.</p>
          </div>

          <form onSubmit={handleSubmit(handleRegister)} className="space-y-4">
            {/* Name */}
            <div className="form-control">
              <label className="label font-bold text-xs uppercase tracking-widest text-gray-600">Full Name</label>
              <input
                type="text"
                {...register("name", { required: "Name is required" })}
                className={`input input-bordered focus:input-primary w-full ${errors.name ? 'input-error' : ''}`}
                placeholder="Abed Azim"
              />
              {errors.name && <span className="text-error text-xs mt-1">{errors.name.message}</span>}
            </div>

            {/* Photo */}
            <div className="form-control">
              <label className="label font-bold text-xs uppercase tracking-widest text-gray-600">Profile Photo</label>
              <input
                type="file"
                {...register("photo", { required: "Photo is required" })}
                className="file-input file-input-bordered file-input-primary w-full"
              />
               {errors.photo && <span className="text-error text-xs mt-1">{errors.photo.message}</span>}
            </div>

            {/* Email */}
            <div className="form-control">
              <label className="label font-bold text-xs uppercase tracking-widest text-gray-600">Email Address</label>
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                className="input input-bordered focus:input-primary w-full"
                placeholder="name@example.com"
              />
              {errors.email && <span className="text-error text-xs mt-1">{errors.email.message}</span>}
            </div>

            {/* Password */}
            <div className="form-control relative">
              <label className="label font-bold text-xs uppercase tracking-widest text-gray-600">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 6, message: "Minimum 6 characters" },
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                      message: "Must include Uppercase, Lowercase, Number & Special Character"
                    }
                  })}
                  className="input input-bordered focus:input-primary w-full pr-10"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors"
                >
                  {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                </button>
              </div>
              {errors.password && <span className="text-error text-xs mt-1">{errors.password.message}</span>}
            </div>

            {/* Terms & Conditions */}
            <div className="form-control mt-4">
              <label className="label cursor-pointer justify-start gap-3">
                <input 
                  type="checkbox" 
                  {...register("terms", { required: "You must accept the terms" })}
                  className="checkbox checkbox-primary checkbox-sm" 
                />
                <span className="label-text text-gray-600 text-sm">
                  I agree to the <Link to="/terms" className="text-secondary font-bold hover:underline">Terms & Conditions</Link>
                </span>
              </label>
              {errors.terms && <span className="text-error text-xs">{errors.terms.message}</span>}
            </div>

            {/* Submit Button */}
            <button className="btn btn-primary w-full rounded-xl shadow-lg shadow-primary/20 mt-6 normal-case text-lg font-bold">
              Create Account
            </button>
          </form>

          {/* Login Link */}
          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-secondary font-bold hover:underline">
              Log In
            </Link>
          </p>

          <div className="divider text-xs text-gray-400 uppercase tracking-widest my-6">Or continue with</div>

          <GoogleLogin />
        </div>
      </div>
    </div>
  );
};

export default Register;