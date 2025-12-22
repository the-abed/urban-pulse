import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
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
import LoaderSpinner from "../../components/shared/LoaderSpinner";

const StaffDashboard = () => {
    const axiosSecure = useAxiosSecure();
    const { data: stats, isLoading } = useQuery({
        queryKey: ['staff-stats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/staff-stats');
            return res.data;
        }
    });

    if (isLoading) return <LoaderSpinner></LoaderSpinner>;

    return (
        <div className="p-6 space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Staff Performance Dashboard</h1>
                <div className="badge badge-outline p-4 font-mono">{new Date().toLocaleDateString()}</div>
            </div>

            {/* Optimized Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="stat bg-base-100 shadow rounded-xl border-l-4 border-blue-500">
                    <div className="stat-title text-xs font-bold uppercase">Active Assignments</div>
                    <div className="stat-value text-blue-500">{stats.assigned + stats.inProgress}</div>
                    <div className="stat-desc">Issues awaiting completion</div>
                </div>

                <div className="stat bg-base-100 shadow rounded-xl border-l-4 border-orange-500">
                    <div className="stat-title text-xs font-bold uppercase">Today's New</div>
                    <div className="stat-value text-orange-500">{stats.todayTasks}</div>
                    <div className="stat-desc">Newly assigned tasks</div>
                </div>

                <div className="stat bg-base-100 shadow rounded-xl border-l-4 border-green-500">
                    <div className="stat-title text-xs font-bold uppercase">Successfully Resolved</div>
                    <div className="stat-value text-green-500">{stats.resolved}</div>
                    <div className="stat-desc">Ready for closing</div>
                </div>

                <div className="stat bg-base-100 shadow rounded-xl border-l-4 border-purple-500">
                    <div className="stat-title text-xs font-bold uppercase">Archived/Closed</div>
                    <div className="stat-value text-purple-500">{stats.closed}</div>
                    <div className="stat-desc">Total history</div>
                </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="card bg-base-100 shadow-xl p-6">
                    <h2 className="text-lg font-bold mb-6">Live Workload Analytics</h2>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={stats.chartData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="name" tick={{fontSize: 12}} />
                                <YAxis />
                                <Tooltip cursor={{fill: '#f3f4f6'}} />
                                <Bar dataKey="value" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={40} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="card bg-primary text-primary-content p-8 shadow-xl flex flex-col justify-center">
                    <h2 className="text-2xl font-bold mb-2">Efficiency Rating</h2>
                    <div className="text-5xl font-black mb-4">
                        {stats.assigned + stats.resolved > 0 
                            ? Math.round((stats.resolved / (stats.assigned + stats.inProgress + stats.resolved)) * 100) 
                            : 100}%
                    </div>
                    <p className="opacity-80">Resolution rate based on currently active versus completed tasks.</p>
                    <div className="mt-6">
                        <progress className="progress progress-secondary w-full" value={stats.resolved} max={stats.assigned + stats.resolved + stats.inProgress}></progress>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StaffDashboard;
