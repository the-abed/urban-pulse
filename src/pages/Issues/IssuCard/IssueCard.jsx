import { Link } from "react-router-dom";
import { ArrowUp, MapPin } from "lucide-react";
import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const IssueCard = ({ issue }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    _id,
    title,
    category,
    priority,
    city,
    area,
    photoUrl,
    upvotes = 0,
    upvotedByUser = false,
  } = issue;

  const [voteCount, setVoteCount] = useState(upvotes);
  const [hasUpvoted, setHasUpvoted] = useState(upvotedByUser);
  const [loading, setLoading] = useState(false);

  const handleUpvote = async () => {
    if (!user) {
      alert("Please login to upvote");
      return;
    }

    if (hasUpvoted || loading) return;

    try {
      setLoading(true);

      await fetch(`/issues/${_id}/upvote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });

      setVoteCount((prev) => prev + 1);
      setHasUpvoted(true);
    } catch (error) {
      console.error("Upvote failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-base-100 shadow-md rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-200">
      
      {/* Image */}
      <div className="h-48 w-full overflow-hidden">
        <img
          src={photoUrl}
          alt={title}
          className="h-full w-full object-cover hover:scale-105 transition-all duration-300"
        />
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">

        {/* Title */}
        <h2 className="text-lg font-semibold text-gray-800 line-clamp-1">
          {title}
        </h2>

        {/* Badges */}
        <div className="flex flex-wrap gap-2">
          <span className="badge badge-secondary capitalize">
            {category}
          </span>

          <span
            className={`badge capitalize ${
              priority === "high" ? "badge-error" : "badge-outline"
            }`}
          >
            {priority === "high" ? "High Priority" : "Normal"}
          </span>
        </div>

        {/* Location */}
        <p className="flex items-center gap-1 text-gray-600 text-sm">
          <MapPin size={16} />
          {city}, {area}
        </p>

        {/* Footer */}
        <div className="flex justify-between items-center pt-3">

          {/* Upvote Button */}
          <button
            onClick={handleUpvote}
            disabled={hasUpvoted}
            className={`flex items-center gap-1 text-sm font-medium transition
              ${hasUpvoted
                ? "text-primary cursor-not-allowed"
                : "text-gray-700 hover:text-primary"
              }`}
          >
            <ArrowUp size={18} />
            <span>{voteCount}</span>
          </button>

          {/* Details Button */}
          <Link to={`/issue/${_id}`}>
            <button className="btn btn-primary btn-sm rounded-full px-4">
              View Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default IssueCard;
