import React, { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const Payments = () => {
  const axiosSecure = useAxiosSecure();
  const [filterType, setFilterType] = useState("");
  const [filterMonth, setFilterMonth] = useState("");

  // Fetch payments with filters
  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["admin-payments", filterType, filterMonth],
    queryFn: async () => {
      const res = await axiosSecure.get(`/admin/payments`, {
        params: { type: filterType, month: filterMonth },
      });
      return res.data;
    },
  });

  // Chart Logic: Group payments by month
  const chartData = payments.reduce((acc, curr) => {
    const date = new Date(curr.date);
    const monthName = date.toLocaleString("default", { month: "short" });
    const existing = acc.find((item) => item.name === monthName);
    if (existing) {
      existing.amount += curr.amount;
    } else {
      acc.push({ name: monthName, amount: curr.amount });
    }
    return acc;
  }, []);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <div className="p-6 space-y-8">
      <h2 className="text-3xl font-bold text-gray-800">Payment Transactions</h2>

      {/* Filter Section */}
      <div className="flex flex-wrap gap-4 bg-base-100 p-4 rounded-xl shadow-sm border border-gray-100">
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text font-semibold">Payment Type</span>
          </label>
          <select
            className="select select-bordered"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="">All Types</option>
            <option value="subscription">Subscription</option>
            <option value="fine">Fine / Penalty</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text font-semibold">Month</span>
          </label>
          <select
            className="select select-bordered"
            value={filterMonth}
            onChange={(e) => setFilterMonth(e.target.value)}
          >
            <option value="">All Months</option>
            {months.map((m, idx) => (
              <option key={idx} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>

        <button
          className="btn btn-ghost mt-auto"
          onClick={() => {
            setFilterType("");
            setFilterMonth("");
          }}
        >
          Reset Filters
        </button>
      </div>

      {/* Chart Section */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-80">
        <h3 className="text-lg font-bold mb-4">Revenue Overview</h3>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="amount" fill="#4F46E5" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-100">
        <table className="table w-full">
          <thead className="bg-gray-50">
            <tr>
              <th>User Email</th>
              <th>Transaction ID</th>
              <th>Date</th>
              <th>Type</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="5" className="text-center py-10">
                  <span className="loading loading-spinner"></span>
                </td>
              </tr>
            ) : payments.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-10 text-gray-500">
                  No payment records found.
                </td>
              </tr>
            ) : (
              payments.map((p) => (
                <tr key={p._id} className="hover:bg-gray-50">
                  <td className="font-medium">{p.email}</td>
                  <td className="text-xs font-mono text-gray-500">
                    {p.transactionId}
                  </td>
                  <td>{new Date(p.date).toLocaleDateString()}</td>
                  <td>
                    <span
                      className={`badge badge-sm ${
                        p.type === "subscription"
                          ? "badge-primary"
                          : "badge-ghost"
                      }`}
                    >
                      {p.type}
                    </span>
                  </td>
                  <td className="font-bold text-success">${p.amount}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Payments;
