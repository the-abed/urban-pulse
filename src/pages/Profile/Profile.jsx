import React, { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import axios from 'axios';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const Profile = () => {
    const axiosSecure = useAxiosSecure();
    const { user, updateUserProfile } = useAuth();
    const [isUpdating, setIsUpdating] = useState(false);
    const { register, handleSubmit, watch, reset } = useForm();

    // Watch for file changes to show a preview
    const photoFile = watch("photo");
    const photoPreview = photoFile && photoFile[0] ? URL.createObjectURL(photoFile[0]) : null;

  const onSubmit = async (data) => {
    setIsUpdating(true);
    const toastId = toast.loading("Updating your profile...");
    
    try {
        let photoURL = user?.photoURL;

        if (data.photo && data.photo[0]) {
            const formData = new FormData();
            formData.append("image", data.photo[0]);
            const imgRes = await axios.post(
                `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_HOST_KEY}`,
                formData
            );
            photoURL = imgRes.data.data.url;
        }

        // 1. Update Firebase (PASS BOTH ARGUMENTS)
        await updateUserProfile(data.name, photoURL);

        // 2. Update MongoDB
        const updateInfo = {
            displayName: data.name,
            photoURL: photoURL
        };
        await axiosSecure.patch(`/users/${user?.email}`, updateInfo);

        // 3. IMPORTANT: Manually force a UI refresh if your AuthContext doesn't auto-update
        // Some developers add a 'setReload' state in AuthContext to trigger this.
        
        toast.success("Profile updated! Refreshing...", { id: toastId });
        
        // Close modal and reset
        document.getElementById('update-modal').close();
        
        // Optional: Refresh the window to show new Firebase data everywhere
        window.location.reload(); 

    } catch (error) {
        toast.error(error.message, { id: toastId });
    } finally {
        setIsUpdating(false);
    }
};

    return (
        <div className="p-5 max-w-4xl mx-auto space-y-6">
            {/* Main Profile Card */}
            <div className="card bg-base-100 shadow-xl border border-base-200 overflow-hidden">
                {/* Header Banner */}
                <div className="h-32 bg-gradient-to-r from-primary to-secondary"></div>
                
                <div className="px-8 pb-8">
                    <div className="relative -mt-16 mb-4 flex justify-between items-end">
                        <div className="avatar">
                            <div className="w-32 h-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 bg-base-100">
                                <img src={user?.photoURL || "https://via.placeholder.com/150"} alt="Avatar" />
                            </div>
                        </div>
                        <button 
                            onClick={() => document.getElementById('update-modal').showModal()}
                            className="btn btn-primary btn-outline btn-sm md:btn-md"
                        >
                            Edit Profile
                        </button>
                    </div>

                    <div className="space-y-1">
                        <h2 className="text-3xl font-bold flex items-center gap-2">
                            {user?.displayName}
                            {user?.isPremium && <span className="badge badge-warning text-xs">Premium</span>}
                        </h2>
                        <p className="text-gray-500 font-medium">{user?.email}</p>
                        <div className="flex gap-2 pt-2">
                            <span className="badge badge-primary badge-outline uppercase tracking-wider text-[10px] font-bold">
                                {user?.role || 'Citizen'}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Dashboard */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="stats shadow bg-base-100 border border-base-200">
                    <div className="stat">
                        <div className="stat-title text-gray-500">Total Issues</div>
                        <div className="stat-value text-primary">{user?.reportCount || 0}</div>
                        <div className="stat-desc">Reports submitted</div>
                    </div>
                </div>

                <div className="stats shadow bg-base-100 border border-base-200">
                    <div className="stat">
                        <div className="stat-title text-gray-500">Status</div>
                        <div className={`stat-value text-2xl ${user?.isBlocked ? 'text-error' : 'text-success'}`}>
                            {user?.isBlocked ? "Blocked" : "Active User"}
                        </div>
                        <div className="stat-desc">Account standing</div>
                    </div>
                </div>

                <div className="stats shadow bg-base-100 border border-base-200">
                    <div className="stat">
                        <div className="stat-title text-gray-500">Joined On</div>
                        <div className="stat-value text-xl">
                            {user?.metadata?.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString() : 'N/A'}
                        </div>
                        <div className="stat-desc text-secondary">Verified Member</div>
                    </div>
                </div>
            </div>

            {/* Edit Profile Modal */}
            <dialog id="update-modal" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-xl mb-6 text-center">Edit Profile Information</h3>
                    
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        {/* Preview Section */}
                        {(photoPreview || user?.photoURL) && (
                            <div className="flex justify-center">
                                <div className="avatar">
                                    <div className="w-20 h-20 rounded-full ring ring-offset-2 ring-primary">
                                        <img src={photoPreview || user?.photoURL} alt="Preview" />
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="form-control">
                            <label className="label font-semibold">Full Name</label>
                            <input 
                                {...register("name", { required: "Name is required" })} 
                                defaultValue={user?.displayName}
                                className="input input-bordered w-full focus:input-primary" 
                                placeholder="Enter your full name"
                            />
                        </div>

                        <div className="form-control">
                            <label className="label font-semibold">Update Avatar</label>
                            <input 
                                type="file" 
                                {...register("photo")}
                                className="file-input file-input-bordered file-input-primary w-full" 
                                accept="image/*"
                            />
                        </div>

                        <div className="modal-action flex justify-between">
                            <button 
                                type="button" 
                                className="btn btn-ghost" 
                                onClick={() => {
                                    document.getElementById('update-modal').close();
                                    reset();
                                }}
                            >
                                Cancel
                            </button>
                            <button 
                                type="submit" 
                                disabled={isUpdating} 
                                className="btn btn-primary px-8"
                            >
                                {isUpdating ? <span className="loading loading-spinner"></span> : "Save Changes"}
                            </button>
                        </div>
                    </form>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </div>
    );
};

export default Profile;