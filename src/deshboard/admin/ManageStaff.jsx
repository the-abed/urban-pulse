import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";
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
    setValue("upazila", ""); // Clear upazila when district changes
  };

  // 3. Handle Create/Register
  const handleRegister = async (data) => {
    setIsSubmitting(true);
    const toastId = toast.loading("Processing...");
    try {
      let photoURL = editingStaff?.photo || "";

      // Only upload if a new file is selected
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
        upazila: data.upazila, // Key matches your API fix
        photo: photoURL,
      };

      if (!editingStaff) staffData.password = data.password;

      const url = editingStaff ? `/users/${editingStaff.email}` : "/staff";
      const method = editingStaff ? "patch" : "post";

      await axiosSecure[method](url, staffData);
      
      toast.success(editingStaff ? "Staff updated!" : "Staff created!", { id: toastId });
      queryClient.invalidateQueries(["staffs"]);
      closeModal();
    } catch (error) {
      toast.error(error.response?.data?.message || "Operation failed", { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  };

  // 4. Handle Delete
  const handleDelete = async (email) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This will remove the user from Firebase and the database!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axiosSecure.delete(`/api/staff/${email}`);
        toast.success("Staff deleted successfully");
        queryClient.invalidateQueries(["staffs"]);
      } catch (error) {
        toast.error("Failed to delete staff");
      }
    }
  };

  // 5. Modal Controls
  const openUpdateModal = (staff) => {
    setEditingStaff(staff);
    // Pre-fill Upazilas based on the staff's district
    const found = districts.find((d) => d.district === staff.district);
    setUpazilas(found ? found.upazilas : []);
    
    reset({
      name: staff.name,
      email: staff.email,
      district: staff.district,
      upazila: staff.upazila || staff.staffUpazila,
    });
    setSelectedDistrict(staff.district);
    document.getElementById("my_modal_5").showModal();
  };

  const closeModal = () => {
    setEditingStaff(null);
    reset();
    document.getElementById("my_modal_5").close();
  };

  if (isLoading) return <LoaderSpinner />;

  return (
    <div className="p-5">
      <Toaster position="top-center" />
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Manage Staff</h2>
        <button className="btn btn-primary" onClick={() => { setEditingStaff(null); reset(); document.getElementById("my_modal_5").showModal(); }}>
          Add New Staff
        </button>
      </div>

      {/* Staff Table */}
      <div className="overflow-x-auto bg-base-100 rounded-box shadow">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Info</th>
              <th>Location</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {staffs.map((staff) => (
              <tr key={staff._id}>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={staff.photo} alt="Avatar" />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{staff.name}</div>
                      <div className="text-sm opacity-50">{staff.email}</div>
                    </div>
                  </div>
                </td>
                <td>
                  {staff.district}, <br />
                  <span className="badge badge-ghost badge-sm">{staff.upazila || staff.staffUpazila}</span>
                </td>
                <td><span className="badge badge-accent">Staff</span></td>
                <td className="flex gap-2">
                  <button onClick={() => openUpdateModal(staff)} className="btn btn-warning btn-xs">Update</button>
                  <button onClick={() => handleDelete(staff.email)} className="btn btn-error btn-xs">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Shared Add/Update Modal */}
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h2 className="text-2xl font-bold mb-4">{editingStaff ? "Update Staff" : "Register Staff"}</h2>
          <form onSubmit={handleSubmit(handleRegister)} className="space-y-4">
            <div className="form-control">
              <label className="label">Full Name</label>
              <input {...register("name", { required: true })} className="input input-bordered" />
            </div>

            <div className="form-control">
              <label className="label">Photo</label>
              <input type="file" {...register("photo", { required: !editingStaff })} className="file-input file-input-bordered w-full" />
            </div>

            <div className="form-control">
              <label className="label">Email</label>
              <input type="email" {...register("email", { required: true })} className="input input-bordered" disabled={!!editingStaff} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">District</label>
                <select {...register("district", { required: true })} className="select select-bordered" onChange={handleDistrictChange}>
                  <option value="">Select</option>
                  {districts.map((d, idx) => <option key={idx} value={d.district}>{d.district}</option>)}
                </select>
              </div>

              <div className="form-control">
                <label className="label">Upazila</label>
                <select {...register("upazila", { required: true })} className="select select-bordered" disabled={!selectedDistrict}>
                  <option value="">Select</option>
                  {upazilas.map((u, idx) => <option key={idx} value={u}>{u}</option>)}
                </select>
              </div>
            </div>

            {!editingStaff && (
              <div className="form-control">
                <label className="label">Password</label>
                <input type="password" {...register("password", { required: true, minLength: 8 })} className="input input-bordered" />
              </div>
            )}

            <div className="modal-action">
              <button type="button" className="btn" onClick={closeModal}>Cancel</button>
              <button type="submit" disabled={isSubmitting} className="btn btn-primary">
                {isSubmitting && <span className="loading loading-spinner"></span>}
                {editingStaff ? "Update Info" : "Register"}
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default ManageStaff;