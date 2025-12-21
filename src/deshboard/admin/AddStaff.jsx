import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";

import { useForm } from "react-hook-form";
import { Link } from "react-router";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const AddStaff = () => {
  const axiosSecure = useAxiosSecure();
  const [locationData, setLocationData] = useState(null);
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // Add this state

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // 1. Fetch the JSON data from public folder
  useEffect(() => {
    fetch("/locations.json")
      .then((res) => res.json())
      .then((data) => {
        setLocationData(data);
        setDistricts(data.districts);
      });
  }, []);

  // 2. When district changes, update upazila list
  const handleDistrictChange = (e) => {
    const districtName = e.target.value;
    setSelectedDistrict(districtName);

    const found = districts.find((d) => d.district === districtName);
    setUpazilas(found ? found.upazilas : []);
  };

  const handleRegister = async (data) => {
    setIsSubmitting(true);
    const toastId = toast.loading("Creating staff account..."); // Show active feedback

    try {
      const profileImage = data.photo[0];
      const formData = new FormData();
      formData.append("image", profileImage);

      // 1. Upload Image
      const imageApiUrl = `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_IMAGE_HOST_KEY
      }`;
      const imgRes = await axios.post(imageApiUrl, formData);
      const photoURL = imgRes.data.data.url;

      // 2. Prepare Data
      const staffData = {
        name: data.name,
        email: data.email,
        district: data.district,
        staffUpazila: data.upazila,
        password: data.password,
        photo: photoURL,
      };

    //   console.log("Staff data being sent:", staffData);
      const response = await axiosSecure.post("/staff", staffData);
    //   console.log("Backend response:", response.data);
      // Reset the form
      reset();

      if (response.data.insertedId) {
        toast.success("Staff added successfully!", { id: toastId });

        document.getElementById("my_modal_5").close();
      }
    } catch (error) {
      // This will show "User already exists" or whatever message your backend sent
      const errorMessage =
        error.response?.data?.message || "Something went wrong";
      toast.error(errorMessage);
      console.log("Backend Error Details:", error.response?.data);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div>
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <h2 className="text-3xl font-bold">Admin Dashboard</h2>
      {/* Add Staff */}

      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <button
        className="btn"
        onClick={() => document.getElementById("my_modal_5").showModal()}
      >
        Add Staff
      </button>
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <div className="card bg-base-100 mx-auto w-full max-w-sm shrink-0 shadow-2xl ">
            <div className="card-body">
              <h2 className="text-3xl font-bold text-secondary">
                Create an Account
              </h2>
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

                  {/* Add District Selection */}
                  <label className="label">District</label>
                  <select
                    {...register("district", { required: true })}
                    className="select select-bordered"
                    onChange={handleDistrictChange}
                  >
                    <option value="">Select District</option>
                    {districts.map((d, idx) => (
                      <option key={idx} value={d.district}>
                        {d.district}
                      </option>
                    ))}
                  </select>

                  <label className="label">Upazila</label>
                  <select
                    {...register("upazila", { required: true })}
                    className="select select-bordered"
                    disabled={!selectedDistrict}
                  >
                    <option value="">Select Upazila</option>
                    {upazilas.map((u, idx) => (
                      <option key={idx} value={u}>
                        {u}
                      </option>
                    ))}
                  </select>

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
                  <button
                    disabled={isSubmitting}
                    className="btn btn-neutral mt-4"
                  >
                    {isSubmitting ? (
                      <span className="loading loading-spinner"></span>
                    ) : (
                      "Register"
                    )}
                  </button>
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

export default AddStaff;
