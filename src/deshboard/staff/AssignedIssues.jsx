import React, { useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast } from "react-hot-toast";
import LoaderSpinner from "../../components/shared/LoaderSpinner";

/* -----------------------------
   Status flow rules
----------------------------- */
const STATUS_FLOW = {
  assigned: ["accept"],
  accept: ["in_progress"],
  in_progress: ["resolved"],
  resolved: ["closed"],
  closed: [],
};

/* -----------------------------
   Status badge colors
----------------------------- */
const statusBadge = (status) => {
  const map = {
    pending: "badge-warning",
    assigned: "badge-info",
    accept: "badge-primary",
    in_progress: "badge-secondary",
    resolved: "badge-success",
    closed: "badge-neutral",
  };
  return `badge ${map[status] || "badge-ghost"}`;
};

const AssignedIssues = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  /* -----------------------------
     Fetch assigned issues
  ----------------------------- */
  const { data: issues = [], isLoading } = useQuery({
    queryKey: ["assigned-issues"],
    queryFn: async () => {
      const res = await axiosSecure.get("/staff/issues");
      return res.data;
    },
  });

  /* -----------------------------
     Update status mutation
  ----------------------------- */
  const statusMutation = useMutation({
    mutationFn: async ({ issueId, newStatus }) => {
      return axiosSecure.patch(`/staff/issues/${issueId}/status`, { newStatus });
    },
    onSuccess: () => {
      toast.success("Status updated");
      queryClient.invalidateQueries({ queryKey: ["assigned-issues"] });
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Status update failed");
    },
  });

  /* -----------------------------
     Sort boosted issues first
  ----------------------------- */
  const sortedIssues = useMemo(() => {
    return [...issues].sort((a, b) => {
      if (a.priority === "boosted" && b.priority !== "boosted") return -1;
      if (a.priority !== "boosted" && b.priority === "boosted") return 1;
      return (
        new Date(b.assignedStaff?.assignedAt || 0) -
        new Date(a.assignedStaff?.assignedAt || 0)
      );
    });
  }, [issues]);

  if (isLoading) return <LoaderSpinner></LoaderSpinner>;

  return (
   <div className="p-6 bg-base-50 min-h-screen">
  {/* Header Section */}
  <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 bg-white p-6 rounded-2xl shadow-sm border border-base-200">
    <div>
      <h2 className="text-3xl font-extrabold tracking-tight text-base-content">
        Assigned Issues
      </h2>
      <p className="text-base-content/60 mt-1 font-medium">
        Manage and track your active technical assignments
      </p>
    </div>
    <div className="stats shadow bg-primary text-primary-content">
      <div className="stat py-2 px-6">
        <div className="stat-title text-primary-content/70 text-xs font-bold uppercase">Total Tasks</div>
        <div className="stat-value text-2xl">{issues.length}</div>
      </div>
    </div>
  </div>

  {/* Table Container */}
  <div className="bg-white rounded-2xl shadow-sm border border-base-200 overflow-hidden">
    <div className="overflow-x-auto">
      <table className="table w-full border-separate border-spacing-0">
        <thead className="bg-base-100/50">
          <tr>
            <th className="py-4 px-6 text-xs font-bold uppercase text-base-content/50">Issue Details</th>
            <th className="py-4 px-6 text-xs font-bold uppercase text-base-content/50">Priority</th>
            <th className="py-4 px-6 text-xs font-bold uppercase text-base-content/50">Status</th>
            <th className="py-4 px-6 text-xs font-bold uppercase text-base-content/50">Assigned Time</th>
            <th className="py-4 px-6 text-xs font-bold uppercase text-base-content/50 text-right">Operations</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-base-200">
          {sortedIssues.map((issue, index) => {
            const currentStatus = issue.status || "assigned";
            const nextStatuses = STATUS_FLOW[currentStatus] || [];
            const isBoosted = issue.priority === "boosted";

            return (
              <tr 
                key={issue._id} 
                className={`group transition-colors hover:bg-base-50/80 ${isBoosted ? "bg-orange-50/30" : ""}`}
              >
                {/* Title & Index */}
                <td className="py-4 px-6">
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-mono text-base-content/30">{String(index + 1).padStart(2, '0')}</span>
                    <div className="font-bold text-base-content group-hover:text-primary transition-colors">
                      {issue.title}
                    </div>
                  </div>
                </td>

                {/* Priority */}
                <td className="py-4 px-6">
                  {isBoosted ? (
                    <div className="flex items-center gap-1.5 text-orange-600 font-bold text-xs uppercase tracking-wider">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                      </span>
                      🔥 Boosted
                    </div>
                  ) : (
                    <span className="text-base-content/50 text-xs font-medium uppercase tracking-widest">Normal</span>
                  )}
                </td>

                {/* Status Badge */}
                <td className="py-4 px-6">
                  <div className={`badge badge-md gap-2 font-bold border-none capitalize ${statusBadge(currentStatus)}`}>
                    {currentStatus.replace("_", " ")}
                  </div>
                </td>

                {/* Date */}
                <td className="py-4 px-6">
                  <div className="text-sm text-base-content/70">
                    {issue.assignedStaff?.assignedAt
                      ? new Date(issue.assignedStaff.assignedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
                      : "—"}
                  </div>
                </td>

                {/* Actions */}
                <td className="py-4 px-6">
                  <div className="flex justify-end gap-2">
                    {nextStatuses.length > 0 ? (
                      nextStatuses.map((status) => (
                        <button
                          key={status}
                          className="btn btn-sm btn-primary btn-outline hover:btn-active normal-case shadow-sm border-2"
                          onClick={() =>
                            statusMutation.mutate({
                              issueId: issue._id,
                              newStatus: status,
                            })
                          }
                        >
                          Mark as {status.replace("_", " ")}
                        </button>
                      ))
                    ) : (
                      <span className="badge badge-ghost badge-sm opacity-50 italic">Workflow Complete</span>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  </div>
</div>
  );
};

export default AssignedIssues;
