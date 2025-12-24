import React, { useRef, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { UserCheck, Trash2, MapPin, Tag, Calendar, ChevronRight, XCircle } from "lucide-react";
import LoaderSpinner from "../../components/shared/LoaderSpinner";

const ViewAllIssues = () => {
  const [selectedIssue, setSelectedIssue] = useState(null);
  const assignModalRef = useRef(null);
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // 1. Fetch Pending Issues
  const { data, isLoading } = useQuery({
    queryKey: ["issues", "pending"],
    queryFn: async () => {
      const res = await axiosSecure.get("/issues", { params: { status: "pending" } });
      return res.data;
    },
  });
  const issues = data?.issues || [];

  // 2. Fetch Staff (Filtered by District of the selected issue)
  const { data: staffs = [], isFetching: isStaffLoading } = useQuery({
    queryKey: ["staffs", selectedIssue?.district],
    enabled: !!selectedIssue,
    queryFn: async () => {
      const res = await axiosSecure.get("/staffs", {
        params: { district: selectedIssue?.district },
      });
      return res.data;
    },
  });

  const openAssignModal = (issue) => {
    setSelectedIssue(issue);
    assignModalRef.current.showModal();
  };

  const handleAssignStaff = async (issueId, staff) => {
    const toastId = toast.loading("Assigning staff...");
    try {
      const payload = {
        staffEmail: staff.email,
        staffName: staff.name,
        status: "assigned",
      };
      const res = await axiosSecure.patch(`/issues/${issueId}/assign`, payload);

      if (res.data.modifiedCount > 0) {
        toast.success(`Assigned to ${staff.name}`, { id: toastId });
        queryClient.invalidateQueries(["issues", "pending"]);
        assignModalRef.current.close();
      }
    } catch (error) {
      toast.error("Assignment failed", { id: toastId });
    }
  };

  const handleDeleteIssue = async (issueId) => {
    if (!window.confirm("Are you sure you want to reject this report?")) return;
    
    const toastId = toast.loading("Rejecting report...");
    try {
      const res = await axiosSecure.patch(`/admin/issues/${issueId}/reject`);
      if (res.data.modifiedCount > 0 || res.data.deletedCount > 0) {
        toast.success("Report rejected", { id: toastId });
        queryClient.invalidateQueries(["issues", "pending"]);
      }
    } catch (error) {
      toast.error("Action failed", { id: toastId });
    }
  };

  if (isLoading) return <LoaderSpinner />;

  return (
    <div className="p-4 md:p-8 bg-gray-50/50 min-h-screen">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">Management Console</h2>
          <p className="text-gray-500 mt-1">
            Assign staff to <span className="font-bold text-primary">{issues.length}</span> pending urban reports.
          </p>
        </div>
        <div className="flex gap-2">
            <span className="badge badge-lg bg-white border-gray-200 text-gray-600 px-4 py-4 rounded-xl shadow-sm">
                Status: Monitoring
            </span>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="max-w-7xl mx-auto bg-white rounded-[2rem] shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table w-full border-separate border-spacing-y-0">
            <thead className="bg-gray-50/80 text-gray-500 uppercase text-xs tracking-widest">
              <tr>
                <th className="py-5 pl-8">Issue Details</th>
                <th>Category</th>
                <th>Location & Date</th>
                <th>Priority</th>
                <th className="text-right pr-8">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-50">
              {issues.map((issue) => (
                <tr key={issue._id} className="group hover:bg-gray-50/50 transition-colors">
                  <td className="py-6 pl-8">
                    <div className="flex flex-col">
                      <span className="text-xs font-mono text-gray-400 mb-1">#{issue.trackingId}</span>
                      <span className="font-bold text-gray-800 text-lg group-hover:text-primary transition-colors">
                        {issue.title}
                      </span>
                      <span className="text-sm text-gray-500">Reporter: {issue.displayName}</span>
                    </div>
                  </td>

                  <td>
                    <div className="flex items-center gap-2">
                      <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                        <Tag size={14} />
                      </div>
                      <span className="capitalize font-medium text-gray-700">{issue.category}</span>
                    </div>
                  </td>

                  <td>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-1 text-gray-600 text-sm">
                        <MapPin size={12} className="text-primary" />
                        {issue.district}, {issue.upazila}
                      </div>
                      <div className="flex items-center gap-1 text-gray-400 text-xs">
                        <Calendar size={12} />
                        {new Date(issue.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </td>

                  <td>
                    <div className="flex items-center gap-2">
                       <div className="w-2 h-2 rounded-full bg-orange-400 animate-pulse"></div>
                       <span className="text-sm font-semibold text-gray-700">High ({issue.upvotes})</span>
                    </div>
                  </td>

                  <td className="pr-8">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => openAssignModal(issue)}
                        className="btn btn-sm rounded-xl bg-gray-900 text-white hover:bg-primary border-none normal-case px-4"
                      >
                        <UserCheck size={14} />
                        Assign
                      </button>
                      <button
                        onClick={() => handleDeleteIssue(issue._id)}
                        className="btn btn-sm btn-ghost rounded-xl text-gray-400 hover:text-error hover:bg-error/5"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {issues.length === 0 && (
            <div className="py-20 text-center text-gray-400">
                No pending issues found in the queue.
            </div>
          )}
        </div>
      </div>

      {/* Elegant Assign Staff Modal */}
      <dialog ref={assignModalRef} className="modal backdrop-blur-sm">
        <div className="modal-box max-w-2xl rounded-[2.5rem] p-8 shadow-2xl border border-gray-100">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-2xl font-black text-gray-900">Assign Field Staff</h3>
              <p className="text-gray-500 text-sm">Staff members available in {selectedIssue?.district}</p>
            </div>
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost">✕</button>
            </form>
          </div>

          <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
            {isStaffLoading ? (
              <div className="text-center py-10"><span className="loading loading-dots loading-lg text-primary"></span></div>
            ) : staffs.length > 0 ? (
              staffs.map((staff) => (
                <div key={staff._id} className="flex items-center justify-between p-4 rounded-2xl border border-gray-100 bg-gray-50/50 hover:bg-white hover:shadow-md transition-all group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                        {staff.name.charAt(0)}
                    </div>
                    <div>
                        <p className="font-bold text-gray-800">{staff.name}</p>
                        <p className="text-xs text-gray-500 uppercase tracking-tighter">{staff.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleAssignStaff(selectedIssue._id, staff)}
                    className="btn btn-sm rounded-full bg-white border-gray-200 group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all px-6"
                  >
                    Select <ChevronRight size={14} />
                  </button>
                </div>
              ))
            ) : (
              <div className="py-10 text-center bg-orange-50 rounded-3xl">
                <XCircle className="mx-auto text-orange-400 mb-2" />
                <p className="text-orange-700 font-medium">No staff found in this district.</p>
                <p className="text-orange-600/60 text-xs">Add staff for this region in the Management tab.</p>
              </div>
            )}
          </div>

          <div className="modal-action">
            <form method="dialog">
              <button className="btn btn-ghost rounded-xl normal-case">Cancel</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default ViewAllIssues;