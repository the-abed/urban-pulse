import React, { useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast } from "react-hot-toast";

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

  if (isLoading) return <div className="p-6">Loading assigned issues...</div>;

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">
        Assigned Issues: {issues.length}
      </h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Assigned At</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {sortedIssues.map((issue, index) => {
              const currentStatus = issue.status || "assigned"; // fallback
              const nextStatuses = STATUS_FLOW[currentStatus] || [];

              return (
                <tr
                  key={issue._id}
                  className={issue.priority === "boosted" ? "bg-orange-50" : ""}
                >
                  <td>{index + 1}</td>
                  <td className="font-medium">{issue.title}</td>
                  <td>
                    {issue.priority === "boosted" ? (
                      <span className="text-orange-600 font-bold">🔥 Boosted</span>
                    ) : (
                      "Normal"
                    )}
                  </td>

                  <td>
                    <span className={statusBadge(currentStatus)}>
                      {currentStatus.replace("_", " ")}
                    </span>
                  </td>

                  <td>
                    {issue.assignedStaff?.assignedAt
                      ? new Date(issue.assignedStaff.assignedAt).toLocaleString()
                      : "Not assigned"}
                  </td>

                  <td className="flex gap-2">
                    {nextStatuses.length > 0 ? (
                      nextStatuses.map((status) => (
                        <button
                          key={status}
                          className="btn btn-sm btn-primary"
                          onClick={() =>
                            statusMutation.mutate({
                              issueId: issue._id,
                              newStatus: status,
                            })
                          }
                        >
                          {status.replace("_", " ")}
                        </button>
                      ))
                    ) : (
                      <span className="text-gray-400">No Action</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssignedIssues;
