import React, { useRef, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { QueryClient, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

const ViewAllIssues = () => {
  const [selectedIssue, setSelectedIssue] = useState(null);
  const assignModalRef = useRef(null);
  const axiosSecure = useAxiosSecure();
  const { data } = useQuery({
    queryKey: ["issues", "pending"],
    queryFn: async () => {
      const res = await axiosSecure.get("/issues", {
        params: { status: "pending" },
      });
      return res.data;
    },
  });
  const issues = data?.issues || [];

  const { data: staffs = [], refetch } = useQuery({
    queryKey: ["staffs", selectedIssue?.staffUpazila],
    enabled: !!selectedIssue,
    queryFn: async () => {
      const res = await axiosSecure.get("/staffs", {
        params: {
          upazila: selectedIssue?.staffUpazila,
        },
      });
      return res.data;
    },
  });

  const openAssignRiderModal = (issue) => {
    setSelectedIssue(issue);
    assignModalRef.current.showModal();
  };

  const handleAssignStaff = async (issueId, staff) => {
    if (!issueId) {
      toast.error("Invalid Issue ID");
      return;
    }

    try {
      const payload = {
        staffEmail: staff.email,
        staffName: staff.name,
        status: "assigned",
      };

      // Log the URL to verify it's correct
      console.log(`Requesting: /issues/${issueId}/assign`);

      const res = await axiosSecure.patch(`/issues/${issueId}/assign`, payload);

      if (res.data.modifiedCount > 0) {
        toast.success(`Assigned to ${staff.name}`);
        refetch();
        // Note: queryClient is usually lowercase in TanStack Query
        QueryClient.invalidateQueries(["issues", "pending"]);
      }
    } catch (error) {
      console.error("Assign Error:", error.response);
      const message =
        error?.response?.data?.message || "Check Network Tab for URL error";
      toast.error(message);
    }
  };

  const handleDeleteIssue = async (issueId) => {
    try {
      const res = await axiosSecure.patch(`/admin/issues/${issueId}/reject`);
      if (res.data.deletedCount > 0) {
        toast.success("Issue deleted successfully");
        // Note: queryClient is usually lowercase in TanStack Query
        QueryClient.invalidateQueries(["issues", "pending"]);
      }
    } catch (error) {
      console.error("Delete Error:", error.response);
      const message =
        error?.response?.data?.message || "Check Network Tab for URL error";
      toast.error(message);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-2">Assign Staff</h2>
      <p className="text-gray-600 mb-6">Pending Issues: {issues.length}</p>

      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="table w-full">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th>Tracking ID</th>
              <th>Issue</th>
              <th>Category</th>
              <th>Created At</th>
              <th>Location</th>
              <th>Upvotes</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {issues.map((issue) => (
              <tr key={issue._id} className="hover">
                <td className="font-mono text-sm">{issue.trackingId}</td>

                <td>
                  <p className="font-semibold">{issue.title}</p>
                  <p className="text-sm text-gray-500">
                    by {issue.displayName}
                  </p>
                </td>

                <td>
                  <span className="badge badge-info capitalize">
                    {issue.category}
                  </span>
                </td>
                <td>{issue.createdAt}</td>

                <td>
                  {issue.district}, {issue.upazila}
                </td>

                <td>
                  <span className="badge badge-outline">
                    👍 {issue.upvotes}
                  </span>
                </td>

                <td className="flex gap-2">
                  <button
                    onClick={() => openAssignRiderModal(issue)}
                    className="btn btn-xs btn-primary"
                  >
                    Assign Staff
                  </button>
                  <button
                    onClick={() => handleDeleteIssue(issue._id, null)}
                   className="btn btn-xs btn-error">Reject issue</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Assign Staff Modal */}
      <dialog
        ref={assignModalRef}
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <h2 className="font-bold text-lg">Staff: {staffs.length}</h2>

          {/* Find Riders */}
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              {/* head */}
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>District</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {/* Available Riders */}
                {staffs.map((staff, index) => (
                  <tr key={staff._id}>
                    <th>{index + 1}</th>
                    <td>{staff.name}</td>
                    <td>{staff.district}</td>
                    <td>{staff.status}</td>
                    <td>
                      <button
                        onClick={() =>
                          handleAssignStaff(selectedIssue._id, staff)
                        }
                        className="btn btn-sm bg-primary text-black"
                      >
                        Assign
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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

export default ViewAllIssues;
