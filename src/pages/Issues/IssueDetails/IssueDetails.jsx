import React from "react";
import {
  MapPin,
  Clock,
  AlertCircle,
  ArrowUpCircle,
  Pencil,
  Trash2,
  UserCheck,
} from "lucide-react";
import { useParams, useNavigate } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import LoaderSpinner from "../../../components/shared/LoaderSpinner";
import toast, { Toaster } from "react-hot-toast";

const IssueDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { user } = useAuth();

  /* ---------------- FETCH ISSUE ---------------- */
  const { data: issue = {}, isLoading } = useQuery({
    queryKey: ["issue", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/issues/${id}`);
      return res.data;
    },
  });

  const {
    title,
    description,
    category,
    district,
    upazila,
    
    photoUrl,
    status,
    createdAt,
    priority,
    boosted,
    assignedStaff,
    timeline = [],
    upvotes = 0,
    upvoters = [],
    reporterEmail,
  } = issue;
  const sortedTimeline = [...timeline].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );



  const isOwner = user?.email === reporterEmail;
  const hasUpvoted = upvoters.includes(user?.email);
  const canEdit = isOwner || user?.role === "admin";

  const upvoteMutation = useMutation({
    mutationFn: async () => axiosSecure.patch(`/issues/${id}/upvote`),

    onSuccess: () => {
      queryClient.invalidateQueries(["issue", id]);
      queryClient.invalidateQueries(["issues"]); // list page sync
    },

    onError: (error) => {
      toast.error(error?.response?.data?.message || "Upvote failed");
    },
  });

  /* ---------------- DELETE ---------------- */
  // const deleteMutation = useMutation({
  //   mutationFn: async () => axiosSecure.delete(`/issues/${id}`),
  //   onSuccess: () => {
  //     queryClient.invalidateQueries(["issues"]);
  //     navigate("/issues");
  //   },
  // });
  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this issue?")) {
      axiosSecure.delete(`/issues/my/${id}`).then(() => {
        queryClient.invalidateQueries(["issues"]);
        navigate("/issues");
      });
    }
  };

  /* ---------------- BOOST ---------------- */
const handleBoost = async (issue) => {
  const boostInfo = {
    issueId: issue._id || issue.id,  // Use _id if available, fallback to id
    amount: 100,
    issueTitle: issue.title,
    trackingId: issue.trackingId,
    reporterEmail: issue.email,  // Rename from issueReporterEmail
  };
  const res = await axiosSecure.post("/create-checkout-session", boostInfo);
  // console.log(res.data);
  window.location.assign(res.data.url);
};
//4242
  if (isLoading) return <LoaderSpinner></LoaderSpinner>;

  return (
    <div className="space-y-10">
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      {/* ---------------- HEADER ---------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* IMAGE */}
        <div className="lg:col-span-2">
          <div className="relative rounded-2xl overflow-hidden shadow-lg">
            <img
              src={photoUrl}
              alt={title}
              className="h-[360px] w-full object-cover"
            />
            <span className="absolute top-4 left-4 badge badge-primary">
              {category}
            </span>
            {priority === "high" && (
              <span className="absolute top-4 right-4 badge badge-error">
                High Priority
              </span>
            )}
          </div>
        </div>

        {/* INFO CARD */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body space-y-3">
            <h2 className="card-title text-2xl">{title}</h2>

            <p className="flex gap-2 text-sm opacity-70">
              <MapPin size={16} /> {district}, {upazila}, 
            </p>

            <p className="flex gap-2 text-sm opacity-70">
              <Clock size={16} />
              {new Date(createdAt).toLocaleDateString()}
            </p>

            <span className="badge badge-outline">{status}</span>

            {/* -------- ACTION BUTTONS -------- */}
            {canEdit && (
              <button
                onClick={() => navigate(`/issues/edit/${id}`)}
                className="btn btn-warning btn-sm flex gap-2"
              >
                <Pencil size={16} /> Edit
              </button>
            )}

            {isOwner && (
              <button
                onClick={handleDelete}
                className="btn btn-error btn-sm flex gap-2"
              >
                <Trash2 size={16} /> Delete
              </button>
            )}

            {!boosted && (
              <button
                onClick={() => handleBoost(issue)}
                className="btn btn-primary flex gap-2"
              >
                <ArrowUpCircle size={18} />
                Boost Issue (৳100)
              </button>
            )}
            <button
              onClick={() => upvoteMutation.mutate()}
              disabled={isOwner || hasUpvoted || upvoteMutation.isLoading}
              className="btn btn-outline flex gap-2"
            >
              <ArrowUpCircle size={18} />
              {hasUpvoted ? "Upvoted" : "Upvote"} ({upvotes})
            </button>
          </div>
        </div>
      </div>

      {/* ---------------- DESCRIPTION ---------------- */}
      <div className="card bg-base-100 shadow">
        <div className="card-body">
          <h3 className="text-lg font-semibold flex gap-2">
            <AlertCircle size={18} /> Description
          </h3>
          <p className="opacity-80">{description}</p>
        </div>
      </div>

      {/* ---------------- STAFF INFO ---------------- */}
      {assignedStaff && (
        <div className="card bg-base-100 shadow">
          <div className="card-body">
            <h3 className="text-lg font-semibold flex gap-2">
              <UserCheck size={18} /> Assigned Staff
            </h3>
            <p>
              <strong>Name:</strong> {assignedStaff.name}
            </p>
            <p>
              <strong>Email:</strong> {assignedStaff.email}
            </p>
            <p>
              <strong>Assigned At:</strong> {assignedStaff.assignedAt}
            </p>
          </div>
        </div>
      )}

      {/* ---------------- TIMELINE ---------------- */}
     <div className="card bg-base-100 shadow-md">
      <div className="card-body">
        <h2 className="card-title text-lg">Issue Timeline</h2>

        <ul className="timeline timeline-vertical">
          {sortedTimeline.map((item, index) => (
            <li key={index}>
              {/* LEFT SIDE */}
              <div className="timeline-start text-sm font-semibold capitalize">
                {item.status}
              </div>

              {/* DOT */}
              <div className="timeline-middle">
                <div
                  className={`w-3 h-3 rounded-full ${
                    item.updatedBy === "Admin"
                      ? "bg-primary"
                      : "bg-secondary"
                  }`}
                ></div>
              </div>

              {/* RIGHT SIDE */}
              <div className="timeline-end">
                <p className="font-medium">{item.message}</p>

                <p className="text-xs opacity-70 mt-1">
                  {item.updatedBy}
                  {item.reporterEmail
                    ? ` • ${item.reporterEmail}`
                    : ""}
                </p>

                <p className="text-xs opacity-50">
                  {new Date(item.date).toLocaleString()}
                </p>
              </div>

              {index !== sortedTimeline.length - 1 && <hr />}
            </li>
          ))}
        </ul>
      </div>
    </div>
    </div>
  );
};

export default IssueDetails;
