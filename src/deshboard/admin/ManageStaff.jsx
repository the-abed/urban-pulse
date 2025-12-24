import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";
import { UserPlus, Edit3, Trash2, MapPin, Mail, Shield, Camera, X } from "lucide-react";
import LoaderSpinner from "../../components/shared/LoaderSpinner";

const ManageStaff = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingStaff, setEditingStaff] = useState(null);

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();

  // 1. Fetch Staff Data
  const { data: staffs = [], isLoading } = useQuery({
    queryKey: ["staffs"],
    queryFn: async () => {
      const res = await axiosSecure.get("/staffs");
      return res.data;
    },
  });

  // 2. Load Location Data
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
    setValue("upazila", "");
  };

  const handleRegister = async (data) => {
    setIsSubmitting(true);
    const toastId = toast.loading(editingStaff ? "Updating..." : "Registering...");
    try {
      let photoURL = editingStaff?.photo || "";

      if (data.photo?.[0]) {
        const formData = new FormData();
        formData.append("image", data.photo[0]);
        const imgRes = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_HOST_KEY}`, formData);
        photoURL = imgRes.data.data.url;
      }

      const staffData = {
        name: data.name,
        email: data.email,
        district: data.district,
        upazila: data.upazila,
        photo: photoURL,
      };

      if (!editingStaff) staffData.password = data.password;

      const url = editingStaff ? `/users/${editingStaff.email}` : "/staff";
      const method = editingStaff ? "patch" : "post";

      await axiosSecure[method](url, staffData);
      
      toast.success(editingStaff ? "Staff updated successfully" : "New staff registered!", { id: toastId });
      queryClient.invalidateQueries(["staffs"]);
      closeModal();
    } catch (error) {
      toast.error(error.response?.data?.message || "Operation failed", { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (email) => {
    const result = await Swal.fire({
      title: "Remove Staff?",
      text: "This action cannot be undone and will remove the user from all systems.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#EF4444",
      cancelButtonColor: "#6B7280",
      confirmButtonText: "Yes, delete",
      customClass: { popup: 'rounded-[2rem]' }
    });

    if (result.isConfirmed) {
      try {
        await axiosSecure.delete(`/api/staff/${email}`);
        toast.success("Staff record deleted");
        queryClient.invalidateQueries(["staffs"]);
      } catch (error) {
        toast.error("Failed to delete record");
      }
    }
  };

  const openUpdateModal = (staff) => {
    setEditingStaff(staff);
    const found = districts.find((d) => d.district === staff.district);
    setUpazilas(found ? found.upazilas : []);
    
    reset({
      name: staff.name,
      email: staff.email,
      district: staff.district,
      upazila: staff.upazila || staff.staffUpazila,
    });
    setSelectedDistrict(staff.district);
    document.getElementById("staff_modal").showModal();
  };

  const closeModal = () => {
    setEditingStaff(null);
    reset();
    document.getElementById("staff_modal").close();
  };

  if (isLoading) return <LoaderSpinner />;

  return (
    <div className="p-4 md:p-8 bg-gray-50/50 min-h-screen">
      <Toaster position="top-center" reverseOrder={false} />
      
      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-4xl font-black text-gray-900 tracking-tight">Staff Management</h2>
          <p className="text-gray-500 mt-2 flex items-center gap-2">
            <Shield size={16} className="text-primary" /> Active Field Personnel: <span className="font-bold text-gray-800">{staffs.length}</span>
          </p>
        </div>
        <button 
          className="btn btn-primary btn-lg rounded-2xl shadow-lg shadow-primary/20 border-none normal-case flex items-center gap-2"
          onClick={() => { setEditingStaff(null); reset(); document.getElementById("staff_modal").showModal(); }}
        >
          <UserPlus size={20} />
          Register New Staff
        </button>
      </div>

      {/* Staff Grid/Table Card */}
      <div className="max-w-7xl mx-auto bg-white rounded-[2.5rem] shadow-xl shadow-gray-200/40 border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table w-full border-separate border-spacing-y-0">
            <thead className="bg-gray-50/80 text-gray-400 uppercase text-xs tracking-[0.15em]">
              <tr>
                <th className="py-6 pl-10 text-left">Staff Profile</th>
                <th>Coverage Area</th>
                <th>Account Status</th>
                <th className="text-right pr-10">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {staffs.map((staff) => (
                <tr key={staff._id} className="group hover:bg-gray-50/40 transition-all">
                  <td className="py-6 pl-10">
                    <div className="flex items-center gap-5">
                      <div className="relative">
                        <img 
                          className="w-14 h-14 rounded-2xl object-cover ring-4 ring-gray-50 group-hover:ring-primary/10 transition-all" 
                          src={staff.photo} 
                          alt={staff.name} 
                        />
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                      </div>
                      <div>
                        <div className="font-black text-gray-800 text-lg leading-tight">{staff.name}</div>
                        <div className="text-sm text-gray-400 flex items-center gap-1 mt-1 font-medium">
                          <Mail size={12} /> {staff.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-1.5 text-gray-700 font-semibold">
                        <MapPin size={14} className="text-primary" />
                        {staff.district}
                      </div>
                      <span className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-5">
                        {staff.upazila || staff.staffUpazila}
                      </span>
                    </div>
                  </td>
                  <td>
                    <span className="px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-black uppercase tracking-widest">
                      Active Staff
                    </span>
                  </td>
                  <td className="pr-10">
                    <div className="flex justify-end gap-3">
                      <button 
                        onClick={() => openUpdateModal(staff)} 
                        className="p-3 bg-gray-50 hover:bg-amber-50 text-gray-400 hover:text-amber-600 rounded-xl transition-colors"
                        title="Edit Staff"
                      >
                        <Edit3 size={18} />
                      </button>
                      <button 
                        onClick={() => handleDelete(staff.email)} 
                        className="p-3 bg-gray-50 hover:bg-red-50 text-gray-400 hover:text-red-600 rounded-xl transition-colors"
                        title="Delete Staff"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {staffs.length === 0 && (
            <div className="py-24 text-center">
              <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                 <Shield size={32} className="text-gray-200" />
              </div>
              <p className="text-gray-400 font-medium">No staff members registered yet.</p>
            </div>
          )}
        </div>
      </div>

      {/* Elegant Staff Modal */}
      <dialog id="staff_modal" className="modal modal-bottom sm:modal-middle backdrop-blur-md">
        <div className="modal-box max-w-lg rounded-[2.5rem] p-10 shadow-2xl border-none">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h2 className="text-3xl font-black text-gray-900 tracking-tight">
                {editingStaff ? "Update Details" : "New Registration"}
              </h2>
              <p className="text-gray-400 text-sm mt-1">Field staff profile information</p>
            </div>
            <button onClick={closeModal} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <X size={24} className="text-gray-400" />
            </button>
          </div>

          <form onSubmit={handleSubmit(handleRegister)} className="space-y-6">
            <div className="form-control">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2 px-1">Full Name</label>
              <input 
                {...register("name", { required: true })} 
                className="w-full bg-gray-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-primary/20 outline-none transition-all font-semibold"
                placeholder="Enter staff name"
              />
            </div>

            <div className="form-control">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2 px-1">Profile Picture</label>
              <div className="flex items-center gap-4 p-2 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                <div className="bg-white p-3 rounded-xl text-primary shadow-sm"><Camera size={20} /></div>
                <input 
                  type="file" 
                  {...register("photo", { required: !editingStaff })} 
                  className="file-input file-input-ghost w-full font-medium" 
                />
              </div>
            </div>

            <div className="form-control">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2 px-1">Work Email</label>
              <input 
                type="email" 
                {...register("email", { required: true })} 
                className="w-full bg-gray-50 border-none rounded-2xl p-4 disabled:opacity-50 font-semibold" 
                disabled={!!editingStaff}
                placeholder="staff@urbanpulse.com"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="form-control">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2 px-1">District</label>
                <select 
                  {...register("district", { required: true })} 
                  className="w-full bg-gray-50 border-none rounded-2xl p-4 font-semibold appearance-none" 
                  onChange={handleDistrictChange}
                >
                  <option value="">Select</option>
                  {districts.map((d, idx) => <option key={idx} value={d.district}>{d.district}</option>)}
                </select>
              </div>

              <div className="form-control">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2 px-1">Upazila</label>
                <select 
                  {...register("upazila", { required: true })} 
                  className="w-full bg-gray-50 border-none rounded-2xl p-4 font-semibold disabled:opacity-30" 
                  disabled={!selectedDistrict}
                >
                  <option value="">Select</option>
                  {upazilas.map((u, idx) => <option key={idx} value={u}>{u}</option>)}
                </select>
              </div>
            </div>

            {!editingStaff && (
              <div className="form-control">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2 px-1">Initial Password</label>
                <input 
                  type="password" 
                  {...register("password", { required: true, minLength: 8 })} 
                  className="w-full bg-gray-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-primary/20 outline-none transition-all font-semibold"
                  placeholder="Min. 8 characters"
                />
              </div>
            )}

            <div className="pt-4 flex gap-4">
              <button 
                type="submit" 
                disabled={isSubmitting} 
                className="btn btn-primary flex-1 h-14 rounded-2xl border-none shadow-lg shadow-primary/20 normal-case text-lg font-bold"
              >
                {isSubmitting ? <span className="loading loading-spinner"></span> : (editingStaff ? "Save Changes" : "Register Staff")}
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default ManageStaff;