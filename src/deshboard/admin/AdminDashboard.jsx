import React from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import axios from 'axios';

const AdminDashboard = () => {
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const {registerUser, updateUserProfile} = useAuth();
      const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();

const handleRegister = async (data) => {
    try {
        const profileImage = data.photo[0];
        const formData = new FormData();
        formData.append("image", profileImage);

        // 1. Upload to ImgBB (External API - No Auth Header needed)
        const imageApiUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_HOST_KEY}`;
        const imgRes = await axios.post(imageApiUrl, formData);
        const photoURL = imgRes.data.data.url;

        // 2. Data for backend
        const staffData = {
            name: data.name,
            email: data.email,
            password: data.password, 
            photo: photoURL,
        };

        // 3. POST to Backend (using axiosSecure)
        // Now that we fixed AuthProvider, user.accessToken will be a real string!
        const response = await axiosSecure.post("/staff", staffData);

        if (response.data.insertedId) {
            alert("Staff added successfully!");
            document.getElementById('my_modal_5').close();
        }
    } catch (error) {
        console.error("401 or other Error:", error.response?.data || error.message);
        alert(error.response?.data?.message || "Check console for auth error");
    }
};
    return (
        <div>
            <h2 className='text-3xl font-bold'>Admin Dashboard</h2>
            {/* Add Staff */}
  

        {/* Open the modal using document.getElementById('ID').showModal() method */}
<button className="btn" onClick={()=>document.getElementById('my_modal_5').showModal()}>Add Staff</button>
<dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
  <div className="modal-box">
 
  <div className="card bg-base-100 mx-auto w-full max-w-sm shrink-0 shadow-2xl ">
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
        </form>
        
      </div>
    </div>



    <div className="modal-action">
      <form method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <button className="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>
        </div>
    );
};

export default AdminDashboard;