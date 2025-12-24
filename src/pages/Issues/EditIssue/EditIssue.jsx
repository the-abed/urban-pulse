import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { ImageIcon, Save, ArrowLeft, MapPin } from "lucide-react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import LoaderSpinner from "../../../components/shared/LoaderSpinner";

const EditIssue = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");

  const { register, handleSubmit, reset, watch } = useForm();
  const watchedFile = watch("image");

  /* ---------------- 1. FETCH ISSUE DATA ---------------- */
  const { data: issue, isLoading } = useQuery({
    queryKey: ["issue-edit", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/issues/${id}`);
      return res.data;
    },
  });

  /* ---------------- 2. LOAD LOCATIONS (ONCE) ---------------- */
  useEffect(() => {
    fetch("/locations.json")
      .then((res) => res.json())
      .then((data) => {
        const list = data.districts || [];
        setDistricts(list);
        
        // If issue data arrived BEFORE locations, set upazilas now
        if (issue?.district) {
          const found = list.find((d) => d.district === issue.district);
          if (found) setUpazilas(found.upazilas);
        }
      });
  }, []); // Empty array = Runs only once on mount. NO CRASH.

  /* ---------------- 3. PRE-FILL FORM (WHEN DATA ARRIVES) ---------------- */
  useEffect(() => {
    if (issue) {
      reset({
        title: issue.title,
        description: issue.description,
        category: issue.category,
        district: issue.district,
        upazila: issue.upazila,
      });
      setSelectedDistrict(issue.district);

      // If districts are already loaded, sync upazilas
      if (districts.length > 0) {
        const found = districts.find((d) => d.district === issue.district);
        if (found) setUpazilas(found.upazilas);
      }
    }
  }, [issue, reset]); // Removed 'districts' from here to prevent infinite loop.

  /* ---------------- 4. HELPERS ---------------- */
  const handleDistrictChange = (e) => {
    const districtName = e.target.value;
    setSelectedDistrict(districtName);
    const found = districts.find((d) => d.district === districtName);
    setUpazilas(found ? found.upazilas : []);
  };

  const onSubmit = async (data) => {
    setLoading(true);
    const toastId = toast.loading("Saving changes...");

    try {
      let photoUrl = issue.photoUrl;

      // Only upload to ImgBB if a new file was selected
      if (data.image && data.image[0]) {
        const formData = new FormData();
        formData.append("image", data.image[0]);
        const imgbbResponse = await axios.post(
          `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_HOST_KEY}`,
          formData
        );
        photoUrl = imgbbResponse.data.data.url;
      }

      const updatedDoc = {
        title: data.title,
        description: data.description,
        category: data.category,
        district: data.district,
        upazila: data.upazila,
        photoUrl,
      };

      const res = await axiosSecure.patch(`/issues/my/${id}`, updatedDoc);

      if (res.data.success) {
        toast.success("Issue updated!", { id: toastId });
        setTimeout(() => navigate(`/issue-details/${id}`), 1200);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) return <LoaderSpinner />;

  // Unauthorized guard
  if (issue && issue.email !== user?.email) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <h2 className="text-2xl font-bold text-error">Access Denied</h2>
        <p>You do not have permission to edit this issue.</p>
        <button onClick={() => navigate("/")} className="btn btn-primary">Go Home</button>
      </div>
    );
  }

  const inputStyles = "w-full rounded-xl border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all p-3 outline-none border";

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <button 
        onClick={() => navigate(-1)} 
        className="mb-6 flex items-center gap-2 text-gray-500 hover:text-primary transition-colors"
      >
        <ArrowLeft size={18} /> Back to Details
      </button>

      <div className="bg-white rounded-[2rem] shadow-2xl border border-gray-100 overflow-hidden">
        <div className="bg-primary p-8 text-white">
          <h2 className="text-3xl font-bold">Edit Your Report</h2>
          <p className="opacity-80">Update the information for this public issue.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6">
          {/* Title */}
          <div className="form-control">
            <label className="label font-bold text-gray-700">Issue Title</label>
            <input 
              {...register("title", { required: true })} 
              className={inputStyles} 
              placeholder="E.g. Broken water pipe"
            />
          </div>

          {/* Description */}
          <div className="form-control">
            <label className="label font-bold text-gray-700">Description</label>
            <textarea 
              {...register("description", { required: true })} 
              rows={4} 
              className={`${inputStyles} resize-none`}
              placeholder="Describe the problem in detail..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Category */}
            <div className="form-control">
              <label className="label font-bold text-gray-700">Category</label>
              <select {...register("category", { required: true })} className={inputStyles}>
                <option value="road">Road Problem</option>
                <option value="electricity">Electricity</option>
                <option value="water">Water Supply</option>
                <option value="garbage">Garbage</option>
                <option value="streetlight">Street Light</option>
              </select>
            </div>

            {/* Location */}
            <div className="form-control">
              <label className="label font-bold text-gray-700 flex items-center gap-2">
                <MapPin size={16} /> Location (District)
              </label>
              <select 
                {...register("district", { required: true })} 
                onChange={handleDistrictChange} 
                className={inputStyles}
              >
                {districts.map((d, i) => (
                  <option key={i} value={d.district}>{d.district}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="form-control">
                <label className="label font-bold text-gray-700">Upazila</label>
                <select {...register("upazila", { required: true })} className={inputStyles}>
                  {upazilas.map((u, i) => <option key={i} value={u}>{u}</option>)}
                </select>
             </div>

             {/* Image Upload */}
             <div className="form-control">
                <label className="label font-bold text-gray-700">Update Photo</label>
                <div className="flex items-center gap-3 p-2 bg-gray-50 border border-gray-200 rounded-xl">
                  <img 
                    src={issue?.photoUrl} 
                    className="w-12 h-12 object-cover rounded-lg shadow-sm" 
                    alt="current" 
                  />
                  <input 
                    type="file" 
                    {...register("image")} 
                    className="file-input file-input-ghost file-input-sm w-full" 
                  />
                </div>
             </div>
          </div>

          <div className="pt-6 border-t flex flex-col md:flex-row gap-4">
            <button 
              type="submit" 
              disabled={loading} 
              className="btn btn-primary rounded-xl flex-1 h-14 text-lg"
            >
              {loading ? <span className="loading loading-spinner"></span> : <Save size={20} />}
              Save Changes
            </button>
            <button 
              type="button" 
              onClick={() => navigate(-1)} 
              className="btn btn-outline rounded-xl flex-1 h-14 text-lg"
            >
              Discard
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditIssue;