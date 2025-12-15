import React, { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import IssueCard from "./IssuCard/IssueCard";
import IssueCardSkeleton from "./IssuCard/IssueCardSkeleton/IssueCardSkeleton";

const AllIssue = () => {
  const axiosSecure = useAxiosSecure();
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isLoading } = useQuery({
    queryKey: ["issues", page],
    queryFn: async () => {
      const res = await axiosSecure.get("/issues", {
        params: { page, limit },
      });
      return res.data;
    },
    keepPreviousData: true,
  });

  const issues = data?.issues || [];
  const totalPages = data?.totalPages || 1;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">
        All Issues: {data?.totalIssues || 0}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {isLoading
          ? [...Array(6)].map((_, idx) => (
              <IssueCardSkeleton key={idx} />
            ))
          : issues.map((issue) => (
              <IssueCard key={issue._id} issue={issue} />
            ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          className="btn btn-outline"
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
        >
          Prev
        </button>

        <span>
          Page {data?.currentPage} of {totalPages}
        </span>

        <button
          className="btn btn-outline"
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AllIssue;
