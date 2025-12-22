import React from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import LoaderSpinner from "../../components/shared/LoaderSpinner";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: citizens = [], isLoading } = useQuery({
    queryKey: ["citizens"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/users/citizens");
      return res.data;
    },
  });

  const handleToggleBlock = async (user) => {
    // According to your API logic, we toggle 'isBlocked' boolean
    const willBlock = !user.isBlocked;
    const actionText = willBlock ? "block" : "unblock";

    const result = await Swal.fire({
      title: `Are you sure?`,
      text: `You are about to ${actionText} ${user.name}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: willBlock ? "#d33" : "#3085d6",
      cancelButtonColor: "#aaa",
      confirmButtonText: `Yes, ${actionText} them!`,
    });

    if (result.isConfirmed) {
      try {
        // Your API expects: PATCH /users/:email
        // and body: { isBlocked: boolean }
        const response = await axiosSecure.patch(`/users/${user.email}`, {
          isBlocked: willBlock,
        });

        if (response.data.modifiedCount > 0 || response.data.matchedCount > 0) {
          toast.success(`User ${actionText}ed successfully`);
          queryClient.invalidateQueries(["citizens"]);
        }
      } catch (error) {
        console.error(error);
        toast.error(
          error.response?.data?.message || `Failed to ${actionText} user`
        );
      }
    }
  };

  if (isLoading)
    return (
     <LoaderSpinner></LoaderSpinner>
    );

  return (
    <div className="p-5">
      <h2 className="text-3xl font-bold mb-2">Manage Users</h2>
      <p className="mb-4 text-gray-600">Total Citizens: {citizens.length}</p>

      <div className="overflow-x-auto shadow-lg rounded-lg border border-base-200">
        <table className="table w-full">
          <thead>
            <tr className="bg-base-200">
              <th>User</th>
              <th>Email</th>
              <th>Subscription</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {citizens.map((user) => (
              <tr key={user._id} className="hover">
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-10 h-10">
                        <img
                          src={user.photoURL || "https://via.placeholder.com/150"}
                          alt={user.name}
                        />
                      </div>
                    </div>
                    <div className="font-bold">{user.name}</div>
                  </div>
                </td>
                <td>{user.email}</td>
                <td>
                  {/* Subscription info based on your DB field (assuming isPremium) */}
                  {user.isPremium ? (
                    <div className="badge badge-warning gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="inline-block w-4 h-4 stroke-current"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        ></path>
                      </svg>
                      Premium
                    </div>
                  ) : (
                    <div className="badge badge-ghost">Regular</div>
                  )}
                </td>
                <td>
                  {user.isBlocked ? (
                    <span className="badge badge-error text-white">
                      Blocked
                    </span>
                  ) : (
                    <span className="badge badge-success text-white">
                      Active
                    </span>
                  )}
                </td>
                <td>
                  <button
                    onClick={() => handleToggleBlock(user)}
                    className={`btn btn-sm ${
                      user.isBlocked ? "btn-success" : "btn-error btn-outline"
                    }`}
                  >
                    {user.isBlocked ? "Unblock" : "Block"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
