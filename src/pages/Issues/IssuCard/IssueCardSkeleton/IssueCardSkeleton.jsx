const IssueCardSkeleton = () => {
  return (
    <div className="bg-base-100 shadow-md rounded-xl overflow-hidden border border-gray-200 animate-pulse">
      {/* Image skeleton */}
      <div className="h-48 w-full bg-gray-300"></div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {/* Title */}
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>

        {/* Badges */}
        <div className="flex gap-3">
          <div className="h-5 w-20 bg-gray-300 rounded"></div>
          <div className="h-5 w-24 bg-gray-300 rounded"></div>
        </div>

        {/* Location */}
        <div className="h-3 bg-gray-300 rounded w-1/2"></div>

        {/* Footer */}
        <div className="flex justify-between items-center pt-3">
          <div className="h-4 bg-gray-300 rounded w-14"></div>
          <div className="h-8 bg-gray-300 rounded w-24"></div>
        </div>
      </div>
    </div>
  );
};

export default IssueCardSkeleton;
