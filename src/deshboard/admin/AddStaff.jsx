import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { UserPlus, Mail, Lock, MapPin, Camera, ShieldCheck } from "lucide-react";

const AddStaff = () => {
  const axiosSecure = useAxiosSecure();
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  useEffect(() => {
    fetch("/locations.json")
      .then((res) => res.json())
      .then((data) => setDistricts(data.districts));
  }, []);

  const handleDistrictChange = (e) => {
    const districtName = e.target.value;
    setSelectedDistrict(districtName);
    const found = districts.find((d) => d.district === districtName);
    setUpazilas(found ? found.upazilas : []);
  };

  const handleRegister = async (data) => {
    setIsSubmitting(true);
    const toastId = toast.loading("Creating staff account...");

    try {
      const profileImage = data.photo[0];
      const formData = new FormData();
      formData.append("image", profileImage);

      const imageApiUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_HOST_KEY}`;
      const imgRes = await axios.post(imageApiUrl, formData);
      const photoURL = imgRes.data.data.url;

      const staffData = {
        name: data.name,
        email: data.email,
        district: data.district,
        staffUpazila: data.upazila,
        password: data.password,
        photo: photoURL,
      };

      const response = await axiosSecure.post("/staff", staffData);
      
      if (response.data.insertedId) {
        toast.success("Staff added successfully!", { id: toastId });
        reset();
        setSelectedDistrict("");
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Something went wrong";
      toast.error(errorMessage, { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-100px)] flex items-center justify-center p-4 md:p-10 bg-gray-50/50">
      <Toaster position="top-center" />

      <div className="max-w-5xl w-full bg-white rounded-[2.5rem] shadow-2xl shadow-gray-200/50 overflow-hidden flex flex-col md:flex-row border border-gray-100">
        
        {/* Left Side: Visual Info */}
        <div className="md:w-5/12 bg-primary p-10 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="relative z-10">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-lg rounded-2xl flex items-center justify-center mb-6">
              <UserPlus size={32} />
            </div>
            <h2 className="text-4xl font-black tracking-tight leading-tight mb-4">
              Expand the <br /> Field Team
            </h2>
            <p className="text-primary-foreground/80 font-medium">
              Create secure access for new UrbanPulse field staff to manage local infrastructure reports.
            </p>
          </div>

          <div className="relative z-10 space-y-4">
             <div className="flex items-center gap-3 bg-white/10 p-4 rounded-2xl backdrop-blur-sm border border-white/10">
                <ShieldCheck className="text-secondary" />
                <span className="text-sm font-bold">Encrypted Account Creation</span>
             </div>
          </div>

          {/* Decorative Circle */}
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-secondary/20 rounded-full blur-3xl"></div>
        </div>

        {/* Right Side: Form */}
        <div className="md:w-7/12 p-8 md:p-12">
          <form onSubmit={handleSubmit(handleRegister)} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Name */}
              <div className="form-control">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Staff Name</label>
                <div className="relative">
                  <input
                    type="text"
                    {...register("name", { required: true })}
                    className="w-full bg-gray-50 border-none rounded-xl p-4 pl-12 focus:ring-2 focus:ring-primary/20 outline-none transition-all font-semibold"
                    placeholder="Full Name"
                  />
                  <UserPlus className="absolute left-4 top-4 text-gray-400" size={18} />
                </div>
                {errors.name && <span className="text-red-500 text-xs mt-1">Required</span>}
              </div>

              {/* Photo */}
              <div className="form-control">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Profile Photo</label>
                <div className="relative">
                  <input
                    type="file"
                    {...register("photo", { required: true })}
                    className="file-input file-input-ghost w-full bg-gray-50 rounded-xl"
                  />
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="form-control">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Email Address</label>
              <div className="relative">
                <input
                  type="email"
                  {...register("email", { required: true })}
                  className="w-full bg-gray-50 border-none rounded-xl p-4 pl-12 focus:ring-2 focus:ring-primary/20 outline-none transition-all font-semibold"
                  placeholder="email@urbanpulse.com"
                />
                <Mail className="absolute left-4 top-4 text-gray-400" size={18} />
              </div>
              {errors.email && <span className="text-red-500 text-xs mt-1">Required</span>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* District */}
              <div className="form-control">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">District</label>
                <div className="relative">
                  <select
                    {...register("district", { required: true })}
                    className="w-full bg-gray-50 border-none rounded-xl p-4 pl-12 focus:ring-2 focus:ring-primary/20 outline-none transition-all font-semibold appearance-none"
                    onChange={handleDistrictChange}
                  >
                    <option value="">Select</option>
                    {districts.map((d, idx) => <option key={idx} value={d.district}>{d.district}</option>)}
                  </select>
                  <MapPin className="absolute left-4 top-4 text-gray-400" size={18} />
                </div>
              </div>

              {/* Upazila */}
              <div className="form-control">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Upazila</label>
                <select
                  {...register("upazila", { required: true })}
                  className="w-full bg-gray-50 border-none rounded-xl p-4 focus:ring-2 focus:ring-primary/20 outline-none transition-all font-semibold disabled:opacity-40"
                  disabled={!selectedDistrict}
                >
                  <option value="">Select</option>
                  {upazilas.map((u, idx) => <option key={idx} value={u}>{u}</option>)}
                </select>
              </div>
            </div>

            {/* Password */}
            <div className="form-control">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Initial Password</label>
              <div className="relative">
                <input
                  type="password"
                  {...register("password", {
                    required: true,
                    minLength: 6,
                    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  })}
                  className="w-full bg-gray-50 border-none rounded-xl p-4 pl-12 focus:ring-2 focus:ring-primary/20 outline-none transition-all font-semibold"
                  placeholder="••••••••"
                />
                <Lock className="absolute left-4 top-4 text-gray-400" size={18} />
              </div>
              {errors.password && (
                <span className="text-red-500 text-[10px] mt-1 italic">
                  Must include 8+ chars, uppercase, number & symbol.
                </span>
              )}
            </div>

            <button 
              disabled={isSubmitting} 
              className="btn btn-primary w-full h-14 rounded-2xl shadow-xl shadow-primary/20 border-none text-lg font-bold normal-case mt-4"
            >
              {isSubmitting ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Complete Registration"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddStaff;