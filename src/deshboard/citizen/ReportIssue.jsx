import { useForm } from "react-hook-form";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../contexts/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const ReportIssue = () => {
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, reset } = useForm();
  const { user } = useContext(AuthContext);
  
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  // 1. Add loading state
  const [loading, setLoading] = useState(false);

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
    // 2. Start loading immediately
    setLoading(true);
    const toastId = toast.loading("Uploading image and submitting...");

    try {
      let photoUrl = "";
      if (data.image && data.image[0]) {
        const formData = new FormData();
        formData.append("image", data.image[0]);
        const imgbbResponse = await axios.post(
          `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_HOST_KEY}`,
          formData
        );
        photoUrl = imgbbResponse.data.data.url;
      }

      const issueData = {
        title: data.title,
        description: data.description, // Added description as it was missing from your object
        category: data.category,
        district: data.district,
        upazila: data.upazila,
        displayName: user?.displayName,
        email: user?.email,
        photoUrl,
      };

      const res = await axiosSecure.post("/issues/report", issueData);

      if (res.data.insertedId) {
        toast.success("Issue submitted successfully!", { id: toastId });
        reset();
        // 3. Navigate away immediately after success
        navigate("/"); 
      }
    } catch (error) {
      console.error("Error submitting issue:", error);
      const errorMsg = error.response?.data?.message || error.message;
      toast.error(`Failed: ${errorMsg}`, { id: toastId });
    } finally {
      // 4. Always turn off loading
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl mx-auto p-5">
      <h2 className="text-2xl font-bold mb-5">Report a Problem</h2>
      
      <input
        {...register("title", { required: true })}
        placeholder="Title"
        className="input input-bordered w-full mb-3"
      />
      <textarea
        {...register("description", { required: true })}
        placeholder="Description"
        className="textarea textarea-bordered w-full mb-3"
      />
      
      <select {...register("category", { required: true })} className="select select-bordered w-full mb-3">
        <option value="">Select Category</option>
        <option value="road">Road Problem</option>
        <option value="electricity">Electricity</option>
        <option value="water">Water Supply</option>
        <option value="garbage">Garbage</option>
        <option value="streetlight">Street Light</option>
      </select>

      <select
        {...register("district", { required: true })}
        className="select select-bordered w-full mb-3"
        onChange={handleDistrictChange}
      >
        <option value="">Select District</option>
        {districts.map((d, idx) => (
          <option key={idx} value={d.district}>{d.district}</option>
        ))}
      </select>

      <select
        {...register("upazila", { required: true })}
        className="select select-bordered w-full mb-3"
        disabled={!selectedDistrict}
      >
        <option value="">Select Upazila</option>
        {upazilas.map((u, idx) => (
          <option key={idx} value={u}>{u}</option>
        ))}
      </select>

      <input
        type="file"
        {...register("image", { required: true })}
        className="file-input file-input-bordered w-full mb-4"
        accept="image/*"
      />

      {/* 5. Show loading state in button */}
      <button 
        type="submit" 
        disabled={loading} 
        className="btn btn-primary w-full"
      >
        {loading ? <span className="loading loading-spinner"></span> : "Report Issue"}
      </button>
    </form>
  );
};

export default ReportIssue;