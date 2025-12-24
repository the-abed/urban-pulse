import React from "react";
import {
  MapPin,
  Clock,
  AlertCircle,
  ArrowUpCircle,
  Pencil,
  Trash2,
  UserCheck,
  Zap,
  ChevronRight,
} from "lucide-react";
import { useParams, useNavigate } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import LoaderSpinner from "../../../components/shared/LoaderSpinner";
import toast from "react-hot-toast";

const IssueDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { user } = useAuth();

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
    email, // Based on your backend fix, the field name is 'email'
  } = issue;

  const sortedTimeline = [...timeline].sort(
    (a, b) => new Date(b.date) - new Date(a.date) // Newer updates at top
  );

  /* ---------------- LOGIC CHECKS ---------------- */
  const isOwner = user?.email === email;
  const isPending = status?.toLowerCase() === "pending";
  const hasUpvoted = upvoters.includes(user?.email);

  // Requirement: Only show Edit/Delete if Owner AND status is Pending
  const showOwnerActions = isOwner && isPending;

  /* ---------------- MUTATIONS ---------------- */
  const upvoteMutation = useMutation({
    mutationFn: async () => axiosSecure.patch(`/issues/${id}/upvote`),
    onSuccess: () => {
      queryClient.invalidateQueries(["issue", id]);
      toast.success("Thanks for upvoting!");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Upvote failed");
    },
  });

  const handleDelete = () => {
    toast((t) => (
      <span className="flex flex-col gap-2">
        <b>Delete this issue?</b>
        <div className="flex gap-2 justify-center mt-2">
          <button 
            className="btn btn-xs btn-error" 
            onClick={() => {
              toast.dismiss(t.id);
              executeDelete();
            }}
          >
            Yes, Delete
          </button>
          <button className="btn btn-xs" onClick={() => toast.dismiss(t.id)}>Cancel</button>
        </div>
      </span>
    ));
  };

  const executeDelete = async () => {
    const loadingToast = toast.loading("Deleting...");
    try {
      await axiosSecure.delete(`/issues/my/${id}`);
      toast.success("Issue deleted successfully", { id: loadingToast });
      navigate("/issues");
    } catch (err) {
      toast.error("Failed to delete", { id: loadingToast });
    }
  };

  const handleBoost = async () => {
    try {
      const boostInfo = {
        issueId: issue._id,
        amount: 100,
        issueTitle: title,
        reporterEmail: email,
      };
      const res = await axiosSecure.post("/create-checkout-session", boostInfo);
      window.location.assign(res.data.url);
    } catch (err) {
      toast.error("Boost initialization failed");
    }
  };

  if (isLoading) return <LoaderSpinner />;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* ---------------- BREADCRUMB ---------------- */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <span className="cursor-pointer hover:text-primary" onClick={() => navigate("/issues")}>Issues</span>
        <ChevronRight size={14} />
        <span className="font-medium text-gray-900 truncate max-w-[200px]">{title}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: Image & Description */}
        <div className="lg:col-span-8 space-y-8">
          {/* Main Visual */}
          <div className="relative group rounded-3xl overflow-hidden shadow-2xl bg-gray-200 aspect-video lg:aspect-auto lg:h-[450px]">
            <img
              src={photoUrl}
              alt={title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute top-4 left-4 flex gap-2">
              <span className="px-4 py-1.5 bg-white/90 backdrop-blur-md text-primary font-bold rounded-full shadow-sm text-xs uppercase tracking-wider">
                {category}
              </span>
              {priority === "high" && (
                <span className="px-4 py-1.5 bg-red-600 text-white font-bold rounded-full shadow-lg text-xs uppercase animate-pulse">
                  High Priority
                </span>
              )}
            </div>
            {boosted && (
              <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-lg font-bold text-sm shadow-lg">
                <Zap size={16} fill="currentColor" /> Boosted
              </div>
            )}
          </div>

          {/* Description Card */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <AlertCircle className="text-primary" size={24} /> 
              Issue Overview
            </h3>
            <p className="text-gray-600 leading-relaxed text-lg italic whitespace-pre-line">
              "{description}"
            </p>
          </div>

          {/* Timeline Section */}
          <div className="bg-gray-50 p-8 rounded-3xl border border-dashed border-gray-300">
            <h3 className="text-xl font-bold text-gray-900 mb-8 flex items-center gap-2">
              <Clock className="text-primary" size={24} /> 
              Progress Timeline
            </h3>
            <div className="space-y-8">
              {sortedTimeline.map((item, index) => (
                <div key={index} className="flex gap-4 relative">
                  {index !== sortedTimeline.length - 1 && (
                    <div className="absolute left-[11px] top-7 bottom-[-32px] w-[2px] bg-gray-200" />
                  )}
                  <div className={`mt-1.5 w-6 h-6 rounded-full border-4 border-white shadow-sm shrink-0 z-10 ${
                    item.status === 'resolved' ? 'bg-green-500' : 'bg-primary'
                  }`} />
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-gray-900 capitalize">{item.status}</span>
                      <span className="text-xs text-gray-400 font-mono bg-gray-100 px-2 py-0.5 rounded">
                        {new Date(item.date).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mt-1">{item.message}</p>
                    <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-tighter">Updated by {item.updatedBy}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Sidebar Actions */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Status & Identity Card */}
          <div className="bg-white p-6 rounded-3xl shadow-xl border border-gray-50">
            <h1 className="text-2xl font-black text-gray-900 mb-2 leading-tight">{title}</h1>
            <div className="flex flex-col gap-3 mb-6">
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <MapPin size={16} className="text-primary" />
                <span>{upazila}, {district}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <Clock size={16} className="text-primary" />
                <span>Reported {new Date(createdAt).toLocaleDateString()}</span>
              </div>
            </div>

            <div className={`w-full py-3 rounded-2xl text-center font-bold mb-6 text-sm uppercase tracking-widest ${
              status === 'pending' ? 'bg-orange-50 text-orange-600 border border-orange-100' : 
              status === 'resolved' ? 'bg-green-50 text-green-600 border border-green-100' : 
              'bg-blue-50 text-blue-600 border border-blue-100'
            }`}>
              Status: {status}
            </div>

            <div className="flex flex-col gap-3">
              {/* Upvote Button */}
              <button
                onClick={() => upvoteMutation.mutate()}
                disabled={isOwner || hasUpvoted || upvoteMutation.isLoading}
                className={`btn btn-lg rounded-2xl border-none transition-all ${
                  hasUpvoted ? "bg-green-100 text-green-700" : "bg-primary text-white hover:shadow-lg active:scale-95"
                }`}
              >
                <ArrowUpCircle size={20} className={hasUpvoted ? "fill-green-700" : ""} />
                {hasUpvoted ? "Already Supported" : "Support Issue"}
                <span className="ml-2 bg-black/10 px-2 py-1 rounded-md text-xs">{upvotes}</span>
              </button>

              {/* Boost Button */}
              {!boosted && !isOwner && (
                <button
                  onClick={handleBoost}
                  className="btn btn-outline btn-lg border-2 border-yellow-500 text-yellow-600 hover:bg-yellow-500 hover:border-yellow-500 rounded-2xl flex gap-2"
                >
                  <Zap size={20} />
                  Boost for Visibility
                </button>
              )}
            </div>
          </div>

          {/* Owner Control Center - Logic Fix Applied Here */}
          {showOwnerActions && (
            <div className="bg-slate-900 p-6 rounded-3xl shadow-xl text-white">
              <h4 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-4">Owner Settings</h4>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => navigate(`/edit-issue/:id${id}`)}
                  className="btn bg-slate-800 hover:bg-slate-700 border-none text-white rounded-xl flex gap-2 flex-1"
                >
                  <Pencil size={16} className="text-yellow-400" /> Edit
                </button>
                <button
                  onClick={handleDelete}
                  className="btn bg-red-900/30 hover:bg-red-900/50 border border-red-800/50 text-red-400 rounded-xl flex gap-2 flex-1"
                >
                  <Trash2 size={16} /> Delete
                </button>
              </div>
              <p className="text-[10px] text-slate-500 mt-4 text-center">
                * Editing is disabled once staff starts working.
              </p>
            </div>
          )}

          {/* Staff Info Card */}
          {assignedStaff && (
            <div className="bg-indigo-50 p-6 rounded-3xl border border-indigo-100">
              <h3 className="text-indigo-900 font-bold mb-4 flex items-center gap-2">
                <UserCheck size={20} /> Handling Staff
              </h3>
              <div className="space-y-2 text-sm text-indigo-800">
                <p><strong>Name:</strong> {assignedStaff.name}</p>
                <p><strong>Email:</strong> {assignedStaff.email}</p>
                <p className="text-xs opacity-70 mt-4">Assigned: {new Date(assignedStaff.assignedAt).toLocaleString()}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default IssueDetails;