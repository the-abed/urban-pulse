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
    <div className="group bg-base-100 rounded-[1.5rem] md:rounded-[2rem] overflow-hidden hover:shadow-xl transition-all duration-500 border border-base-300 flex flex-col h-full relative">
      <Toaster position="top-center" />

      {/* Image Container - Adjusted height for mobile */}
      <div className="h-32 sm:h-44 md:h-56 w-full overflow-hidden relative">
        <img
          src={photoUrl}
          alt={title}
          className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        
        {/* Status Overlay - Smaller on mobile */}
        <div className="absolute top-2 left-2 md:top-4 md:left-4">
          <div className="backdrop-blur-md bg-white/80 px-2 py-0.5 md:px-4 md:py-1.5 rounded-full border border-white/50 shadow-sm">
            <span className={`text-[8px] md:text-[10px] font-black uppercase tracking-widest ${
                status === "resolved" ? "text-success" : "text-orange-600"
              }`}>
              {status}
            </span>
          </div>
        </div>

        {boosted && (
          <div className="absolute top-2 right-2 md:top-4 md:right-4">
             <span className="bg-primary text-white text-[8px] md:text-[10px] font-bold px-2 py-0.5 md:px-3 md:py-1.5 rounded-full shadow-lg uppercase">
               🔥
             </span>
          </div>
        )}
      </div>

      {/* Body Content - Reduced padding on mobile */}
      <div className="p-3 md:p-6 flex flex-col flex-grow">
        <div className="mb-1 md:mb-3">
          <span className="text-[8px] md:text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-md uppercase tracking-tighter md:tracking-widest">
            {category}
          </span>
        </div>

        {/* Responsive Heading: Text size is key for 2-column mobile */}
        <h2 className="text-sm md:text-xl font-black text-base-content leading-tight mb-1 md:mb-2 group-hover:text-primary transition-colors line-clamp-2">
          {title}
        </h2>

        <p className="flex items-center gap-1 text-[10px] md:text-sm text-base-content/60 font-medium mb-3 md:mb-4">
          <MapPin size={10} className="text-secondary md:w-3.5" />
          <span className="truncate">{upazila}, {district}</span>
        </p>

        {/* Action Footer - Stacks or shrinks for mobile */}
        <div className="mt-auto pt-3 md:pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between border-t border-base-300 gap-2">
          
          <button
            onClick={handleUpvote}
            disabled={hasUpvoted || user?.email === reporterEmail}
            className={`flex items-center gap-1.5 md:gap-2.5 transition-all ${
              hasUpvoted ? "text-primary" : "text-base-content/40 hover:text-primary"
            }`}
          >
            <div className={`p-1.5 md:p-2 rounded-full ${hasUpvoted ? "bg-primary/10" : "bg-base-200"}`}>
              <ThumbsUp size={14} className="md:w-[18px]" fill={hasUpvoted ? "currentColor" : "none"} />
            </div>
            <span className="text-xs md:text-sm font-bold">{voteCount}</span>
          </button>

          <Link 
            to={`/issue-details/${_id}`}
            className="flex items-center gap-1 text-[10px] md:text-sm font-bold text-base-content hover:text-primary transition-colors ml-1 sm:ml-0"
          >
            Details <ArrowRight size={12} className="md:w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default IssueCard;