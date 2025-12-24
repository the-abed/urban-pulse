import React, { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import IssueCard from "./IssuCard/IssueCard";
import IssueCardSkeleton from "./IssuCard/IssueCardSkeleton/IssueCardSkeleton";
import { Filter, Search, RotateCcw } from "lucide-react";

const AllIssue = () => {
  const axiosSecure = useAxiosSecure();
  
  // State for Pagination & Filtering
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [search, setSearch] = useState("");
  
  const limit = 9; // Changed to 9 for better 3-column grid alignment

  // 1. Fetch Data with Params
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["issues", page, category, status, priority, search],
    queryFn: async () => {
      const res = await axiosSecure.get("/issues", {
        params: { 
          page, 
          limit, 
          category: category || undefined, 
          status: status || undefined, 
          priority: priority || undefined,
          search: search || undefined 
        },
      });
      return res.data;
    },
  });

  const issues = data?.issues || [];
  const totalPages = data?.totalPages || 1;

  // Reset Filters handler
  const handleReset = () => {
    setCategory("");
    setStatus("");
    setPriority("");
    setSearch("");
    setPage(1);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Header & Filter Section */}
      <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h2 className="text-3xl font-black text-gray-900 tracking-tight">Urban Explorer</h2>
            <p className="text-gray-500 text-sm">Discover and track infrastructure reports in your city.</p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search by title or location..."
              className="input input-bordered w-full pl-12 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary/20"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            />
          </div>
        </div>

        <div className="divider my-6 opacity-50"></div>

        {/* Filters Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Category Filter */}
          <div className="form-control w-full">
            <label className="label py-1 text-xs font-bold text-gray-400 uppercase tracking-widest">Category</label>
            <select 
              className="select select-bordered bg-gray-50 border-none rounded-xl focus:outline-none"
              value={category}
              onChange={(e) => { setCategory(e.target.value); setPage(1); }}
            >
              <option value="">All Categories</option>
              <option value="road">Roads & Potholes</option>
              <option value="electricity">Electricity</option>
              <option value="water">Water Supply</option>
              <option value="garbage">Waste Management</option>
              <option value="streetlight">Street Lights</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Status Filter */}
          <div className="form-control w-full">
            <label className="label py-1 text-xs font-bold text-gray-400 uppercase tracking-widest">Status</label>
            <select 
              className="select select-bordered bg-gray-50 border-none rounded-xl focus:outline-none"
              value={status}
              onChange={(e) => { setStatus(e.target.value); setPage(1); }}
            >
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="assigned">Assigned</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>

          {/* Priority Filter */}
          <div className="form-control w-full">
            <label className="label py-1 text-xs font-bold text-gray-400 uppercase tracking-widest">Priority</label>
            <select 
              className="select select-bordered bg-gray-50 border-none rounded-xl focus:outline-none"
              value={priority}
              onChange={(e) => { setPriority(e.target.value); setPage(1); }}
            >
              <option value="">All Priority</option>
              <option value="low">Low</option>
              <option value="normal">Normal</option>
              <option value="high">High</option>
            </select>
          </div>

          {/* Reset Button */}
          <div className="flex items-end">
            <button 
              onClick={handleReset}
              className="btn btn-ghost w-full rounded-xl gap-2 text-gray-500 hover:text-primary hover:bg-primary/5 border border-dashed border-gray-200"
            >
              <RotateCcw size={18} /> Reset Filters
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="relative">
        {/* Loading overlay for fetching state */}
        {isFetching && !isLoading && (
          <div className="absolute top-0 right-0 p-2">
            <span className="loading loading-spinner text-primary"></span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading
            ? [...Array(6)].map((_, idx) => <IssueCardSkeleton key={idx} />)
            : issues.map((issue) => <IssueCard key={issue._id} issue={issue} />)
          }
        </div>

        {/* Empty State */}
        {!isLoading && issues.length === 0 && (
          <div className="text-center py-20 bg-white rounded-[2rem] border border-dashed border-gray-200">
            <Filter size={48} className="mx-auto text-gray-200 mb-4" />
            <h3 className="text-xl font-bold text-gray-400">No matching issues found</h3>
            <p className="text-gray-400 text-sm">Try adjusting your filters or search terms.</p>
          </div>
        )}
      </div>

      {/* Pagination Container */}
      {totalPages > 1 && (
        <div className="flex flex-col md:flex-row justify-center items-center gap-6 mt-16">
          <div className="join bg-white shadow-sm border border-gray-100 rounded-2xl p-1">
            <button
              className="join-item btn btn-ghost btn-sm md:btn-md"
              disabled={page === 1}
              onClick={() => { setPage((p) => p - 1); window.scrollTo(0, 0); }}
            >
              Prev
            </button>
            <button className="join-item btn btn-ghost no-animation pointer-events-none btn-sm md:btn-md">
              Page {data?.currentPage} of {totalPages}
            </button>
            <button
              className="join-item btn btn-ghost btn-sm md:btn-md"
              disabled={page === totalPages}
              onClick={() => { setPage((p) => p + 1); window.scrollTo(0, 0); }}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllIssue;