import { Link } from "react-router-dom";
import { ArrowUp, MapPin } from "lucide-react";

const IssueCard = ({ issue }) => {
  const {
    _id,
    title,
    category,
    priority,
    city,
    area,
    photoUrl,
    
  } = issue;

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
              priority === "high"
                ? "badge-error"
                : "badge-outline"
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

        {/* Footer Row */}
        <div className="flex justify-between items-center pt-3">
          Upvote
          {/* <button className="flex items-center gap-1 text-gray-700 hover:text-primary transition">
            <ArrowUp size={18} />
            <span>{upvotes}</span>
          </button> */}

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
