import { Link, useNavigate } from "react-router-dom";
import { MapPin, ArrowRight, ThumbsUp } from "lucide-react";
import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast, { Toaster } from "react-hot-toast";

const IssueCard = ({ issue }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const {
    _id,
    title,
    category,
    boosted,
    district,
    upazila,
    photoUrl,
    status,
    reporterEmail,
    upvotes = 0,
    upvotedBy = [],
  } = issue;

  const [voteCount, setVoteCount] = useState(upvotes);
  const [hasUpvoted, setHasUpvoted] = useState(upvotedBy.includes(user?.email));
  const [loading, setLoading] = useState(false);

  const handleUpvote = async () => {
    if (!user) {
      toast.error("Please login to upvote");
      return navigate("/login");
    }
    if (user?.email === reporterEmail) {
      return toast.error("You cannot upvote your own issue");
    }
    if (hasUpvoted || loading) return;

    setVoteCount((prev) => prev + 1);
    setHasUpvoted(true);

    try {
      setLoading(true);
      await axiosSecure.patch(`/issue/${_id}/upvote`, { userEmail: user.email });
    } catch (error) {
      setVoteCount((prev) => prev - 1);
      setHasUpvoted(false);
      toast.error(error.response?.data?.message || "Failed to upvote");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="group bg-base-200 rounded-[2rem] overflow-hidden hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 border border-gray-100 flex flex-col h-full relative">
      <Toaster position="top-center" />

      {/* Image Container */}
      <div className="h-56 w-full overflow-hidden relative">
        <img
          src={photoUrl}
          alt={title}
          className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        
        {/* Status Overlay - Glassmorphism */}
        <div className="absolute top-4 left-4">
          <div className={`backdrop-blur-md bg-white/70 px-4 py-1.5 rounded-full border border-white/50 shadow-sm`}>
            <span className={`text-[10px] font-black uppercase tracking-widest ${
                status === "resolved" ? "text-success" : "text-orange-600"
              }`}>
              ● {status}
            </span>
          </div>
        </div>

        {/* Priority Indicator */}
        {boosted && (
          <div className="absolute top-4 right-4 animate-pulse">
             <span className="bg-primary text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-lg uppercase tracking-tighter">
               🔥 Boosted
             </span>
          </div>
        )}
      </div>

      {/* Body Content */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-3">
          <span className="text-[10px] font-bold text-primary bg-primary/5 px-3 py-1 rounded-md uppercase tracking-widest">
            {category}
          </span>
        </div>

        <h2 className="text-xl font-extrabold text-gray-900 leading-tight mb-2 group-hover:text-primary transition-colors line-clamp-2">
          {title}
        </h2>

        <p className="flex items-center gap-1.5 text-base-content/60 text-sm font-medium mb-4">
          <MapPin size={14} className="text-secondary" />
          {upazila}, {district}
        </p>

        {/* Action Footer */}
        <div className="mt-auto pt-6 flex items-center justify-between border-t border-gray-200">
          
          {/* Elegant Upvote */}
          <button
            onClick={handleUpvote}
            disabled={hasUpvoted || user?.email === reporterEmail}
            className={`flex items-center gap-2.5 transition-all duration-300 ${
              hasUpvoted 
                ? "text-primary scale-110" 
                : "text-gray-400 hover:text-primary"
            } ${user?.email === reporterEmail ? "opacity-30 cursor-not-allowed" : "cursor-pointer"}`}
          >
            <div className={`p-2 rounded-full transition-colors ${hasUpvoted ? "bg-primary/10" : "bg-gray-50"}`}>
              <ThumbsUp size={18} fill={hasUpvoted ? "currentColor" : "none"} />
            </div>
            <span className="text-sm font-bold">{voteCount}</span>
          </button>

          {/* Details Link */}
          <Link 
            to={`/issue-details/${_id}`}
            className="group/btn flex items-center gap-2 text-sm font-bold text-gray-900 hover:text-primary transition-colors"
          >
            View Details 
            <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default IssueCard;