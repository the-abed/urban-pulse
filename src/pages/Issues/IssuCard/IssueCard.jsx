import { Link, useNavigate } from "react-router-dom";
import { MapPin } from "lucide-react";
import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast, { Toaster } from "react-hot-toast";
import { SlLike } from "react-icons/sl";

const IssueCard = ({ issue }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const {
    _id,
    title,
    category,
    priority,
    city,
    area,
    photoUrl,
    status, // Added status for the badge requirement
    userEmail, // Assuming the issue object contains the creator's email
    upvotes = 0,
    upvotedBy = [], // Assuming the backend returns an array of user emails/IDs
  } = issue;

  // Local state for instant UI update
  const [voteCount, setVoteCount] = useState(upvotes);
  // Check if current user has already upvoted based on the upvotedBy array
  const [hasUpvoted, setHasUpvoted] = useState(upvotedBy.includes(user?.email));
  const [loading, setLoading] = useState(false);

  const handleUpvote = async () => {
    // 1. Requirement: If not logged in, redirect to login
    if (!user) {
      toast.error("Please login to upvote");
      return navigate("/login");
    }

    // 2. Requirement: Users cannot upvote their own issue
    if (user?.email === userEmail) {
      return toast.error("You cannot upvote your own issue");
    }

    // 3. Prevent multiple clicks or double upvoting
    if (hasUpvoted || loading) return;

    // --- OPTIMISTIC UI UPDATE ---
    setVoteCount((prev) => prev + 1);
    setHasUpvoted(true);

    try {
      setLoading(true);
      // 4. Requirement: Increase upvote count in DB
      await axiosSecure.patch(`/issue/${_id}/upvote`, {
        userEmail: user.email,
      });
      toast.success("Upvoted successfully!");
    } catch (error) {
      // 5. Rollback UI if the server request fails
      setVoteCount((prev) => prev - 1);
      setHasUpvoted(false);
      console.error("Upvote failed", error);
      toast.error(error.response?.data?.message || "Failed to upvote");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Link to={`/issue-details/${_id}`}>
      <div className="bg-base-100 shadow-md rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-200 flex flex-col h-full">
        <Toaster position="top-center" />

        {/* Image */}
        <div className="h-48 w-full overflow-hidden relative">
          <img
            src={photoUrl}
            alt={title}
            className="h-full w-full object-cover hover:scale-105 transition-all duration-300"
          />
          {/* Status Badge - Top Right */}
          <div className="absolute top-2 right-2">
            <span
              className={`badge ${
                status === "resolved" ? "badge-success" : "badge-warning"
              } text-white border-none shadow-sm`}
            >
              {status}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col flex-grow space-y-3">
          {/* Title */}
          <h2 className="text-lg font-bold text-gray-800 line-clamp-1">
            {title}
          </h2>

          {/* Category & Priority Badges */}
          <div className="flex flex-wrap gap-2">
            <span className="badge badge-secondary badge-outline text-xs capitalize">
              {category}
            </span>

            <span
              className={`badge text-xs capitalize text-white border-none ${
                priority === "high" ? "bg-red-500" : "bg-blue-500"
              }`}
            >
              {priority === "high" ? "High Priority" : "Normal Priority"}
            </span>
          </div>

          {/* Location */}
          <p className="flex items-center gap-1 text-gray-600 text-sm">
            <MapPin size={14} className="text-primary" />
            {area}, {city}
          </p>

          {/* Footer - Pushed to bottom */}
          <div className="mt-auto pt-4 flex justify-between items-center border-t border-gray-100">
            {/* Upvote Button */}
            <button
              onClick={handleUpvote}
              disabled={hasUpvoted || user?.email === userEmail}
              className={`flex items-center gap-2 px-3 py-1 rounded-lg transition-all
              ${
                hasUpvoted
                  ? "bg-primary/10 text-primary font-bold"
                  : "hover:bg-gray-100 text-gray-600"
              } 
              ${user?.email === userEmail && "opacity-50 cursor-not-allowed"}
            `}
            >
              <SlLike className={hasUpvoted ? "fill-current" : ""} />
              <span className="text-sm">{voteCount}</span>
            </button>

            {/* Details Button */}
            <Link to={`/issue-details/${_id}`}>
              <button className="btn btn-primary btn-sm rounded-lg px-4 normal-case">
                View Details
              </button>
            </Link>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default IssueCard;
