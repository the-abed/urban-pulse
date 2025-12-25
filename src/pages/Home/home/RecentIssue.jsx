import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import IssueCardSkeleton from "../../Issues/IssuCard/IssueCardSkeleton/IssueCardSkeleton";
import IssueCard from "../../Issues/IssuCard/IssueCard";
import { motion } from "framer-motion";
import { HiOutlineLightningBolt } from "react-icons/hi";
import { Link } from "react-router-dom";

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
  });

  const issues = data?.issues || [];
  const recentIssues = issues.slice(0, 3);

  return (
    <section className="py-16 relative overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 -z-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -z-10 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4">
        {/* Colourful Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-secondary font-bold tracking-widest uppercase text-sm">
              <HiOutlineLightningBolt className="animate-pulse" />
              <span>Live Updates</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black">
              Recent <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Community</span> Issues
            </h2>
            <p className="text-gray-500 max-w-lg">
              Stay informed about the latest reports in your neighborhood and support your fellow citizens.
            </p>
          </div>

          <Link to="/issues">
            <button className="btn btn-ghost hover:bg-primary/10 text-primary font-bold gap-2 group">
              Explore All Issues 
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </Link>
        </div>

        {/* Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading
            ? [...Array(6)].map((_, idx) => (
                <IssueCardSkeleton key={idx} />
              ))
            : recentIssues.map((issue, index) => (
                <motion.div
                  key={issue._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <IssueCard issue={issue} />
                </motion.div>
              ))}
        </div>

        {/* Empty State */}
        {!isLoading && recentIssues.length === 0 && (
          <div className="text-center py-20 bg-base-200 rounded-[2rem] border-2 border-dashed border-base-300">
             <p className="text-gray-500 font-medium">No recent issues found. Be the first to report!</p>
             <Link to="/dashboard/add-issue" className="btn btn-primary mt-4">Report Now</Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default RecentIssue;