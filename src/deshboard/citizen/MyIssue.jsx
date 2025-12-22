import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import LoaderSpinner from '../../components/shared/LoaderSpinner';

const MyIssues = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { register, handleSubmit, reset, setValue } = useForm();
    
    // States for Filtering
    const [statusFilter, setStatusFilter] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [editingIssue, setEditingIssue] = useState(null);

    // 1. Fetch Issues with Filters
    const { data: issues = [], isLoading } = useQuery({
        queryKey: ['my-issues', user?.email, statusFilter, categoryFilter],
        queryFn: async () => {
            const res = await axiosSecure.get(`/issues/my/${user?.email}`, {
                params: { status: statusFilter, category: categoryFilter }
            });
            return res.data;
        },
        enabled: !!user?.email
    });

    // 2. Delete Mutation
    const deleteMutation = useMutation({
        mutationFn: (id) => axiosSecure.delete(`/issues/my/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries(['my-issues']);
            toast.success("Issue deleted successfully");
        }
    });

    // 3. Update Mutation
const updateMutation = useMutation({
    mutationFn: ({ id, data }) => axiosSecure.patch(`/issues/my/${id}`, data),
    onSuccess: () => {
        // This is the "Magic" that makes the UI update instantly
        queryClient.invalidateQueries(['my-issues']); 
        toast.success("Issue updated!");
        document.getElementById('edit-modal').close();
    },
    onError: (error) => {
        toast.error(error.response?.data?.message || "Update failed");
    }
});;

    const handleEditClick = (issue) => {
        setEditingIssue(issue);
        setValue("title", issue.title);
        setValue("description", issue.description);
        setValue("category", issue.category);
        document.getElementById('edit-modal').showModal();
    };

   const onUpdateSubmit = (data) => {
    // 1. Destructure to remove _id and other fields that shouldn't change
    const { _id, status, email, ...updateFields } = data; 
    
    // 2. Only send the fields that actually need updating (title, description, etc.)
    updateMutation.mutate({ 
        id: editingIssue._id, 
        data: updateFields 
    });
};

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This action cannot be undone!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) deleteMutation.mutate(id);
        });
    };

    if (isLoading) return <LoaderSpinner></LoaderSpinner>;

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">My Reported Issues</h2>

            {/* Filter Section */}
            <div className="flex flex-wrap gap-4 mb-6 bg-base-200 p-4 rounded-lg">
                <select className="select select-bordered" onChange={(e) => setStatusFilter(e.target.value)}>
                    <option value="">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="assigned">Assigned</option>
                    <option value="resolved">Resolved</option>
                </select>
                <select className="select select-bordered" onChange={(e) => setCategoryFilter(e.target.value)}>
                    <option value="">All Categories</option>
                    <option value="road">Road</option>
                    <option value="electricity">Electricity</option>
                    <option value="water">Water</option>
                </select>
            </div>

            {/* Issues Table */}
            <div className="overflow-x-auto shadow-lg rounded-xl">
                <table className="table w-full">
                    <thead className="bg-primary text-white">
                        <tr>
                            <th>Title</th>
                            <th>Category</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {issues.map(issue => (
                            <tr key={issue._id} className="hover">
                                <td className="font-semibold">{issue.title}</td>
                                <td className="capitalize">{issue.category}</td>
                                <td>
                                    <span className={`badge ${issue.status === 'pending' ? 'badge-warning' : 'badge-success'}`}>
                                        {issue.status}
                                    </span>
                                </td>
                                <td className="flex gap-2">
                                    <button 
                                        onClick={() => navigate(`/issue/${issue._id}`)}
                                        className="btn btn-xs btn-info"
                                    >View</button>
                                    
                                    <button 
                                        disabled={issue.status !== 'pending'}
                                        onClick={() => handleEditClick(issue)}
                                        className="btn btn-xs btn-warning"
                                    >Edit</button>

                                    <button 
                                        onClick={() => handleDelete(issue._id)}
                                        className="btn btn-xs btn-error"
                                    >Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Edit Modal */}
            <dialog id="edit-modal" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg mb-4">Edit Issue</h3>
                    <form onSubmit={handleSubmit(onUpdateSubmit)} className="space-y-4">
                        <input {...register("title")} className="input input-bordered w-full" placeholder="Title" />
                        <textarea {...register("description")} className="textarea textarea-bordered w-full" placeholder="Description" />
                        <select {...register("category")} className="select select-bordered w-full">
                            <option value="road">Road</option>
                            <option value="electricity">Electricity</option>
                            <option value="water">Water</option>
                        </select>
                        <div className="modal-action">
                            <button type="button" className="btn" onClick={() => document.getElementById('edit-modal').close()}>Cancel</button>
                            <button type="submit" className="btn btn-primary">Update</button>
                        </div>
                    </form>
                </div>
            </dialog>
        </div>
    );
};

export default MyIssues;