import { useForm } from "react-hook-form";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../contexts/AuthContext";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router";

// Simple Icon Components for visual flair
const UploadIcon = () => (
  <svg
    className="mx-auto h-12 w-12 text-gray-300"
    stroke="currentColor"
    fill="none"
    viewBox="0 0 48 48"
  >
    <path
      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ReportIssue = () => {
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, reset, watch } = useForm(); // Added watch for file preview logic if needed
  const { user } = useContext(AuthContext);

  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [loading, setLoading] = useState(false);

  // Watch file input for UI feedback (optional, shows file name)
  const watchedFile = watch("image");

  useEffect(() => {
    fetch("/locations.json")
      .then((res) => res.json())
      .then((data) => setDistricts(data.districts || []));
  }, []);

  const handleDistrictChange = (e) => {
    const districtName = e.target.value;
    setSelectedDistrict(districtName);
    const found = districts.find((d) => d.district === districtName);
    setUpazilas(found ? found.upazilas : []);
  };

  const onSubmit = async (data) => {
    setLoading(true);

    const performSubmission = async () => {
      try {
        let photoUrl = "";

        // Image Upload
        if (data.image && data.image[0]) {
          const formData = new FormData();
          formData.append("image", data.image[0]);
          const imgRes = await axios.post(
            `https://api.imgbb.com/1/upload?key=${
              import.meta.env.VITE_IMAGE_HOST_KEY
            }`,
            formData
          );
          photoUrl = imgRes.data.data.url;
        }

        const issueData = { ...data, photoUrl, email: user?.email };

        // API Call
        const res = await axiosSecure.post("/issues/report", issueData);

        if (res.data.insertedId) {
          reset();
          return "Successfully Reported!";
        }
      } catch (error) {
        // EXTRACT: Get the exact string from your backend
        const msg =
          error.response?.data?.message || error.message || "Submission failed";

        // LOG: Check your browser console to see if this runs!
        console.log("Caught Error Message:", msg);

        // REJECT: This is what triggers the error toast
        return Promise.reject(msg);
      }
    };

    toast
      .promise(performSubmission(), {
        loading: "Sending report...",
        success: (msg) => {
          setTimeout(() => navigate("/"), 1500);
          return msg;
        },
        // We use 'err' directly because we returned Promise.reject(msg)
        error: (err) => `${err}`,
      })
      .finally(() => setLoading(false));
  };

  // Shared Input Styles
  const inputClasses =
    "block w-full rounded-lg border-gray-300 bg-gray-50 border px-4 py-3 text-gray-900 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 outline-none";
  const labelClasses = "block text-sm font-medium text-gray-700 mb-1";

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header Section */}
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Report an Issue
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Help us improve our community by reporting problems in your area.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Title Input */}
              <div>
                <label className={labelClasses}>Issue Title</label>
                <input
                  {...register("title", { required: true })}
                  placeholder="e.g. Broken Street Light on Main St."
                  className={inputClasses}
                />
              </div>

              {/* Description Input */}
              <div>
                <label className={labelClasses}>Description</label>
                <textarea
                  {...register("description", { required: true })}
                  rows={4}
                  placeholder="Describe the issue in detail..."
                  className={`${inputClasses} resize-none`}
                />
              </div>

              {/* Category Select */}
              <div>
                <label className={labelClasses}>Category</label>
                <div className="relative">
                  <select
                    {...register("category", { required: true })}
                    className={`${inputClasses} appearance-none`}
                  >
                    <option value="">Select a category</option>
                    <option value="road">Road Problem</option>
                    <option value="electricity">Electricity</option>
                    <option value="water">Water Supply</option>
                    <option value="garbage">Garbage</option>
                    <option value="streetlight">Street Light</option>
                    <option value="other">Other</option>
                  </select>
                  {/* Custom Arrow for select */}
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      ></path>
                    </svg>
                  </div>
                </div>
              </div>

              {/* District & Upazila Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={labelClasses}>District</label>
                  <div className="relative">
                    <select
                      {...register("district", { required: true })}
                      className={`${inputClasses} appearance-none`}
                      onChange={(e) => {
                        register("district").onChange(e); // Ensure react-hook-form sees the change
                        handleDistrictChange(e); // Run your custom logic
                      }}
                    >
                      <option value="">Select District</option>
                      {districts.map((d, idx) => (
                        <option key={idx} value={d.district}>
                          {d.district}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        ></path>
                      </svg>
                    </div>
                  </div>
                </div>

                <div>
                  <label className={labelClasses}>Upazila</label>
                  <div className="relative">
                    <select
                      {...register("upazila", { required: true })}
                      className={`${inputClasses} appearance-none disabled:bg-gray-100 disabled:text-gray-400`}
                      disabled={!selectedDistrict}
                    >
                      <option value="">Select Upazila</option>
                      {upazilas.map((u, idx) => (
                        <option key={idx} value={u}>
                          {u}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        ></path>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Elegant File Upload */}
              <div>
                <label className={labelClasses}>Evidence Photo</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-indigo-400 transition-colors bg-gray-50 hover:bg-indigo-50/30">
                  <div className="space-y-1 text-center">
                    <UploadIcon />
                    <div className="flex text-sm text-gray-600 justify-center">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer bg-transparent rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none"
                      >
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          type="file"
                          {...register("image", { required: true })}
                          className="sr-only" // Hide default ugly input
                          accept="image/*"
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, GIF up to 5MB
                    </p>
                    {/* Show selected file name if exists */}
                    {watchedFile && watchedFile.length > 0 && (
                      <p className="text-sm text-green-600 font-semibold mt-2">
                        Selected: {watchedFile[0].name}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white 
                    ${
                      loading
                        ? "bg-indigo-400 cursor-not-allowed"
                        : "bg-indigo-600 hover:bg-indigo-700 hover:shadow-md transform hover:-translate-y-0.5"
                    } 
                    transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="loading loading-spinner loading-sm"></span>
                      Processing...
                    </span>
                  ) : (
                    "Submit Report"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportIssue;
