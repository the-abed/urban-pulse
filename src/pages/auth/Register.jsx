import React from "react";
import { useForm } from "react-hook-form";

import { Link, useLocation, useNavigate } from "react-router";
import GoogleLogin from "./GoogleLogin";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import axios from "axios";

const Register = () => {
  const axiosSecure = useAxiosSecure();

  const navigate = useNavigate();
  const location = useLocation();

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

      // Prepare form data for imageBB
      const imageApiUrl = `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_IMAGE_HOST_KEY
      }`;

      // 2. Upload to ImgBB using Axios
      axios.post(imageApiUrl, formData).then((res) => {
        const photoURL = res.data.data.url;

        //3. Create user in the database
        const user = {
          email: data.email,
          displayName: data.name,
          photoURL: photoURL,
          password: data.password,
        };

        axiosSecure.post("/users", user).then((res) => {
          if (res.data.insertedId) {
            navigate(location.state || "/");
          }
          // console.log('user created in db' ,res.data);
        });

        // 4.Update profile
        const userProfile = {
          displayName: data.name,
          photoURL: photoURL,
        };

        updateUserProfile(userProfile)
          .then(() => {
            console.log("User profile updated");
            navigate(location.state || "/");
          })
          .catch((error) => console.log(error.message));
      });
    });
  };
  return (
    <div className="card bg-base-100 mx-auto w-full max-w-sm shrink-0 shadow-2xl mt-8">
      <div className="card-body">
        <h2 className="text-3xl font-bold text-secondary">Create an Account</h2>
        <p className="text-gray-600">register with UrbanPulse</p>
        <form onSubmit={handleSubmit(handleRegister)}>
          <fieldset className="fieldset">
            {/* Name */}
            <label className="label">Name</label>
            <input
              type="text"
              {...register("name", { required: true })}
              className="input"
              placeholder="Your Name"
            />
            {errors.name?.type === "required" && (
              <span className="text-red-500">Name is required</span>
            )}

            {/* Photo */}
            <label className="label">Photo</label>
            <input
              type="file"
              {...register("photo", { required: true })}
              className=" file-input "
              placeholder="Your Photo"
            />

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
            <input
              type="password"
              {...register("password", {
                required: true,
                minLength: 6,
                pattern:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
              })}
              className="input"
              placeholder="Password"
            />
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
            <button className="btn btn-neutral mt-4">Register</button>
          </fieldset>
          <p className=" mt-3">
            Already have an account?{" "}
            <Link
              to="/login"
              className="link link-hover  underline hover:text-green-600"
            >
              Login
            </Link>
          </p>
        </form>
        <GoogleLogin />
      </div>
    </div>
  );
};

export default Register;
