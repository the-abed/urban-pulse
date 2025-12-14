import React from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import IssueCard from "./IssuCard/IssueCard";
import IssueCardSkeleton from "./IssuCard/IssueCardSkeleton/IssueCardSkeleton";


const AllIssue = () => {
  
  const axiosSecure = useAxiosSecure();

  const { data: issues = [], isLoading } = useQuery({
    queryKey: ["issues"],
    queryFn: async () => {
      const res = await axiosSecure.get("/issues");
      // console.log(res.data);
      return res.data;
    },
  });
  return (
    <div>
      <h2>All Issue: {issues.length}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {isLoading
          ? [...Array(6)].map((_, idx) => <IssueCardSkeleton key={idx} />)
          : issues.map((issue) => <IssueCard key={issue._id} issue={issue} />)}
      </div>
    </div>
  );
};

export default AllIssue;
