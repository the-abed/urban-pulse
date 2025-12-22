import React from "react";
import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoaderSpinner from "../../components/shared/LoaderSpinner";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  AreaChart,
  Area,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";


const StatCard = ({ title, value, color }) => (
  <div className={`card bg-base-100 shadow border-l-4 ${color}`}>
    <div className="card-body">
      <h3 className="text-sm uppercase text-gray-500">{title}</h3>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  </div>
);

const AdminDashboard = () => {
  const axiosSecure = useAxiosSecure();

  const { data, isLoading } = useQuery({
    queryKey: ["admin-dashboard"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/dashboard-summary");
      return res.data;
    },
  });

  if (isLoading) {
    return <LoaderSpinner></LoaderSpinner>;
  }

  /* -----------------------------
     Extract stats safely
  ----------------------------- */
  const statusMap = {};
  data?.issues?.byStatus?.forEach((item) => {
    statusMap[item.status] = item.count;
  });

  const totalIssues = Object.values(statusMap).reduce(
    (sum, val) => sum + val,
    0
  );

  const totalRevenue = data?.payments?.summary?.totalRevenue || 0;
  const totalPayments = data?.payments?.summary?.totalPayments || 0;
  // console.log("Payments Per Day:", data.payments.perDay);

  const paymentsPerDay = data?.payments?.perDay || [];

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h2 className="text-3xl font-bold">Admin Dashboard</h2>

        <Link to="/dashboard/addstaff">
          <button className="btn btn-primary">Add Staff</button>
        </Link>
      </div>

      {/* =============================
          STAT CARDS
      ============================== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <StatCard
          title="Total Issues"
          value={totalIssues}
          color="border-gray-500"
        />
        <StatCard
          title="Pending Issues"
          value={statusMap.pending || 0}
          color="border-yellow-500"
        />
        <StatCard
          title="Assigned Issues"
          value={statusMap.assigned || 0}
          color="border-blue-500"
        />
        <StatCard
          title="Resolved Issues"
          value={statusMap.closed || 0}
          color="border-green-500"
        />
        <StatCard
          title="Rejected Issues"
          value={statusMap.rejected || 0}
          color="border-green-500"
        />
        <StatCard
          title="Total Revenue"
          value={`$${totalRevenue}`}
          color="border-purple-500"
        />
        <StatCard
          title="Total Payments"
          value={totalPayments}
          color="border-indigo-500"
        />
      </div>

      {/* =============================
          PLACEHOLDER SECTIONS
      ============================== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
  {/* ================= Issues Per Day ================= */}
  <div className="card bg-base-100 shadow">
    <div className="card-body">
      <h3 className="text-xl font-semibold mb-4">Issues Per Day</h3>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data.issues.perDay}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="_id" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="totalIssues" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>

  {/* ================= Payments Per Day ================= */}
  <div className="card bg-base-100 shadow">
  <div className="card-body">
    <h3 className="text-xl font-semibold mb-4">Payments Per Day</h3>

    <ResponsiveContainer width="100%" height={320}>
      <AreaChart data={data.payments.perDay}>
        <defs>
          <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopOpacity={0.8} />
            <stop offset="95%" stopOpacity={0.1} />
          </linearGradient>
        </defs>

        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="_id" />
        <YAxis />
        <Tooltip formatter={(value) => `$${value}`} />
        <Area
          type="monotone"
          dataKey="totalAmount"
          strokeWidth={3}
          fill="url(#revenueGradient)"
          fillOpacity={1}
        />
      </AreaChart>
    </ResponsiveContainer>
  </div>
</div>

</div>

    </div>
  );
};

export default AdminDashboard;
