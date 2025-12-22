import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import IssueCardSkeleton from "../../Issues/IssuCard/IssueCardSkeleton/IssueCardSkeleton";
import IssueCard from "../../Issues/IssuCard/IssueCard";



const RecentIssue = () => {
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
  const recentIssues = issues.slice(0, 6);

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
          : recentIssues.map((issue) => (
              <IssueCard key={issue._id} issue={issue} />
            ))}
      </div>

     
    </div>
  );
};

export default RecentIssue;
